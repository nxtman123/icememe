const express = require('express');
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');
const path = require('path');

const port = process.env.PORT || 5000;
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connect', (socket) => {
  console.log('a user connected!');

  socket.on('hello', (message) => {
    console.log(message);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected :(');
  });
});

app.use(history());
app.use(serveStatic(path.join(__dirname, '/dist/spa')));
server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
