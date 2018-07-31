const models = require('../models/models')
const Teacher = models.Teacher;
const Lecture = models.Lecture;

function saveTeacher(username, password){
  var teacher = new Teacher({
    username: username,
    password: password
  })

  teacher.save(function(err, user) {
    if (err) {
      console.log(err);
    }
    console.log('successful registration');
  });
}

function saveLecture(classId, lectureTitle, password){
  var lecture = new Lecture({
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
}
