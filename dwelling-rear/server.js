const app = require('express')();
const morgan = require('morgan');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const j5 = require('johnny-five');
var board;
var board = new j5.Board({
  repl: false
});

const leds = { home: 7, dining: 6, kitchen: 5, wash: 4, bath: 3, bed: 2 };
const doors = { home: 0, bed: 1, bath: 2 };
const window = [11, 10, 9, 8];
var stepRotation;
var doorsEngine;
var windowStep;

board.on('ready', function() {
  // doorsEngine = new j5.Servos([5, 6, 7]);
  // doorsEngine.to(90);
  var stepper = new j5.Stepper({
    type: j5.Stepper.TYPE.FOUR_WIRE,
    stepsPerRev: 50,
    pins: [11,10,9,8]
  });

  stepper.rpm(300).ccw().step(512, function() {
    console.log("done");
  });
});

app.use(morgan('dev'));

app.get('/', function(req, res) {
  res.send('Hello from server for quick-dwelling :D');
});

io.on('connection', function(socket) {
  /* LED */
  // check if led is on or off
  socket.on('statusLed', (led, fn) => {
    board.pinMode(leds[led], j5.Pin.INPUT);
    var status;
    board.digitalRead(leds[led], function(value) {
      if (status == undefined) {
        status = value;
        if (status == 1) {
          board.pinMode(leds[led], j5.Pin.OUTPUT);
          board.digitalWrite(leds[led], 1);
          fn('afire');
        } else {
          fn('quench');
        }
      }
    });
  });

  // set close or open a specific led
  socket.on('cool-burn', (led, status, fn) => {
    board.pinMode(leds[led], j5.Pin.OUTPUT);
    if (status == 'afire') {
      board.digitalWrite(leds[led], 0);
      fn('quench');
    } else {
      board.digitalWrite(leds[led], 1);
      fn('afire');
    }
  });

  /* DOORS */

  // check if a door is open(roll) or close(over)
  socket.on('statusDoor', (door, fn) => {
    var status = doorsEngine[doors[door]].value;
    if (status == 90) {
      fn('over');
    } else {
      fn('roll');
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
  socket.on('wheelWindow', (status, fn) => {
    var rotation;
    if (status == 'down') {
      rotation = -200;
    } else {
      rotation = 200;
    }
    const stepsRight = [[0, 0, 1, 1], [0, 1, 1, 0], [1, 1, 0, 0], [1, 0, 0, 1]];
    const stepsLeft = [[1, 1, 0, 0], [0, 1, 1, 0], [0, 0, 1, 1], [1, 0, 0, 1]];
    if (status == 'down') {
      stepRotation = stepsLeft;
    } else {
      stepRotation = stepsRight;
    }
    rotation = rotation * 1.4222222222; // ajuste de 512 vueltas a 360 grados
    rotation = Math.abs(rotation);
    rotarVentana(rotation);

    // rotateWindow(0, Math.abs(rotation));
    fn('ok');
  });

  function rotateWindow(index, step) {
    if (step > 0) {
      step = index < 4 ? step : step - 1;
      index = index < 4 ? index : 0;
      for (var i = 0; i <= 3; i++) {
        // console.log(stepRotation[index][i]);
        board.digitalWrite(window[index], stepRotation[index][i]);
      }
      board.wait(5, () => {
        // console.log('######');
        rotateWindow(index + 1, step);
      });
    } else {
      console.log('close');
      for (var j = 0; j <= 3; j++) {
        board.digitalWrite(window[j], 0);
      }
    }
  }

  function rotarVentana(steps) {
    for (var i = 0; i <= 3; i++) {
      console.log(window[i], stepRotation[i][0]);
      board.digitalWrite(window[i], stepRotation[i][0]);
    }
    for (var i = 0; i <= 3; i++) {
      console.log(window[i], stepRotation[i][0]);
      board.digitalWrite(window[i], stepRotation[i][1]);
    }
    for (var i = 0; i <= 3; i++) {
      console.log(window[i], stepRotation[i][0]);
      board.digitalWrite(window[i], stepRotation[i][2]);
    }
    for (var i = 0; i <= 3; i++) {
      console.log(window[i], stepRotation[i][0]);
      board.digitalWrite(window[i], stepRotation[i][3]);
    }
    setTimeout(() => {
      steps = steps - 1;
      if (steps > 0) {
        rotarVentana(steps);
      }
    }, 100);
  }
});

server.listen(4028);
