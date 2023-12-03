const createError = require("http-errors");
const express = require("express");
const path = require("path");
const port = process.env.PORT || 3000;
const cors = require("cors");
const db = require("./models");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();
const { auth } = require("express-openid-connect");

const passport = require("./config/passport");
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

// Passport Initialization Middleware
//.use(passport.initialize())
//.use(passport.session())
.use(cors())
.use(express.json());

if (process.env.NODE_ENV !== 'test') {
    app.use(auth(config));
}

  app.use("/", require("./routes"))
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

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'pug');

//.use(express.static(path.join(__dirname, 'public'))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
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
        if (process.env.NODE_ENV !== 'test') {
            process.exit(1); // Exit only if it's not a test environment
        } else {
            throw new Error("Database connection failed."); // Throw an error in test environment
        }
    });


module.exports = app;
