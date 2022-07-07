require('dotenv').config();
const http = require('http');
const app = require('./app');
const { Server } = require('socket.io');
const Message = require('./db/models/message');
const { SOCKET_EVENTS } = require('./constants');
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', socket => {
  console.log('user connected');

  socket.on(SOCKET_EVENTS.NEW_MESSAGE, async messageObject => {
    try {
      const createdMesssage = await (
        await Message.create(messageObject)
      ).populate({ path: 'user', select: ['firstName', 'lastName'] });

      io.emit(SOCKET_EVENTS.NEW_MESSAGE, createdMesssage);
    } catch (error) {
      console.log(error);
      io.emit(SOCKET_EVENTS.NEW_MESSAGE_ERROR, error);
    }
  });

  socket.on('disconnect', reason => {
    console.log(`user disconnected because of ${reason}`);
  });
});

const PORT = process.env.PORT || 9999;

server.listen(PORT, () => {
  console.log(`SERVER IS ON ${PORT}`);
});
