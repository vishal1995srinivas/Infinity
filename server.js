const express = require('express');
const logger = require('morgan');
const expressValidator = require('express-validator');

const requests = require('./routes/requests');
const collections = require('./routes/collections');

const users = require('./routes/users');
const bodyParser = require('body-parser');
const mongoose = require('./config/database'); //database configuration
var jwt = require('jsonwebtoken');
let cors = require('cors');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.set('secretKey', 'nodeRestApi'); // jwt secret token
// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
app.get('/', function(req, res) {
	res.json({ tutorial: 'Build REST API with node.js' });
});
// public route
app.use('/users', users);
// private route

app.use('/api/v1/requests', validateUser, requests);
app.use('/api/v1/collections', validateUser, collections);
app.get('/favicon.ico', function(req, res) {
	res.sendStatus(204);
});

function validateUser(req, res, next) {
	jwt.verify(req.headers['x-access-token'], req.app.get('secretKey'), function(err, decoded) {
		if (err) {
			res.json({ status: 'error', message: err.message, data: null });
		} else {
			// add user id to request
			req.body.userId = decoded.id;
			next();
		}
	});
}
// express doesn't consider not found 404 as an error so we need to handle 404 it explicitly
// handle 404 error
app.use(function(req, res, next) {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// handle errors
app.use(function(err, req, res, next) {
	console.log(err);
	if (err.status === 404) res.status(404).json({ message: 'Not found' });
	else res.status(500).json({ message: 'Something looks wrong :( !!!' });
});

app.listen(5000, function() {
	console.log('Node server listening on port 5000');
});
