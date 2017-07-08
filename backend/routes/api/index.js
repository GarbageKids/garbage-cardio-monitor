const app = require('express').Router();
app.use('/user', require('./user/index.js'));




module.exports = app;