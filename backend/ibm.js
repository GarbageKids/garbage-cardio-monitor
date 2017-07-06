 const Client = require("ibmiotf");
 const config = require('config');


 var appClientConfig = config.get('bluemix');
 var appClient = new Client.IotfApplication(appClientConfig);

 appClient.connect();


 appClient.on("connect", function() {

     appClient.subscribeToDeviceEvents("watch", "124", "+", "json");

 });
 appClient.on("deviceEvent", function(deviceType, deviceId, eventType, format, payload) {

     console.log("Device Event from :: " + deviceType + " : " + deviceId + " of event " + eventType + " with payload : " + payload);

 });
