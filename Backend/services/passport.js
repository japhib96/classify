var session = require('express-session')
var passport = require('passport');
var LocalStrategy = require('passport-local');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var models = require('../../models/models.js')

passport.serializeUser(function(user, done){
  done(null, user._id);
})

passport.deserializeUser(function(id, done){
  models.Teacher.findById(id, function(err, user){
    done(err, user);
  });
});

passport.use('local-teacher',new LocalStrategy(function(username, password, done){
  models.Teacher.findOne({username: username}, function(err, user){
  if(err){
    console.log(err);
    return done(err);
  }
  if(!user){
    console.log(user);
    return done(null, false, { message: 'Incorrect Username'});
  }
  if(user.password !== password){
    return done(null, false, {message: 'Incorrect Password'})
  }
  return done(null, user);
  })
}))

passport.use('local-student',new LocalStrategy(function(username, password, done){
  models.Student.findOne({username: username}, function(err, user){
  if(err){
    console.log(err);
    return done(err);
  }
  if(!user){
    console.log(user);
    return done(null, false, { message: 'Incorrect Username'});
  }
  if(user.password !== password){
    return done(null, false, {message: 'Incorrect Password'})
  }
  return done(null, user);
  })
}))
