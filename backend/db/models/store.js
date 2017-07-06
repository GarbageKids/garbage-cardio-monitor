const mongoose = require('mongoose');
const schema = new mongoose.Schema({
	user_id: {
		type: String
	},
	value: {
		type: Number
	},
	date: {
		type: String
	}
});

module.exports = (db) => {
	return db.model('Store', schema);
};