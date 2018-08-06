const express = require('express')
const app = express()
const saveFunctions= require('./saveFunctions')
var session = require('express-session')
const bodyParser= require('body-parser')
var auth = require('./auth');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var routes = require('./routes');
var models = require('../models/models')
var http = require('http')
var server = http.createServer(app);
var models = require('../models/models');
// require('../semantic/dist/semantic.min.css');

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(session({
  secret: process.env.SECRET,
  name: 'Catscoookie',
  store: new MongoStore({ mongooseConnection: require('mongoose').connection }),
  proxy: true,
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

require('./services/passport');

app.use('/', auth(passport));
app.use('/', routes);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// error handlers

// development error handler
// will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// production error handler
// no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });
var socket = require('socket.io');
io = socket(server);

io.on('connection', (socket) => {

  socket.on('JOIN_ROOM', async function(data){
    var startMessages = await saveFunctions.updateLecture("5b63c3c2c6481e737c3cfb2b", data.message)

    io.emit('UPDATE_MESSAGE', startMessages )
  })

    socket.on('REACTION', async function(data){
        var reactions = await saveFunctions.updateReaction("5b63c3c2c6481e737c3cfb2b", data.user, data.reaction)
        io.emit('ALL_REACTIONS', reactions)
    })

    socket.on('SEND_MESSAGE', async function(data) {
      var message = {
        author: data.author,
        message: data.message,
        date: new Date(),
        likes: [],
        replies:[]
      }
      var messages = await saveFunctions.updateLecture("5b63c3c2c6481e737c3cfb2b", message)
      io.emit('RECEIVE_MESSAGE', messages);
    })

    socket.on('LIKE_MESSAGE', async function(data){
      var messages = await saveFunctions.updateLikes("5b63c3c2c6481e737c3cfb2b", data.user, data)
      io.emit('UPDATE_LIKES', messages)
    })

    socket.on('ADD_REPLY', async function(data){
      var messages = await saveFunctions.updateReplies("5b63c3c2c6481e737c3cfb2b", data.user, data)
      io.emit('UPDATE_REPLIES', messages)
    })
});

server.listen(3001, () => console.log('Example app listening on port 3001!'))
