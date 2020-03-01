const userModel = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
	create: function(req, res, next) {
		userModel.create({ name: req.body.name, email: req.body.email, password: req.body.password }, function(
			err,
			result
		) {
			if (err) next(err);
			else res.json({ status: 'success', message: 'User added successfully!!!', data: null });
		});
	},
	authenticate: function(req, res, next) {
		console.log(req.body.email, req.body.password);
		userModel.findOne({ email: req.body.email }, function(err, userInfo) {
			if (err) {
				next(err);
			} else {
				if (userInfo != null && bcrypt.compareSync(req.body.password, userInfo.password)) {
					const token = jwt.sign({ id: userInfo._id }, req.app.get('secretKey'), { expiresIn: '5h' });

					res.json({ status: 'success', message: 'user found!!!', data: { user: userInfo, token: token } });
				} else {
					res.json({ status: 'error', message: 'Invalid email/password!!!', data: null });
				}
			}
		});
	}
};
