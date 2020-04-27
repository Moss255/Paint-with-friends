var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const port = process.env.PORT;

app.get('/', function(req, res) {
   res.sendfile('index.html');
});

var clients = 0;
io.on('connection', function(socket) {
   clients++;
   socket.emit('initialconnect',{ clientID: clients});
   socket.on('mousePos', function(data) {
     socket.broadcast.emit('updatePosition', data);
     console.log(data);
   });
   socket.on('disconnect', function () {
      clients--;
      socket.broadcast.emit('userdisconnect',{ description: clients + ' clients connected!'})
   });
});

http.listen(port, function() {
   console.log('listening on localhost: ' + port);
});