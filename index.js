const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('A user connected');
  
    socket.on('chat message', (data) => {
      console.log('Received message:', data);
      // Broadcast the message and username to all connected clients
      io.emit('chat message', data);
    });
  
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });
  

  server.listen(4500, () => {
    console.log('Server is running on port 4500');
  });
  