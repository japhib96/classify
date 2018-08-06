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

function saveLecture(lectureTitle, password) {
  var lecture = new models.Lecture({
    lectureTitle: lectureTitle,
    password: password,
    messages: []
  })

  return lecture.save();
}

async function updateLecture(lectureId, messageData) {
  try {
    var lecture = await models.Lecture.findById(lectureId);
    if (messageData === '') {
      var allMessages = await lecture.getMessages();
      return allMessages;
    }
    var message = new models.Message(messageData);
    await message.save()
    var allMessages = await lecture.getMessages();
    return allMessages;
  } catch(e) {
    console.log(e)
  }
}

async function updateReaction(lectureId, userId, reaction) {
  try {
    var lecture = await models.Lecture.findById(lectureId);
    if (reaction === '') {
      return lecture.reactions;
    }
    var index = lecture.reactions.findIndex(function(reactionObj) {
      return reactionObj.id === userId;
    })
    if (index === -1) {
      lecture.reactions = [...lecture.reactions, {id: userId, reaction: reaction}];
    } else {
      lecture.reactions[index] = {id: userId, reaction: reaction};
    }
    var updatedLecture = await lecture.save();
      return updatedLecture.reactions;
  } catch(e){
    console.log(e)
  }
}

async function updateLikes(lectureId, userId, data) {
  try {
    var lecture = await models.Lecture.findById(lectureId);
    if (data === '') {
      var allMessages = await lecture.getMessages();
      return allMessages;
    }
    var likedMessage = await models.Message.findOne({ _id: data.index, lecture: lectureId });
    var liked = likedMessage.likes.findIndex(function(likesObj) {
      return likesObj.id === userId;
    })
    if (liked === -1) {
      likedMessage.likes = [...likedMessage.likes, { id: userId }];
    } else {
      likedMessage.likes.splice(liked, 1);
    }
    await likedMessage.save();
    var allMessages = await lecture.getMessages();
    return allMessages;
  } catch(e) {
    console.log(e)
  }
}

async function updateReplies(lectureId, userId, data) {
  try {
    console.log(data.reply)
    var lecture = await models.Lecture.findById(lectureId);
    if (data === '') {
      var allMessages = await lecture.getMessages();
      return allMessages;
    }
    console.log(data.index, lectureId)
    var repliedMessage = await models.Message.findOne({ _id: data.index, lecture: lectureId });
    repliedMessage.replies = [...repliedMessage.replies, { author: userId, reply: data.reply }];
    await repliedMessage.save();
    var allMessages = await lecture.getMessages();
    return allMessages;
  } catch(e) {
    console.log(e)
  }
}



module.exports = {
  saveLecture: saveLecture,
  saveTeacher: saveTeacher,
  saveStudent: saveStudent,
  updateLecture: updateLecture,
  updateReaction: updateReaction,
  updateLikes: updateLikes,
  updateReplies: updateReplies
}
