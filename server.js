const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const crypto = require("crypto");
const { auth, requiresAuth } = require("express-openid-connect");
const db = require("./models");
const errorHandler = require("./middleware/errorHandler");
const port = process.env.PORT || 3000;

const app = express();
const secret = crypto.randomBytes(64).toString("hex");

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};

// Use express-session middleware
app.use(
  session({
    secret: secret,
    resave: true,
    saveUninitialized: true,
  })
);

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Apply authentication middleware only in non-test environments
if (process.env.NODE_ENV !== "test") {
  app.use(auth(config));
}

// Function to create a user immediately after authentication
const createAutomaticUser = async (req, res, next) => {
  const User = db.user;

  try {
    const { sub, email } = req.oidc.user;

    // Check if the user already exists in the database
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return next();
    }

    // Create a new user
    const newUser = new User({
      username: sub,
      email,
    });

    await newUser.save();
    next();
  } catch (err) {
    next(err);
  }
};

// Apply the createAutomaticUser middleware after authentication
app.use(requiresAuth(), createAutomaticUser);

// Set up CORS headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
  );
  res.setHeader("Content-Type", "application/json");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

// Load routes
app.use("/", require("./routes"));

// Error handling for 404 Not Found
app.use((req, res, next) => {
  next(createError(404));
});

// General error handler
app.use(errorHandler);

// Start the server and connect to the database
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`DB connected and Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Cannot connect to the database.", err);
    if (process.env.NODE_ENV !== "test") {
      process.exit(1); // Exit only if it's not a test environment
    } else {
      throw new Error("Database connection failed."); // Throw an error in the test environment
    }
  });

module.exports = app;
