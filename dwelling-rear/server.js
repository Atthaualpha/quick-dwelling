const app = require('express')();
const morgan = require('morgan');
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(morgan('dev'));

app.get('/', function(req, res) {
  res.send('Hello from server for quick-dwelling :D');
});

io.on('connection', function(socket) {
  /* LED */
  // check if led is on or off
  socket.on('statusLed', led => {
    socket.broadcast.emit('ledState', led);
  });

  socket.on('getStateLed', state => {
    socket.broadcast.emit('resStateLed', state);
  });

  // set close or open a specific led
  socket.on('cool-burn', (led, status) => {
    socket.broadcast.emit('ledEvent', led, status);
  });

  /* DOORS */

  // check if a door is open(roll) or close(over)
  socket.on('statusDoor', door => {
    socket.broadcast.emit('doorStatus', door);
  });

  socket.on('getStateDoor', state => {
    console.log(state);
    socket.broadcast.emit('resStateDoor', state);
  });

  // set close or open to specific door
  socket.on('rollup-rollover', (door, status) => {
    console.log(status);
    socket.broadcast.emit('doorEvent', door, status);
  });

  /* WINDOW */

  socket.on('statusWindow', () => {    
    socket.broadcast.emit('windowState');
  });

  socket.on('getStatusWindow', (state) => {
    socket.broadcast.emit('resWindowState', state);
  });

  socket.on('wheelWindow', (status) => {
    socket.broadcast.emit('windowEvent', status);
  });
  
});

server.listen(4028);
