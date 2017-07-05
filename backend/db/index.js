const config = require('config');
const mongoose = require('mongoose');

// db config
const db_host = config.get('db.host');
const db_port = config.get('db.port');
const db_name = config.get('db.name');
const db_connection_string = db_host + ':' + db_port; // no need
const db = mongoose.createConnection(db_host, db_name);

// Model
const User = require('./models/user.js')(db);
const Group = require('./models/group.js')(db);



module.exports =  {User, Group};
