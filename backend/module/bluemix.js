const request = require('request');
const config = require('config');
// Real time
let io = require('socket.io');

function connect(socket) {
	/*
		<- listen right here ->
	*/
}

module.exports = (server) => {
	io = io(server);
	io.on('connection', connect);
};



