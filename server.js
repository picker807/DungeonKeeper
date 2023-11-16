const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const port = process.env.PORT || 3000;
const cors = require('cors');

const db = require('./models');

const passport = require('./config/passport');
const session = require('express-session');
const crypto = require('crypto');

const app = express();
const secret = crypto.randomBytes(64).toString('hex');

app
    .use(session({
        secret: secret,
        resave: true,
        saveUninitialized: true
    }))

    // Passport Initialization Middleware
    //.use(passport.initialize())
    //.use(passport.session())

    .use(cors())
    .use(bodyParser.json())

    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
        );
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    })

    //.use(express.json())
    
    // Routes
    .use('/', require('./routes'))
    

    // view engine setup
    //app.set('views', path.join(__dirname, 'views'));
    //app.set('view engine', 'pug');

    
//.use(express.static(path.join(__dirname, 'public'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
 
// Connect to Database
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        app.listen(port, () => {
            console.log(`DB connected and Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.log('Cannot connect to database.', err);
        process.exit();
    })

module.exports = app;
