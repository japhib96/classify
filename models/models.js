const mongoose = require('mongoose');

// If you're getting an error here, it's probably because
// your connect string is not defined or incorrect.
mongoose.connection.on('connected', function() {
  console.log('Connected to MongoDb!');
})
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
  lectureTitle: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  messages: [
    {message: String,
      author: String,
      date: String,
      likes: Array
    }

  ],
  reactions: {
    type: Array
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'Teacher'
  }
})


const teacherModel = mongoose.model('Teacher', teacherSchema);
const studentModel = mongoose.model('Student', studentSchema);
const lectureModel = mongoose.model('Lecture', lectureSchema);

module.exports={
  Teacher: teacherModel,
  Student: studentModel,
  Lecture: lectureModel
}
