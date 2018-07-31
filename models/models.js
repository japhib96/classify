var mongoose = require('mongoose');
var connect = process.env.MONGODB_URI;

// If you're getting an error here, it's probably because
// your connect string is not defined or incorrect.
mongoose.connect(connect);

// Step 1: Write your schemas here!
// Remember: schemas are like your blueprint, and models
// are like your building!
var teacherSchema = mongoose.Schema({
  username:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  classes:{
    type: Array     //array of lecture objects
  }
})

var lectureSchema = mongoose.Schema({
  classId:{
    type: String,
    // required: true
  },
  lectureTitle:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
})


var teacherModel = mongoose.model('Teacher', teacherSchema);
var lectureModel = mongoose.model('Lecture', lectureSchema);

module.exports={
  Teacher: teacherModel,
  Lecture: lectureModel
}
