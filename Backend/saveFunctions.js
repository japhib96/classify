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

function saveLecture(classId, lectureTitle, password){
  var lecture = new models.Lecture({
    classId: classId,
    lectureTitle: lectureTitle,
    password: password
  })

  lecture.save(function(err, user) {
    if (err) {
      console.log(err);
    }
    console.log('lecture saved');
  });
}

module.exports = {
  saveLecture: saveLecture,
  saveTeacher: saveTeacher,
  saveStudent: saveStudent,
}
