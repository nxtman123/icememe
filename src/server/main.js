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
require('pg').types.setTypeParser(20, x => parseInt(x, 10)); // make SQL count() return Numbers
const psql = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  debug: process.env.NODE_ENV !== 'production',
});

// import libraries and pass psql
const authentication = require('./authentication')(psql);
const meme = require('./meme')(psql);

// socket event handlers
io.on('connect', (socket) => {
  console.log('a user connected!');

  // authentication events

  let socketUser = false;

  // check if token exists
  if (socket.handshake.query.token) {
    const verifyResult = authentication.verifyToken(socket.handshake.query.token);
    if (verifyResult.isSuccessful) {
      socketUser = verifyResult.value;
      console.log(`welcome back, ${socketUser.username}`);
    } else {
      socket.emit('invalidToken');
    }
  }

  // user = { username, email, password }
  // returns { isSuccessful, value }
  socket.on('register', async (user) => {
    const registration = await authentication.register(user);

    if (registration.isSuccessful === true) {
      const loginResult = await authentication.login(user);

      if (loginResult.isSuccessful) {
        socketUser = authentication.verifyToken(loginResult.value).value;
      }

      socket.emit('register', loginResult);
    } else {
      socket.emit('register', registration);
    }
  });

  // user = { username, password }
  // returns { isSuccessful, value }
  socket.on('login', async (user) => {
    const loginResult = await authentication.login(user);

    if (loginResult.isSuccessful) {
      socketUser = authentication.verifyToken(loginResult.value).value;
    }

    socket.emit('login', loginResult);
  });

  // meme events

  // memeData = { title, cloudinary_url }
  // returns { isSuccessful, value }
  socket.on('addMeme', async (memeData) => {
    if (socketUser === false) {
      return socket.emit('addMeme', {
        isSuccessful: false,
        value: 'cannot verify user',
      });
    }
    const saveResult = await meme.saveMeme(memeData, socketUser);

    return socket.emit('addMeme', saveResult);
  });

  // commentData = { meme_id, text }
  // returns { isSuccessful, value }
  socket.on('addComment', async (commentData) => {
    if (socketUser === false) {
      return socket.emit('addComment', {
        isSuccessful: false,
        value: 'cannot verify user',
      });
    }
    const commentResult = await meme.addComment(commentData, socketUser);

    if (commentResult.isSuccessful) {
      // emit new comment to all users viewing this meme
      io.to(`meme_id: ${commentData.meme_id}`).emit('newLatestComment', commentResult.value);
    }

    return socket.emit('addComment', commentResult);
  });

  // returns { isSuccessful, value }
  socket.on('getMeme', async (memeId) => {
    const memeResult = await meme.getMeme(memeId);

    if (memeResult.isSuccessful) {
      // subscribe to receive new comments live
      socket.join(`meme_id: ${memeId}`);
    }

    return socket.emit('getMeme', memeResult);
  });

  // earliestId is optional
  // returns { isSuccessful, value }
  socket.on('getMemeComments', async (memeId, earliestId) => {
    const commentsResult = await meme.getMemeComments(memeId, earliestId);

    return socket.emit('getMemeComments', commentsResult);
  });

  socket.on('leaveMeme', (memeId) => {
    socket.leave(`meme_id: ${memeId}`, () => {});
  });

  // disconnect

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
