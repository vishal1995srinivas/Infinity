const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
	userId: {
		type: String,
		required: true
	},
	url: {
		type: String,
		trim: true,
		required: true
	},

	title: String,
	method: {
		type: String,
		required: true
	},
	data: {
		type: [ Object ]
	},
	headers: {
		type: [ Object ]
	},
	testJson: {
		type: Object
	}
});

module.exports = mongoose.model('Requests', RequestSchema);
