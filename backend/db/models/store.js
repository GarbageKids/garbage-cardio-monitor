const mongoose = require('mongoose');
const schema = new mongoose.Schema({
	user_id: {
		type: String,
		required: true
	},
	value: {
		type: Number,
		required: true
	},
	date: {
		type: String,
		required: true
	}
});

module.exports = (db) => {
	return db.model('Store', schema, 'store');
};