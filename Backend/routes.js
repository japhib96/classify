var express = require('express');
var router = express.Router();

var path= require("path");
var multer = require("multer");
var models =require('../models/models')
var Slide = models.Slide
const saveFunctions= require('./saveFunctions')
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
  console.log('entered saveLecture')
  try {
    console.log('try', req.user)
    var lectureId = await saveFunctions.saveLecture(req.body.classId, req.user, req.body.lectureTitle, req.body.password);
    console.log('saveLecture', lectureId)
    res.json({ lectureId: lectureId });
  }
  catch(error) {
    res.status(400).json({ error: error.message })
  }
})

router.post('/saveClass', async (req, res) => {
  try {
    var classId = await saveFunctions.saveClass(req.body.classTitle, req.user, req.body.password);
    res.json({ classId: classId });
  }
  catch(error) {
    res.status(400).json({ error: error.message })
  }
})

router.post('/class/join', async (req, res) => {
  try {
    var result = await saveFunctions.joinClass(req.user, req.body.classId, req.body.password);
    res.json({ result: result });
  }
  catch(error) {
    res.status(400).json({ error: error.message })
  }
})

router.get('/user/classes', async (req, res) => {
  try {
    const classes = await saveFunctions.getClasses(req.user);
    res.json({ classes: classes });
  } catch(error) {
    res.status(400).json({ error: error.message })
  }
})

router.post('/class/lectures', async (req, res) => {
  try {
    const info = await saveFunctions.getLectures(req.body.classId);
    res.json({ lectures: info.lectures, title: info.title });
  } catch(error) {
    res.status(400).json({ error: error.message })
  }
})
router.post("/uploadSlide", upload.single("uploadFile"), function(req, res) {
  new Slide({
    pdf: {
      name: req.file.originalname,
      data: fs.readFileSync(req.file.path)
    },
    lectureId: req.body.lectureId

  }).save(async function(err, slide) {
    if (err) {
      res.send(err);
      return;
    }
    var lecture =  await models.Lecture.findById(slide.lectureId);
    // lecture.slideId = slide._id;
    lecture.save();
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

router.post('/getSlides', async function(req, res){
  var lecture = await models.Lecture.findById(req.body.lectureId)
  if(lecture.slideId !== ''){
    console.log(lecture.slideId)
    res.json({
      slideId: lecture.slideId,
      currentSlide: lecture.currentSlide,
    })
  } else{
    res.json({
      slideId: '',

    })
  }
});

  router.post('/getFeedback', async function(req, res){
    var lecture = await models.Lecture.findById(req.body.lectureId)
    var sumOfReactions = 0;
    var numberOfReactions = 0;
    var numberOfQuestions = [];
    lecture.slideBySlide.forEach( (slide, index) =>{
      if(index !== 0){
        for(var id in slide.reactions){
          if(id !== 'test'){
            sumOfReactions += slide.reactions[id];
            numberOfReactions ++;
          }
        }
      }
        numberOfQuestions.push(slide.messages.length - 1)
    })
    var messages = lecture.getMessages();
    messages.sort((function(a, b){return b.likes.length - a.likes.length})
    var topQuestions = [];
    for(var i=0; i<3; i++){
      topQuestions.push(messages[i].message)
    }
    var averageReaction = sumOfReactions/numberOfReactions;

    res.json({
      averageReaction: averageReaction,
      numberOfQuestions: numberOfQuestions,
      topQuestions: topQuestions,
    })
  })



  router.post('/lecture/toggle', async (req, res) => {
    try {
      const status = await saveFunctions.toggleLecture(req.body.lectureId);
      res.json({ status: status });
    } catch(error) {
      res.status(400).json({ error: error.message })
    }
  })

  module.exports = router;
