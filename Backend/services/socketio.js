var socket = require('socket.io');
io = socket(server);

io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('SEND_MESSAGE', function(data){
        conosle.log('about to emit')
        io.emit('RECEIVE_MESSAGE', data);
    })
});
