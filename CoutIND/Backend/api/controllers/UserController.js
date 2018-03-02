var mongoose = require('mongoose'),
  moment = require('moment'),
  passport = require('passport'),
  Validations = require('../utils/Validations'),
  bcrypt = require('bcryptjs'),
  User = mongoose.model('User');
  var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'set18';


  module.exports.register = function(req,res){
    console.log(req.body);
    // bcrypt.hash(req.body.password, 10, function(err, hash) {
      // Store hash in database
      User.register(new User({username: req.body.username, password:req.body.password,firstname:req.body.firstname,lastname:req.body.lastname,email:req.body.email}),req.body.password, function(err, account) {
        if (err) {
            res.status(422).json({
                err: err,
                msg: 'User already exists',
                data: null
              });
              return;
            }
        passport.authenticate('local')(req, res, function () {
            res.status(200).json({
                err: null,
                msg: 'Registered successfully',
                data: null
              });
        });
      });
    // });
  }

  module.exports.login =  function(req, res) {
    // usually this would be a database call:
    User.findOne({"username": req.body.username},function(err, user) {
      if (!user){
        res.status(401).json({message:"no such user found "+req.body.username});
      }else{
        console.log(user);
        bcrypt.compare(user.password,req.body.password,function(err,out){
          if(res){
          var payload = {"username": user.username,'expiresIn': 100000000000000000000};
        var token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.json({message: "ok", token: token});
        } else {
          res.status(401).json({message:"passwords did not match"});
        }
      // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
  });
  }});}
  

  module.exports.logout = function(req,res){
    req.logout();
}
module.exports.EditUser = function(req, res, next) {
    if (!Validations.isObjectId(req.params.userId)) {
        return res.status(422).json({
          err: null,
          msg: 'UserID parameter must be a valid ObjectId.',
          data: null
        });
      }
      var valid =
      (req.body.Username &&
      Validations.isString(req.body.name)) ||
      req.body.password;
    if (!valid) {
      return res.status(422).json({
        err: null,
        msg: 'Atleast username or password must be submitted',
        data: null
      });
    }
    delete req.body.createdAt;
    req.body.updatedAt = moment().toDate();

    User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: req.body
        },
        { new: true }
      ).exec(function(err, updatedUser) {
        if (err) {
          return next(err);
        }
        if (!updatedUser) {
          return res
            .status(404)
            .json({ err: null, msg: 'User not found.', data: null });
        }
        res.status(200).json({
          err: null,
          msg: 'Data was updated successfully.',
          data: updatedUser
        });
      });
    };
