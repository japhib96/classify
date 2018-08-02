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
<<<<<<< HEAD
var models = require('../models/models')
var http = require('http')
var server = http.createServer(app);
=======
var models = require('../models/models');
import '../semantic/dist/semantic.min.css';

>>>>>>> japhib96




app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
    console.log(socket)
  socket.on('JOIN_ROOM', async function(data){
    var startMessages = await saveFunctions.updateLecture("5b6248bdea6e0239442e8d23", data.message)

    io.emit('UPDATE_MESSAGE', startMessages )
  })


    socket.on('SEND_MESSAGE', async function(data) {
      var message = {
        author: data.author,
        message: data.message
      }
      var messages = await saveFunctions.updateLecture("5b6248bdea6e0239442e8d23", message)
      console.log('send message', messages)
      io.emit('RECEIVE_MESSAGE', messages);
    })
});

server.listen(3001, () => console.log('Example app listening on port 3001!'))
