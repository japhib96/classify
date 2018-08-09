var express = require('express');
var router = express.Router();
const saveFunctions = require('./saveFunctions');
var path= require("path");
var multer = require("multer");
var models =require('../models/models')
var Slide = models.Slide
var fs = require('fs');
var storage = multer.diskStorage({
  destination: path.resolve(__dirname, "../src/slides"),
  filename: function(req, file, cb){
    console.log(file);
    cb(null, Date.now() + "_" + file.originalname);
  }
})
var upload = multer({ storage: storage })

// router.use(function(req, res, next){
//   if (!req.user) {
//     console.log('not logged in')
//     res.json({ success: false, loggedIn: false });
//   } else {
//     return next();
//   }
// });

router.post('/saveLecture', async (req, res) => {
  try {
    await saveFunctions.saveLecture(req.body.lectureTitle, req.body.password);
    res.json({ success: true });
  }
  catch(error) {
    res.status(400).json({ error: error.message })
  }
})

router.post('/class/join', async (req, res) => {
  console.log('hi')
  try {
    await saveFunctions.joinLecture(req.body.lectureId, req.body.password);
    res.json({ success: true });
  }
  catch(error) {
    res.status(400).json({ error: error.message })
  }
})

router.post("/uploadSlide", upload.single("uploadFile"), function(req, res) {
  console.log(req.body.lectureId)
    new Slide({

      pdf: {
        name: req.file.originalname,
        data: fs.readFileSync(req.file.path)
      },
      // slideNumber: 1,
      // totalSlides: 0,
      lectureId: req.body.lectureId

    }).save(function(err, slide) {
      if (err) {
        res.send(err);
        return;
      }
      fs.unlink(req.file.path, (err) =>{
        if(err){
          console.log(err)
        }
        res.json({
          status: "success",
          id: slide._id

        });
      })

    });
  });

  router.get('/slide/:id', function(req, res){
      Slide.findById(req.params.id, (err, slide)=>{
        if(err){
          res.send(err)
          return
        }
        res.contentType('application/pdf')
        res.end(slide.pdf.data, 'binary')
        // slide.pdf.data = slide.pdf.data.toString('base64')
        // res.json(slide)
      })
  })



module.exports = router;
