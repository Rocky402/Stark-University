const express = require('express');

const app = express();

const Mongoose = require('./db/connection');

const bodyParser = require('body-parser');

const path = require('path');

const cookieParser = require('cookie-parser');

const session = require('express-session');


var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
      res.redirect("/dashboard");
    } else {
      next();
    }
  
  };

app.use(bodyParser.json()); // for mongo db

app.use(bodyParser.urlencoded({ extended: true})); // for mongo db



app.set('view engine', 'ejs');


app.use(express.static("views"));

app.use('/upload', express.static("upload"));




app.use(cookieParser());
app.use(
  session({
    key: "user_sid",
    secret: "somerandonstuffs",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
  })
);


app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
    res.clearCookie("user_sid");
  }
  next();
});
















app.use(require('./router/controller')); // for mongo db



// app.use('/', router);
app.listen(8080);