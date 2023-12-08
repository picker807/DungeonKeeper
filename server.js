const createError = require("http-errors");
const express = require("express");
const port = process.env.PORT || 3000;
const cors = require("cors");
const db = require("./models");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();
const { auth, requiresAuth } = require("express-openid-connect");

const session = require("express-session");
const crypto = require("crypto");

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

app
  .use(
    session({
      secret: secret,
      resave: true,
      saveUninitialized: true,
    })
  )

  .use(cors())
  .use(express.json());

if (process.env.NODE_ENV !== "test") {
  app.use(auth(config));
  // Apply the createAutomaticUser middleware after authentication
  app.use(requiresAuth(), createAutomaticUser);
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

app
  .use("/", require("./routes"))
  .use((req, res, next) => {
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
  })
  .use(errorHandler);

app.use(function (req, res, next) {
  next(createError(404));
});

app.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

// Connect to Database
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
    console.log("Cannot connect to database.", err);
    if (process.env.NODE_ENV !== "test") {
      process.exit(1); // Exit only if it's not a test environment
    } else {
      throw new Error("Database connection failed."); // Throw an error in test environment
    }
  });

module.exports = app;
