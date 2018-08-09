var express = require('express');
var router = express.Router();
const saveFunctions = require('./saveFunctions');

router.use(function(req, res, next){
  if (!req.user) {
    console.log('not logged in')
    res.status(401).json({ success: false, loggedIn: false });
  } else {
    return next();
  }
});

router.post('/saveLecture', async (req, res) => {
  try {
    await saveFunctions.saveLecture(req.body.lectureTitle, req.body.password);
    res.json({ success: true });
  }
  catch(error) {
    res.status(400).json({ error: error.message })
  }
})

router.post('/saveClass', async (req, res) => {
  try {
    await saveFunctions.saveClass(req.body.classTitle, req.body.password);
    res.json({ success: true });
  }
  catch(error) {
    res.status(400).json({ error: error.message })
  }
})

router.post('/class/join', async (req, res) => {
  console.log('hi')
  try {
    await saveFunctions.joinClass(req.user, req.body.lectureId, req.body.password);
    res.json({ success: true });
  }
  catch(error) {
    res.status(400).json({ error: error.message })
  }
})

router.get('/user/classes', async (req, res) => {
  try {
    const classes = await saveFunctions.getClasses(req.user._id);
    res.json({ classes: classes });
  } catch(error) {
    res.status(400).json({ error: error.message })
  }
})

router.post('/class/lectures', async (req, res) => {
  try {
    const lectures = await saveFunctions.getLectures(req.body.classId);
    res.json({ lectures: lectures });
  } catch(error) {
    res.status(400).json({ error: error.message })
  }
})



module.exports = router;
