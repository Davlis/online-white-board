const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const uuidv1 = require('uuid/v1');

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

app.get('/link', (req, res) => {
  res.send(uuidv1());
});

function onConnection(socket) {
  socket.on('subscribe', (data) => socket.join(data.room));
  socket.on('drawing', (data) => io.sockets.in(data.room).emit('drawing', data));
  socket.on('unsubscribe', (data) => socket.leave(data.room));
}

io.on('connection', onConnection);
http.listen(port, () => console.log('listening on port ' + port));
