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
  classes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Class'
    }
  ]
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
  // messages: [
  //   {
  //     type: mongoose.Schema.ObjectId,
  //     ref: 'Message'
  //   }
  // ],
  reactions: {
    type: Array
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'Teacher'
  }
})

lectureSchema.methods.getMessages = async function() {
  var self = this;
  var messages = await messageModel.find({ 'lecture': self._id });
  return messages;
}

const messageSchema = mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  likes: Array,
  replies: Array,
  lecture: String
})

const classSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'Teacher'
  },
  lectures: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Lecture'
    }
  ]
})

const slideSchema = mongoose.Schema({
  pdf:{
    name: String,
    data: Buffer
  },
  slideNumber:{
    type: Number
  },
  lectureId:{
    type: mongoose.Schema.ObjectId,
    ref: 'Lecture'
  }
})



const teacherModel = mongoose.model('Teacher', teacherSchema);
const studentModel = mongoose.model('Student', studentSchema);
const lectureModel = mongoose.model('Lecture', lectureSchema);
const messageModel = mongoose.model('Message', messageSchema);
const classModel = mongoose.model('Class', classSchema);
const slideModel = mongoose.model('Slide', slideSchema);

module.exports = {
  Teacher: teacherModel,
  Student: studentModel,
  Lecture: lectureModel,
  Message: messageModel,
  Class: classModel,
  Slide: slideModel
}
