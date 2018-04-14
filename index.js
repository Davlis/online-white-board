const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const uuidv1 = require('uuid/v1');

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

function onConnection(socket){
  socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
}

app.get('/link', (req, res) => {
  res.send(uuidv1());
});

io.on('connection', onConnection);

http.listen(port, () => console.log('listening on port ' + port));
