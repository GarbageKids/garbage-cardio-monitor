const request = require('request');
const config = require('config');
let io = require('socket.io');


function realTime(socket) {
	
}

module.exports = (server) => {
	io = io(server);
	io.on('connection', realTime);
}

