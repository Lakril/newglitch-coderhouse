import express from 'express';
import handlebars from 'express-handlebars';
import { webRouter } from './routers/web.router.js';
import { Server } from 'socket.io';
import { messagesManager } from './services/MessageManager.js';
import { apiRouter } from './routers/api.router.js';

const app = express();

app.engine('handlebars', handlebars.engine());

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

const webSocketServer = new Server(server);

app.use((req, res, next) => {
  res['greet'] = () => {
    console.log('Hola desde un middleware');
  }
  next();
})
app.use((req, res, next) => {
  res['notifyNewMessage'] = async () => {
    webSocketServer.emit('messages', await messagesManager.findAll());
  }
  next();
})

app.use('/static', express.static('./static'));
app.use('/', webRouter);
app.use('/api', apiRouter);

webSocketServer.on('connection', async (socket) => {
  // console.log(socket.handshake.auth.username + ' connected');
  socket.broadcast.emit('NewUser', socket.handshake.auth.user);

  socket.emit('messages', await messagesManager.findAll());

  socket.on('message', async (message) => {
    // socket.broadcast.emit('message', message);
    await messagesManager.addMessage(message);
    
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('disconnectedUser', socket.handshake.auth.user);
  });
});
