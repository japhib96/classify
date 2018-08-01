var express = require('express');
var router = express.Router();


router.post('/saveLecture', async (req, res) => {
  console.log('made it')
  await saveFunctions.saveLecture('test', req.body.lectureTitle, req.body.password);
})



module.exports = router;
