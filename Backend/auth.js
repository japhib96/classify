// Add Passport-related auth routes here.

var express = require('express');
var router = express.Router();
var models = require('../models/models');
const saveFunctions= require('./saveFunctions');



module.exports = function(passport) {

  // GET registration page


  // POST registration page
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
        await saveFunctions.saveTeacher(req.body.username, req.body.password);
      }
      res.json({ success: true });
    }
    catch(error) {
      res.status(400).json({error: error.message})
    }
  });

  router.post('/loginStudent', passport.authenticate('local-student'));

  router.post('/loginTeacher', passport.authenticate('local-teacher'));


  // GET Logout page
  // router.get('/logout', function(req, res) {
  //   req.logout();
  //   res.redirect('/login');
  // });

  return router;
};
