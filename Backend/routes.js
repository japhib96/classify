var express = require('express');
var router = express.Router();
const saveFunctions = require('./saveFunctions');


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
