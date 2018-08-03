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

async function  updateReaction(lectureId, socketId, reaction){
  try{
    var lecture = await models.Lecture.findById(lectureId)
    if(reaction === ''){
        return lecture.reactions
        }
    var index = lecture.reactions.findIndex(function(reactionObj){
      return reactionObj.id === socketId
    })
    if(index === -1){
      lecture.reactions = [...lecture.reactions, {id: socketId, reaction: reaction}]
    } else{
      lecture.reactions[index] = {id: socketId, reaction: reaction};
    }
    var updatedLecture = await lecture.save()
        return updatedLecture.reactions

  } catch(e){
    console.log(e)
  }
}

async function  updateLikes(lectureId, socketId, data){
  try{
    var lecture = await models.Lecture.findById(lectureId)
    if(data === ''){
        return lecture.messages
        }
       console.log('start',lecture.messages[data.index].likes)
      var index = lecture.messages[data.index].likes.findIndex(function(likesObj){
        console.log('find',likesObj.id)
        return likesObj.id === socketId
      })
      console.log('index', index)
      if(index === -1){
        console.log('if', socketId)
        lecture.messages[data.index].likes = [...lecture.messages[data.index].likes, {id: socketId}]
        console.log('if', lecture.messages[data.index].likes)
      } else{
        lecture.messages[data.index].likes.splice(index, 1)
      }
      console.log(lecture)
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
