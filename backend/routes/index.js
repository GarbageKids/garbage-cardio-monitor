// DB
const db = require('../db/index.js');
const app = require('express').Router();

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

// Main routing 
module.exports = app;