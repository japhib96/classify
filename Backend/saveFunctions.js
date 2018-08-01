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
    password: password
  })

  return lecture.save();
}

module.exports = {
  saveLecture: saveLecture,
  saveTeacher: saveTeacher,
  saveStudent: saveStudent,
}
