const app = require('express').Router();
const config = require('config');

app.get('/', (req, res) => {
	res.json({ success: 1, text: 'Connected bluemix'});
});

module.exports = app;