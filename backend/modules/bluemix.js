const request = require('request');
const config = require('config');
let io = require('socket.io');

const Client = require("ibmiotf");


const appClientConfig = config.get('bluemix');
const appClient = new Client.IotfApplication(appClientConfig);

const db = require('../db/index');


appClient.connect();
appClient.on("connect", function() {
    appClient.subscribeToDeviceEvents("watch", "124", "+", "json");
    appClient.subscribeToDeviceEvents("watch", "125", "+", "json");
    appClient.subscribeToDeviceEvents("watch", "126", "+", "json");
    appClient.subscribeToDeviceEvents("watch", "127", "+", "json");

});
/*
db.User.find({}, (err, users) => {
    appClient.on("deviceEvent", function(deviceType, deviceId, eventType, format, payload) {
        users.forEach((user) => {
            if (user.device_id == deviceId) {
                db.Store.findOneAndRemove({ user_id: user._id }, (err) => {
                    if (err) console.log(err + ' line: ' + 42);
                    db.Store({ user_id: user._id, value: payload.heart_rate }).save((err) => {
                        if (err) console.log(err + ' line: ' + 44);
                    });
                });
            }
        });
    });
});
*/

appClient.on("deviceEvent", function(deviceType, deviceId, eventType, format, payload) {
    db.User.findOne({ device_id: deviceId }, (err, user) => {
        let data = JSON.parse(payload.toString()).d;
        let lon = data.location.longitude;
        let lat = data.location.latitude;
        db.User.update({ _id: user._id }, { lon: lon, lat: lat }, { multi: true }, (err, n) => {});
        db.Store.findOneAndRemove({ user_id: user._id}, (err) => {
            if (err) console.log(err + ' line: ' + 42);
            db.Store({ user_id: user._id, value: data.heart_rate, date: Date.now().toString() }).save((err, w) => {
                if (err) console.log(err + ' line: ' + 44);
            });
        });


    });
});



function realTime(socket) {

}

module.exports = (server) => {
    io = io(server);
    io.on('connection', realTime);
}
