//Set up mongoose connection
//console.log('in db config');
const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/node_rest_api';
mongoose.connect(process.env.MONGODB_URI || mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
module.exports = mongoose;
/*const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));*/
