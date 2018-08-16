const models = require('../models/models')

function saveTeacher(email, username, password) {
  var teacher = new models.Teacher({
    email: email,
    username: username,
    password: password
  })
  return teacher.save();
}

function saveStudent(email, username, password) {
  var student = new models.Student({
    email: email,
    username: username,
    password: password
  })
  return student.save();
}

async function saveLecture(classId, teacher, lectureTitle, password) {
  // models.Lecture
  var lecture = new models.Lecture({
    lectureTitle: lectureTitle,
    password: password,
    created: new Date(),
    reactions: [],
    currentSlide: 1,
    slideBySlide: [],
    owner: teacher._id,
    active: false,
    slideId: ''
  })
  var lecture = await lecture.save();
  var classroom = await models.Class.findById(classId);
  classroom.lectures.push(lecture._id);
  var updatedClassroom = await classroom.save()
  return lecture._id
}

async function saveClass(classTitle, teacher, password) {
  var classroom = new models.Class({
    name: classTitle,
    password: password,
    created: new Date(),
    owner: teacher._id,
    lectures: []
  })
  var classroom = await classroom.save();
  return classroom._id
}

async function getClasses(user) {
  try {
    if (user.teacher) {
      const classes = await models.Class.find({ owner: user });
      console.log(classes);
      return classes;
    } else {
      const student = await models.Student.findById(user._id).populate('classes').exec();
      console.log(student.classes);
      return student.classes;
    }
  } catch(e) {
    console.log(e);
  }
}

async function getLectures(classId) {
  try {
    console.log(classId)
    const classroom = await models.Class.findById(classId).populate('lectures').exec();
    console.log(classroom.lectures);
    return { lectures: classroom.lectures, title: classroom.name };
  } catch(e) {
    console.log(e);
  }
}

async function toggleLecture(lectureId) {
  try {
    const lecture = await models.Lecture.findById(lectureId);
    lecture.active = !lecture.active;
    console.log(lecture.active);
    await lecture.save();
    return lecture.active;
  } catch(e) {
    console.log(e);
  }
}

async function updateLecture(lectureId, messageData, userId) {
  try {
    var lecture = await models.Lecture.findById(lectureId);
    if (messageData === '') {
      var allMessages = await lecture.getMessages();
      return allMessages;
    }
    var message = new models.Message(messageData);
    await message.save()
    lecture.slideBySlide[lecture.currentSlide].messages.push(message._id);
    await lecture.save();
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
    lecture.slideBySlide[lecture.currentSlide].reactions[userId] = reaction
    // var indexSlide = lecture.slideBySlide[lecture.currentSlide].reactions.findIndex(function(reactionObj) {
    //   return reactionObj.id === userId;
    // })
    //
    // if (indexSlide === -1) {
    //   lecture.slideBySlide[lecture.currentSlide].reactions = [...lecture.slideBySlide[lecture.currentSlide].reactions, {id: userId, reaction: reaction}];
    // } else {
    //   console.log('else', userId, reaction)
    //   lecture.slideBySlide[lecture.currentSlide].reactions.splice(indexSlide, 1);
    //   lecture.slideBySlide[lecture.currentSlide].reactions = [...lecture.slideBySlide[lecture.currentSlide].reactions, {id: userId, reaction: reaction}];
    // }
    lecture.markModified('slideBySlide');
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
    if(lecture.currentSlide < pageNum){
      lecture.slideBySlide[pageNum].reactions = lecture.slideBySlide[pageNum -1].reactions
    }
    lecture.currentSlide = pageNum;
    var updatedLecture = await lecture.save()
    return updatedLecture
  } catch(e) {
    console.log(e);
  }
}

async function updateSlideTotal(slideId ,slides) {
  try {
    console.log('slideTotal', slideId)
    var slide = await models.Slide.findById(slideId);
    var lecture = await models.Lecture.findById(slide.lectureId)
    console.log(lecture.slideId)
    if (lecture.slideId !== slideId) {
      lecture.slideId = slideId;
      lecture.slideBySlide = [];
      for(var i =0; i <= slides; i++){
        lecture.slideBySlide.push({messages: {test: 0}, reactions: {test: 0}})
      }
      var updatedLecture = await lecture.save()
      return updatedLecture
    }
    return lecture;
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
      return {id: classroom._id, error: ''};
    } else {
      return {id: '', error: 'Incorrect Password'};
    }
  } catch(e) {
    return {id: '', error: 'Incorrect Class ID'};
  }
}

async function addNewStudent(lectureId, userId) {
  try {
    var lecture = await models.Lecture.findById(lectureId);
    // var student = lecture.slideBySlide[0].reactions.findIndex(function(reactionObj) {
    //   return reactionObj.id === userId;
    // })
    // if(userId){
    //   lecture.slideBySlide[1].reactions[userId] = 0
    //   // lecture.slideBySlide[1].reactions = [...lecture.slideBySlide[1].reactions, {id: userId, Reaction: 0}]
    // }
    var index = lecture.reactions.findIndex(function(reactionObj) {
      return reactionObj.id === userId;
    })
    if (index === -1) {
      lecture.reactions.push({id: userId, reaction: 0});
      if(userId){
        for(var i=1; i <= lecture.currentSlide; i++){
          lecture.slideBySlide[i].reactions[userId] = 0
        }
      }
      lecture.markModified('slideBySlide');
      console.log(lecture)
      await lecture.save()
    }
    return
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
  updateReplies: updateReplies,
  joinLecture: joinLecture,
  saveClass: saveClass,
  joinClass: joinClass,
  getClasses: getClasses,
  getLectures: getLectures,
  updateSlide: updateSlide,
  updateSlideTotal: updateSlideTotal,
  toggleLecture: toggleLecture,
  addNewStudent: addNewStudent
}
