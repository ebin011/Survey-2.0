module.exports = function(http) {
  const io = require('socket.io')(http);

   io.on('connection', (socket) => {

   	});
}
