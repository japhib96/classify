var express = require('express');
var router = express.Router();
const saveFunctions = require('./saveFunctions');

router.use(function(req, res, next){
  if (!req.user) {
    console.log('not logged in')
    res.json({ success: false, loggedIn: false });
  } else {
    return next();
  }
});

router.post('/saveLecture', async (req, res) => {
  console.log('hi')
  try {
    await saveFunctions.saveLecture(req.body.lectureTitle, req.body.password);
    res.json({ success: true });
  }
  catch(error) {
    res.status(400).json({ error: error.message })
  }
})



module.exports = router;
