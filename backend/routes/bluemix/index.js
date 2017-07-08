const app = require('express').Router();
const config = require('config');
const db = require('../../db/index');

const mongoose = require('mongoose');

const user_id = "595db7182ca7bd38d0a06231";

app.get('/', (req, res) => {
    res.json({ success: 1, text: 'Connected bluemix' });
});


app.get('/api/last/:device_id', (req, res) => {
    let did = req.params.device_id;
    db.User.findOne({ device_id: did }, (err, user) => {
        db.Store.findOne({ value: { $exists: true }, user_id: user._id }, {}, { sort: { date: -1 } }, (err, store) => {
            res.json(store);
        });
    });
});

app.get('/api/all/:device_id', (req, res) => {
    let did = req.params.device_id;
    db.User.findOne({ device_id: did }, (err, user) => {
        db.Store.find({ value: { $exists: true }, user_id: user._id }, {}, { sort: { date: -1 }, limit: 180 }, (err, store) => {
            res.json(store);
        });
    });
});


app.get('/api/aall', (req, res) => {
    let did = 124;
    db.User.find({ device_id: did }, (err, user) => {
        db.Store.find({ value: { $exists: true }, user_id: user._id }, {}, { sort: { date: -1 } }, (err, store) => {
            res.json(store);
        });
        
    });
});





app.get('/api/lasta/:device_id', (req, res) => {
    let did = req.params.device_id;
    db.User.findOne({ device_id: did }, (err, user) => {
  
        db.Store.findOne({ value: { $exists: true }, user_id: user._id }, {}, { sort: { date: -1 } }, (err, store) => {
            res.json(store);
        });
    });
});


module.exports = app;
