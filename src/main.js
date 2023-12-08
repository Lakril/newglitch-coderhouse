import express from 'express';
import handlebars from 'express-handlebars';
import { webRouter } from './routers/web.router.js';
import { Server } from 'socket.io';

const app = express();

app.engine('handlebars', handlebars.engine());


const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const webSocketServer = new Server(server);

app.use('/static', express.static('./static'));
app.use('/', webRouter);

webSocketServer.on('connection', (socket) => {
  console.log(socket.id);
});