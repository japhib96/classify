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

async function  updateReaction(lectureId, userId, reaction){
  try{
    var lecture = await models.Lecture.findById(lectureId)
    if(reaction === ''){
        return lecture.reactions
        }
    var index = lecture.reactions.findIndex(function(reactionObj){
      return reactionObj.id === userId
    })
    if(index === -1){
      lecture.reactions = [...lecture.reactions, {id: userId, reaction: reaction}]
    } else{
      lecture.reactions[index] = {id: userId, reaction: reaction};
    }
    var updatedLecture = await lecture.save()
        return updatedLecture.reactions

  } catch(e){
    console.log(e)
  }
}

async function  updateLikes(lectureId, userId, data){
  try{
    var lecture = await models.Lecture.findById(lectureId)
    if(data === ''){
        return lecture.messages
        }
      var index = lecture.messages[data.index].likes.findIndex(function(likesObj){
        return likesObj.id === userId
      })
      if(index === -1){
        lecture.messages[data.index].likes = [...lecture.messages[data.index].likes, {id: userId}]
      } else{
        lecture.messages[data.index].likes.splice(index, 1)
      }
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
  updateLecture: updateLecture,
  updateReaction: updateReaction,
  updateLikes: updateLikes
}
