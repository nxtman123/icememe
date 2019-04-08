// import modules
const express = require('express');
const serveStatic = require('serve-static');
const enforce = require('express-sslify');
const history = require('connect-history-api-fallback');
const path = require('path');
require('dotenv').config();

// setup app and server
const port = process.env.NODE_ENV === 'production' ? process.env.PORT || 5000 : 5000;
const app = express();
const server = require('http').createServer(app);

// enforce HTTPS in production
if (process.env.NODE_ENV === 'production') {
  app.use(enforce.HTTPS({ trustProtoHeader: true }));
}

// connect socket.io
const io = require('socket.io')(server);

// connect to database
const psql = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  debug: process.env.NODE_ENV !== 'production',
});

// import authentication and pass psql
const authentication = require('./authentication')(psql);
const meme = require('./meme')(psql);

// socket event handlers
io.on('connect', (socket) => {
  console.log('a user connected!');

  // check if token exists
  let socketUser = false;
  if (socket.handshake.query.token) {
    socketUser = authentication.verifyToken(socket.handshake.query.token);
  }

  // Index page demo socket and database interaction
  socket.on('hello', (message) => {
    console.log('hello', message);
    psql.select('table_name').from('information_schema.tables').limit(8)
      .map(row => row.table_name)
      .then((tableNames) => {
        socket.emit('hello', `wow, so ${message}, very message\n\n${tableNames.join('\n')}`);
      });
  });

  /*
    registration requires: 'username', 'email', 'password'
    returns JWT
   */
  socket.on('register', async (user) => {
    const registration = await authentication.register(user);

    if (registration === true) {
      const loggedIn = await authentication.login(user);
      socket.emit('register', loggedIn);
    } else {
      socket.emit('register', registration);
    }
  });

  /*
   login requires: 'username', 'password'
   returns JWT
   */
  socket.on('login', async (user) => {
    const token = await authentication.login(user);
    socket.emit('login', token);
  });

  socket.on('uploadMemeData', async (data) => {
    if (socketUser === false) {
      return socket.emit('uploadMemeData', 'cannot verify user');
    }
    const saveResult = await meme.saveMeme(data, socketUser);

    return socket.emit('uploadMemeData', saveResult);
  });

  socket.on('addComment', async (data) => {
    if (socketUser === false) {
      return socket.emit('addComment', 'cannot verify user');
    }

    const commentResult = await meme.addComment(data, socketUser);

    return socket.emit('addComment', commentResult);
  });

  socket.on('getMemeComments', async (data) => {
    const comments = await meme.getMemeComments(data);

    return socket.emit('getMemeComments', comments);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected :(');
  });
});

// start server
app.use(history());
app.use(serveStatic(path.join(__dirname, '../../dist/spa')));
server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
