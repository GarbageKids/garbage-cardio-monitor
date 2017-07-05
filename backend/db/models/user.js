const mongoose = require('mongoose');
const schema = new mongoose.Schema({
	fname: { 
		type: String 
	},
	lname: { 
		type: String
	},
	email: { 
		type: String,
		required: true, 
		index: { unique: true },
		lowercase: true
	},
	password: {
		type: String,
		required: true
	},
	age: { 
		type: Number 
	},
	gender: { 
		type: String 
	},
	device_id: { 
		type: String 
	}
}, { runSettersOnQuery: true });

module.exports = (db) => {
	return db.model('User', schema);
};