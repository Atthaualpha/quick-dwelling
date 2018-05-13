const app = require('express')();
const server = require('http').Server(app);
const j5 = require('johnny-five');
const io = require('socket.io-client');

const socket = io('http://localhost:4028', {});
var board;
var board = new j5.Board({
  repl: false,
  port: 'COM6'
});

board.on('ready', function() {
  // board.i2cConfig();
});

const leds = { home: 9, dining: 8, kitchen: 7, wash: 6, bath: 5, bed: 4 };
const doors = { home: 0, bed: 1, bath: 2 };

socket.on('connect', () => {
  console.log('conected');
});

socket.on('ledState', led => {
  // console.log(led);
  board.pinMode(leds[led], j5.Pin.INPUT);
  var status;
  board.digitalRead(leds[led], function(value) {
    if (status == undefined) {
      status = value;
      if (status == 1) {
        board.pinMode(leds[led], j5.Pin.OUTPUT);
        board.digitalWrite(leds[led], 1);
        // console.log('afire');
        socket.emit('getStateLed', 'afire');
        // fn('afire');
      } else {
        // fn('quench');
        socket.emit('getStateLed', 'quench');
        // console.log('quench');
      }
    }
  });
});

socket.on('ledEvent', (led, status) => {
  // console.log(led, status);
  board.pinMode(leds[led], j5.Pin.OUTPUT);
  if (status == 'afire') {
    board.digitalWrite(leds[led], 0);
    socket.emit('getStateLed', 'quench');
    //fn('quench');
  } else {
    board.digitalWrite(leds[led], 1);
    socket.emit('getStateLed', 'afire');
    //fn('afire');
  }
});

socket.on('doorStatus', door => {
  var status = doorsEngine[doors[door]].value;
  socket.emit('getStateDoor', 'over');
  if (status == 90) {
    // fn('over');
  } else {
    socket.emit('getStateDoor', 'roll');
    // fn('roll');
  }
});

socket.on('doorEvent', (door, status) => {
  if (status == 'over') {
    doorsEngine[doors[door]].to(0, 3000, 10);
    socket.emit('getStateDoor', 'roll');
    // fn('roll');
  } else {
    doorsEngine[doors[door]].to(90, 3000, 10);
    socket.emit('getStateDoor', 'over');
    // fn('over');
  }
});

socket.on('windowState', () => {
  board.i2cReadOnce(0x08, 1, function(state) {
    var status = String.fromCharCode(state[0]);
    // console.log(String.fromCharCode(state));
    if (status == 'd') {
      socket.emit('getStatusWindow', 'down');
    } else if (status == 'u') {
      socket.emit('getStatusWindow', 'up');
    }
  });
}); 

socket.on('windowEvent', status => {
  console.log('write');
  if (status == 'down') {
    console.log(status);
    board.i2cWrite(
      0x08,
      'mu'.split('').map(function(c) {
        return c.charCodeAt(0);
      })
    );
    socket.emit('getStatusWindow', 'up');
  } else {
    console.log(status);
    board.i2cWrite(
      0x08,
      'md'.split('').map(function(c) {
        return c.charCodeAt(0);
      })
    );
    socket.emit('getStatusWindow', 'down');
  }
});

app.get('/', function(req, res) {
  res.send('local server on deman');
});

server.listen(3005);
