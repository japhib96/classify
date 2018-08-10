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

async function saveLecture(classId, lectureTitle, password) {
  var lecture = new models.Lecture({
    lectureTitle: lectureTitle,
    password: password,
    reactions: [],
    //owner:

    currentSlide: 1,
    slideBySlide: []
  })

  var lecture = await lecture.save();
  var classroom = await models.Class.findById(classId);
  classroom.lectures.push(lecture._id);
  console.log('test',classroom.lectures, lecture._id)
  var updatedClassroom = await classroom.save()
  return updatedClassroom




}

function saveClass(classTitle, password) {
  var classroom = new models.Class({
    name: classTitle,
    password: password,
    //owner:
  })

  return classroom.save();
}

async function getClasses(userId) {
  try {
    const student = await models.Student.findById(userId).populate('classes').exec();
    console.log(student.classes);
    return student.classes;
  } catch(e) {
    console.log(e);
  }
}

async function getLectures(classId) {
  try {
    console.log(classId)
    const classroom = await models.Class.findById(classId).populate('lectures').exec();
    console.log(classroom.lectures);
    return classroom.lectures;
  } catch(e) {
    console.log(e);
  }
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
      lecture.reactions.splice(index, 1);
      lecture.reactions = [...lecture.reactions, {id: userId, reaction: reaction}];
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
    var lecture = await models.Lecture.findById(lectureId);
    if (data === '') {
      var allMessages = await lecture.getMessages();
      return allMessages;
    }
    var repliedMessage = await models.Message.findOne({ _id: data.index, lecture: lectureId });
    repliedMessage.replies = [...repliedMessage.replies, { author: userId, reply: data.reply }];
    await repliedMessage.save();
    var allMessages = await lecture.getMessages();
    return allMessages;
  } catch(e) {
    console.log(e)
  }
}

async function joinLecture(lectureId, password) {
  try {
    var lecture = await models.Lecture.findById(lectureId);
    if (password === lecture.password) {
      return;
    } else {
      throw new Error('Incorrect password');
    }
  } catch(e) {
    console.log(e);
  }
}

async function updateSlide(slideId, pageNum) {
  try {
    var slide = await models.Slide.findById(slideId);
    var lecture = await models.Lecture.findById(slide.lectureId)
    lecture.currentSlide = pageNum;
    var updatedLecture = await lecture.save()
    return updatedLecture
  } catch(e) {
    console.log(e);
  }
}

async function updateSlideTotal(slideId ,slides) {
  try {
    var slide = await models.Slide.findById(slideId);
    var lecture = await models.Lecture.findById(slide.lectureId)
    lecture.slideId = slideId;
    lecture.slideBySlide = [];
    for(var i =0; i <= slides; i++){
      lecture.slideBySlide.push({messages: [], reactions: []})
    }
    console.log(lecture.slideBySlide)
    var updatedLecture = await lecture.save()
    return updatedLecture
  }
  catch(e){
    console.log(e)
  }
}

async function joinClass(user, classId, password) {
  try {
    var classroom = await models.Class.findById(classId);
    if (password === classroom.password) {
      let student = await models.Student.findById(user._id);
      student.classes = [...student.classes, classId];
      await student.save();
      return;
    } else {
      throw new Error('Incorrect password');
    }
  } catch(e) {
    console.log(e);
  }
}

module.exports = {
  saveLecture: saveLecture,
  saveTeacher: saveTeacher,
  saveStudent: saveStudent,
  updateLecture: updateLecture,
  updateReaction: updateReaction,
  updateLikes: updateLikes,
  updateReplies: updateReplies,
  joinLecture: joinLecture,
  saveClass: saveClass,
  joinClass: joinClass,
  getClasses: getClasses,
  getLectures: getLectures,
  updateSlide: updateSlide,
  updateSlideTotal: updateSlideTotal
}
