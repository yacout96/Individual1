require('./api/config/DBConnection');
var express = require('express'),
  logger = require('morgan'),
  cors = require('cors'),
  helmet = require('helmet'),
  compression = require('compression'),
  bodyParser = require('body-parser'),
  config = require('./api/config/Config'),
  passport = require('passport');
  LocalStrategy = require('passport-local').Strategy,
  User = require('./api/models/User'),
  jwt = require('jsonwebtoken'),
  passportJWT = require("passport-jwt"),
  ExtractJwt = passportJWT.ExtractJwt,
  JwtStrategy = passportJWT.Strategy,
  bCrypt = require('bcryptjs'),
  routes = require('./api/routes');
  app = express();

app.set('secret', config.SECRET);

app.use(logger(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE']
  })
);
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'set18';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  // usually this would be a database call:
  User.findOne({"username":jwt_payload.username},function(err, user) {
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
})});

passport.use(strategy);

app.use('/api', routes);

// 500 internal server error handler
app.use(function(err, req, res, next) {
  if (err.statusCode === 404) return next();
  res.status(500).json({
    // Never leak the stack trace of the err if running in production mode
    err: process.env.NODE_ENV === 'production' ? null : err,
    msg: '500 Internal Server Error',
    data: null
  });
});

// 404 error handler
app.use(function(req, res) {
  res.status(404).json({
    err: null,
    msg: '404 Not Found',
    data: null
  });
});



module.exports = app;
