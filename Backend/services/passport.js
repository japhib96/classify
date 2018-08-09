var session = require('express-session')
var passport = require('passport');
var LocalStrategy = require('passport-local');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var models = require('../../models/models.js')

passport.serializeUser(function(user, done) {
  done(null, user._id);
})

passport.deserializeUser(async function(id, done) {
  let teacher = await models.Teacher.findById(id);
  if (!teacher) {
    let student = await models.Student.findById(id);
    let stud = student.toObject();
    stud.teacher = false;
    return done(null, stud);
  }
  let teach = teacher.toObject();
  teach.teacher = true;
  return done(null, teach);
  // models.Teacher.findById(id, function(err, teacher) {
  //   if (!teacher) {
  //     console.log(teacher)
  //     models.Student.findById(id, function(err, student) {
  //       console.log(student)
  //       return done(err, student)
  //     })
  //   }
  //   done(err, teacher);
  // });
});

passport.use('local-teacher', new LocalStrategy(function(username, password, done) {
  models.Teacher.findOne({ username: username }, function(err, user) {
  if(err){
    console.log(err);
    return done(err);
  }
  if(!user){
    console.log(user);
    return done(null, false, { message: 'Incorrect Username' });
  }
  if(user.password !== password){
    return done(null, false, { message: 'Incorrect Password' })
  }
  return done(null, user);
  })
}))

passport.use('local-student', new LocalStrategy(function(username, password, done) {
  models.Student.findOne({ username: username }, function(err, user) {
  if(err){
    console.log(err);
    return done(err);
  }
  if(!user){
    console.log(user);
    return done(null, false, { message: 'Incorrect Username' });
  }
  if(user.password !== password){
    return done(null, false, { message: 'Incorrect Password' })
  }
  return done(null, user);
  })
}))
