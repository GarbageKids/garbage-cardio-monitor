const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const session = require('express-session');
const config = require('config');
const port = config.get('port');
// Running port 
server.listen(port, function() {
	console.log('Running server on ' + port);
});
// initialize the session
app.use(session({
	secret: "ibmwatson",
	resave: true,
	saveUninitialized: true
}));
// Static files
app.use('/static', express.static(path.join(__dirname, 'public')));
// Template engine
app.use(express.static(__dirname + '/views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routing
const route_main = require('./routes/index.js');
const route_api = require('./routes/api/index.js');

app.use('/', route_main);
app.use('/api', route_api);






