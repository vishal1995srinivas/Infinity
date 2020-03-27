const userModel = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { body } = require('express-validator/check');
const { validationResult } = require('express-validator/check');

module.exports = {
	create: function(req, res, next) {
		try {
			const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

			if (!errors.isEmpty()) {
				res.status(422).json({ errors: errors.array() });
				return;
			}
			userModel.findOne({ email: req.body.email }, function(err, userInfo) {
				if (err) {
					next(err);
				} else {
					if (userInfo == null) {
						userModel.create(
							{ name: req.body.name, email: req.body.email, password: req.body.password },
							function(err, result) {
								if (err) next(err);
								else
									res.json({
										status: 'success',
										message: 'User added successfully!!!',
										data: null
									});
							}
						);
					} else {
						res.json({
							status: 'failure',
							message: 'User already exists!!!',
							data: null
						});
					}
				}
			});
		} catch (err) {
			return next(err);
		}
	},
	authenticate: function(req, res, next) {
		try {
			const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

			if (!errors.isEmpty()) {
				res.status(422).json({ errors: errors.array() });
				return;
			}
			userModel.findOne({ email: req.body.email }, function(err, userInfo) {
				if (err) {
					next(err);
				} else {
					if (userInfo != null && bcrypt.compareSync(req.body.password, userInfo.password)) {
						const token = jwt.sign({ id: userInfo._id }, req.app.get('secretKey'), { expiresIn: '60h' });

						res.json({
							status: 'success',
							message: 'user found!!!',
							data: { user: userInfo, token: token }
						});
					} else {
						res.json({ status: 'error', message: 'Invalid email/password!!!', data: null });
					}
				}
			});
		} catch (err) {
			return next(err);
		}
	},
	validate: (method) => {
		switch (method) {
			case 'loginUser': {
				return [
					body('email', 'Invalid email').exists().isEmail(),
					body('password', 'No password Found').exists()
				];
			}
			case 'createUser': {
				return [
					body('email', 'Invalid / No email').exists().isEmail(),
					body('password', 'No password Found').exists(),
					body('name', 'No username Found').exists()
				];
			}
		}
	}
};
