const mongoose = require('mongoose');

// If you're getting an error here, it's probably because
// your connect string is not defined or incorrect.
mongoose.connect(process.env.MONGODB_URI);

const teacherSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: {
      unique: true,
    }
  },
  password: {
    type: String,
    required: true
  },
  classes: {
    type: Array // array of lecture objects
  },
})

const studentSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: {
      unique: true,
    }
  },
  password: {
    type: String,
    required: true
  },
})

const lectureSchema = mongoose.Schema({
  classId: {
    type: String,
    // required: true
  },
  lectureTitle: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
})


const teacherModel = mongoose.model('Teacher', teacherSchema);
const studentModel = mongoose.model('Student', studentSchema);
const lectureModel = mongoose.model('Lecture', lectureSchema);

module.exports={
  Teacher: teacherModel,
  Student: studentModel,
  Lecture: lectureModel
}
