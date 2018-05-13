const app = require('express')();
const server = require('http').Server(app);
//var socket = require('socket.io-client')('http://localhost:4028');
const j5 = require('johnny-five');
const io = require('socket.io-client');
// or with import syntax


const socket = io('http://localhost:4028', { 
     });
var board;
var board = new j5.Board({
  repl: false
});

const leds = { home: 9, dining: 8, kitchen: 7, wash: 6, bath: 5, bed: 4 };
const doors = { home: 0, bed: 1, bath: 2 };

socket.on('connect', () => {
  console.log('conected');
});

socket.on('ledState', (led) => {
    console.log(led);
  board.pinMode(leds[led], j5.Pin.INPUT);
  var status;
  board.digitalRead(leds[led], function(value) {
    if (status == undefined) {
      status = value;
      if (status == 1) {
        board.pinMode(leds[led], j5.Pin.OUTPUT);
        board.digitalWrite(leds[led], 1);
       // console.log('afire');        
        socket.emit('getstate', 'afire');
        // fn('afire');
      } else {  
        // fn('quench');        
        socket.emit('getstate', 'quench');
       // console.log('quench');
      }
    }
  });
});

socket.on('ledEvent', (led, status) => {
  console.log(led,status);
  board.pinMode(leds[led], j5.Pin.OUTPUT);
  if (status == 'afire') { 
    board.digitalWrite(leds[led], 0);
    socket.emit('getstate', 'quench');
    //fn('quench');
  } else {
    board.digitalWrite(leds[led], 1);
    socket.emit('getstate', 'afire');
    //fn('afire');
  }
});

socket.on('doorStatus', () => {});

socket.on('doorEvent', () => {});

socket.on('windowEvent', () => {});

app.get('/', function(req, res) {
  res.send('local server on deman');
});

server.listen(3005);
