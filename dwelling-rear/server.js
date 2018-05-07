const app = require('express')();
const morgan = require('morgan');
const server = require('http').Server(app);
const io = require('socket.io')(server);



app.use(morgan('dev'));

app.get('/', function(req, res) {
  res.send('hello with nodemon');
});

io.on('connection', function(socket) {
    socket.on('hello', function(data) {
        console.log(data);
    });
});

server.listen(4028);
