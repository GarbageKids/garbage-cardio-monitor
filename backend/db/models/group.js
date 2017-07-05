const mongoose = require('mongoose');

const schema = mongoose.Schema({
	name: {
		type: String
	}
});

module.exports = (db) => {
	return db.model('Group', schema);
}