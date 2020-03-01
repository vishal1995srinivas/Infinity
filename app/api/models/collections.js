const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const CollectionsSchema = new Schema({
	userId: {
		type: String,
		required: true
	},
	collectionName: {
		type: String,
		required: true
	},
	requests: {
		type: Array
	}
});

module.exports = mongoose.model('Collections', CollectionsSchema);
