const requestsModel = require('../models/requests');

const { body } = require('express-validator/check');
const { validationResult } = require('express-validator/check');

module.exports = {
	getById: function(req, res, next) {
		if (req.params.requestId !== undefined) {
			let id = req.params.requestId;
			console.log(id);
			requestsModel.findById(`${id}`, function(err, results) {
				if (err) return console.error(err);
				try {
					res.json({
						status: 'success',
						message: 'request found.',
						data: results
					});
					// console.log(results);
				} catch (error) {
					console.log('errror getting results');
					console.log(error);
				}
			});
		} else
			res.json({
				status: 'failure',
				message: 'No collection Id found in params of request. Please provide!!!',
				data: null
			});
	},
	getAll: function(req, res, next) {
		try {
			// const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

			// if (!errors.isEmpty()) {
			// 	res.status(422).json({ errors: errors.array() });
			// 	return;
			// }
			let requestsList = [];
			let id = req.query.userId;
			console.log(id);
			requestsModel.find(req.query, function(err, requests) {
				if (err) {
					next(err);
				} else {
					for (let request of requests) {
						console.log(request);
						requestsList.push(request);
					}
					res.json({
						status: 'success',
						message: 'Requests list found and here it is!!!',
						data: { requests: requestsList }
					});
				}
			});
		} catch (err) {
			return next(err);
		}
	}, //Check this
	create: function(req, res, next) {
		try {
			const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

			if (!errors.isEmpty()) {
				res.status(422).json({ errors: errors.array() });
				return;
			}
			requestsModel.create(
				{
					userId: req.body.userId,
					url: req.body.url,
					method: req.body.method,
					title: req.body.title,
					headers: req.body.headers,
					data: req.body.data,
					testJson: req.body.testJson
				},
				function(err, result) {
					if (err) next(err);
					else res.json({ status: 'success', message: 'Request added successfully!!!', data: result });
				}
			);
		} catch (err) {
			return next(err);
		}
	},
	validate: (method) => {
		switch (method) {
			case 'create': {
				return [
					body('userId', 'Invalid / No userId').exists().isString(),
					body('url', 'No url Found').exists(),
					body('method', 'No method Found').exists().isString(),
					body('headers', 'No headers Found').exists(),
					body('title', 'No title Found').exists(), //it can be null but it shud be present
					body('data', 'No data Found').exists(),
					body('testJson', 'No testJson Found .It can be null').exists()
				];
			}
		}
	}
};
