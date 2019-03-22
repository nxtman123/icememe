// import modules
const express = require('express');
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');
const path = require('path');
require('dotenv').config();

// handlers
const authentication = require('./authentication');

// setup app and server
const port = process.env.NODE_ENV === 'production' ? process.env.PORT || 5000 : 5000;
const app = express();
const server = require('http').createServer(app);

// connect socket.io
const io = require('socket.io')(server);

// connect to database
const psql = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,
  debug: process.env.NODE_ENV !== 'production',
});

// socket event handlers
io.on('connect', (socket) => {
  console.log('a user connected!');

  // Index page demo socket and database interaction
  socket.on('hello', (message) => {
    console.log('hello', message);
    psql.select('table_name').from('information_schema.tables').limit(8)
      .map(row => row.table_name)
      .then((tableNames) => {
        socket.emit('hello', `wow, so ${message}, very message\n\n${tableNames.join('\n')}`);
      });
  });

  socket.on('register', (userInfo) => {
    let registrationResult = authentication.register(psql, userInfo);
    socket.emit('register', registrationResult);
  });

  socket.on('login', async (userInfo) => {
    let isAuthenticated = await authentication.login(psql, userInfo);
    console.log(isAuthenticated);
    socket.emit('login', isAuthenticated);
  });

  socket.on('protected', (data) => {
    let tokenToCheck = data.token;

    if (authentication.verifyToken(tokenToCheck)) {
      socket.emit('protected', 'you\'re allowed in !');
    } else {
      socket.emit('protected', 'you\'re not allowed in !');
    }
  });

  socket.on('decode', (data) => {
    let tokenToDecode = data.token;

    if (authentication.decodeToken(tokenToDecode)) {
      socket.emit('decode', 'token decoded successfully');
    } else {
      socket.emit('decode', 'could not decode token');
    }
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
