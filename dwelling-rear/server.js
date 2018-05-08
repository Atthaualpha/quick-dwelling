const app = require('express')();
const morgan = require('morgan');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const j5 = require('johnny-five');

// var board = new j5.Board({
//     repl: false
// });

// board.on('ready', function() {  
    
// });

app.use(morgan('dev'));

const leds = [2,3,4,5,6];

app.get('/', function(req, res) {
    res.send('Hello from server for quick-dwelling :D');
});


io.on('connection', function(socket) {
    socket.on('hello', function(data) {                
    });

    socket.on('statusLed', (led, fn) => {
        console.log(led);
        fn('recibido');
    });
});

server.listen(4028);
