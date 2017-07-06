const request = require('request');
const config = require('config');
let io = require('socket.io');



const Client = require("ibmiotf");


const appClientConfig = config.get('bluemix');
const appClient = new Client.IotfApplication(appClientConfig);

const db = require('../db/index');

const users =


    appClient.connect();
appClient.on("connect", function() {

    appClient.subscribeToDeviceEvents("watch", "124", "+", "json");
    appClient.subscribeToDeviceEvents("watch", "125", "+", "json");
    appClient.subscribeToDeviceEvents("watch", "126", "+", "json");
    appClient.subscribeToDeviceEvents("watch", "127", "+", "json");

});
db.User.find({}, (err, row) => {

    row.forEach((user) => {
        appClient.on("deviceEvent", function(deviceType, deviceId, eventType, format, payload) {

            // console.log("Device Event from :: " + deviceType + " : " + deviceId + " of event " + eventType + " with payload : " + payload);
            /*
            db.Store({user_id: '595cd68b479942326c808f90', value: payload.heart_rate}).save((err) => {
            	if(err) console.log(err);
            });
            */

            console.log(user._id + ' - ' + user.device_id);
        });
    });


});



function realTime(socket) {

}

module.exports = (server) => {
    io = io(server);
    io.on('connection', realTime);
}
