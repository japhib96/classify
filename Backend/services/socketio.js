var socket = require('socket.io');
io = socket(server);

io.on('connection', (socket) => {
    console.log(socket.id);
});
