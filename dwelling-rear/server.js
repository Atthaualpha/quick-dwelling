const app = require('express')();
const morgan = require('morgan');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const j5 = require('johnny-five');

var board = new j5.Board({
  repl: false
});

const leds = { home: 7, dining: 6, kitchen: 5, wash: 4, bath: 3, bed: 2 };
const doors = { home: 1, bed: 2, bath: 3 };
const window = [8, 9, 10, 11];

//var doorsEngine;
var doorsEngine = new five.Servos([5, 6, 7]);

board.on('ready', function() {
  doorsEngine = new five.Servos([5, 6, 7]);
});

app.use(morgan('dev'));

app.get('/', function(req, res) {
  res.send('Hello from server for quick-dwelling :D');
});

io.on('connection', function(socket) {
  /* LED */
  // check if led is on or off
  socket.on('statusLed', (led, fn) => {
    var status = board.digitalRead(leds[led]);
    if (status == 1) {
      fn('afire');
    } else {
      fn('quench');
    }
  });

  // set close or open a specific led
  socket.on('cool-burn', (led, status, fn) => {
    if (status == 'burn') {
      board.digitalWrite(leds[led], 0);
      fn('quench');
    } else {
      board.digitalWrite(leds[led], 1);
      fn('burn');
    }
  });

  /* DOORS */

  // check if a door is open or close
  socket.on('statusDoor', (door, fn) => {
    var status = doorsEngine[doors[door]].value;
    if (status == 90) {
      fn('roll');
    } else {
      fn('over');
    }
  });

  // set close or open to specific door
  socket.on('rollup-rollover', (door, status, fn) => {
    if (status == 'over') {
      doorsEngine[doors[door]].to(0, 3000, 10);
      fn('roll');
    } else {
      doorsEngine[doors[door]].to(90, 3000, 10);
      fn('over');
    }
  });

  /* WINDOW */

  socket.on('statusWindow', fn => {});
});

server.listen(4028);
