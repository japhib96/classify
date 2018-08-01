// Add Passport-related auth routes here.

var express = require('express');
var router = express.Router();
var models = require('../models/models');
const saveFunctions= require('./saveFunctions');



module.exports = function(passport) {

  // GET registration page


  // POST registration page
  var validateReq = function(userData) {
    return (userData.password === userData.passwordRepeat);
  };
  router.post('/saveUser', async (req, res) => {

    if (!req.body.username || !req.body.password) {
      res.status(400).json({ error: 'Please enter valid username and password' });
    }
    if (req.body.password !== req.body.passwordRepeat) {
      res.status(400).json({ error: "Passwords don't match" });
    }
    try {
      if (req.body.type === 1) {
        await saveFunctions.saveStudent(req.body.username, req.body.password);
      } else {
        console.log('teacher')
        let teacher = await saveFunctions.saveTeacher(req.body.username, req.body.password);
        console.log(teacher);
      }
      res.json({ success: true });
    }
    catch(error) {
      res.status(400).json({error: error.message})
    }

  })

  router.post('/login', passport.authenticate('local'), function(req, res) {
     var userId = req.user._id
     res.send(userId)
  });


  // GET Logout page
  router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
  });

  return router;
};
