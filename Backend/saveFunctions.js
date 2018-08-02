const models = require('../models/models')

function saveTeacher(username, password) {
  var teacher = new models.Teacher({
    username: username,
    password: password
  })

  return teacher.save();
}

function saveStudent(username, password) {
  var student = new models.Student({
    username: username,
    password: password
  })

  return student.save();
}

function saveLecture(lectureTitle, password){
  var lecture = new models.Lecture({
    lectureTitle: lectureTitle,
    password: password,
    messages: []
  })

  return lecture.save();
}

async function  updateLecture(lectureId, message){
try{
  var lecture = await models.Lecture.findById(lectureId)
  if(message === ''){
      return lecture.messages
      }
  lecture.messages = [...lecture.messages, message];
  var updatedLecture = await lecture.save()
      return updatedLecture.messages
  } catch(e){
    console.log(e)
  }
}


module.exports = {
  saveLecture: saveLecture,
  saveTeacher: saveTeacher,
  saveStudent: saveStudent,
  updateLecture: updateLecture
}
