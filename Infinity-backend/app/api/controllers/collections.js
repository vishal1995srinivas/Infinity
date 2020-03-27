const collectionsModel = require('../models/collections');
const requestsModel = require('../models/requests');
const { body } = require('express-validator/check');
const { validationResult } = require('express-validator/check');

module.exports = {
	getAll: function(req, res, next) {
		let collectionsList = [];
		collectionsModel.find(req.query, function(err, collections) {
			if (err) {
				next(err);
			} else {
				for (let collection of collections) {
					collectionsList.push(collection);
				}
				res.json({
					status: 'success',
					message: 'Collections list found!!!',
					data: { collection: collectionsList }
				});
			}
		});
	},

	deleteById: function(req, res, next) {
		if (req.params.collectionId !== undefined) {
			let id = req.params.collectionId;
			collectionsModel.findByIdAndRemove(id, function(err, collectionInfo) {
				if (err) next(err);
				else {
					res.json({ status: 'success', message: 'Collection deleted successfully!!!', data: null });
				}
			});
		} else
			res.json({
				status: 'failure',
				message: 'No collection Id found in params of request. Please provide!!!',
				data: null
			});
	},
	createCollection: function(req, res, next) {
		try {
			const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

			if (!errors.isEmpty()) {
				res.status(422).json({ errors: errors.array() });
				return;
			}
			collectionsModel.create(
				{
					collectionName: req.body.collectionName,
					userId: req.body.userId
				},
				function(err, result) {
					if (err) next(err);
					else res.json({ status: 'success', message: 'Collection added successfully!!!', data: null });
				}
			);
		} catch (err) {
			return next(err);
		}
	},
	AddRequestToCollection: function(req, res, next) {
		try {
			const errors = validationResult(req); // Finds the validation errors in this request and wraps them in an object with handy functions

			if (!errors.isEmpty()) {
				res.status(422).json({ errors: errors.array() });
				return;
			}
			requestsModel
				.create(req.body)
				.then((createdData) => {
					collectionsModel
						.findOne({ userId: req.body.userId, collectionName: req.body.collectionName })
						.exec((err, collection) => {
							if (err) {
								next(err);
							} else if (!collection) {
								res.json({ status: 'failure', message: 'No Collection Found' });
							}
							collection
								.update({ $push: { requests: createdData._id } })
								.then((updatedData) => {
									res.json({
										status: 'success',
										message: 'Collection updated successfully!!!',
										data: updatedData
									});
								})
								.catch((err) => next(err));
						});
				})
				.catch((err) => next(err));
		} catch (err) {
			return next(err);
		}
	},
	validate: (method) => {
		switch (method) {
			case 'create': {
				return [
					body('collectionName', 'Invalid / No collectionName').exists().isString(),
					body('userId', 'No userId Found').exists().isString()
				];
			}
			case 'addRequest': {
				return [
					body('userId', 'Invalid / No userId').exists().isString(),
					body('url', 'No url Found').exists().isURL(),
					body('method', 'No method Found').exists().isString(),
					body('headers', 'No headers Found').exists(),
					body('title', 'No title Found').exists(), //it can be null but it shud be present
					body('data', 'No data Found').exists(),
					body('testJson', 'No testJson Found .It can be null').exists(),
					body('collectionName', 'No collectionName found').exists().isString()
				];
			}
		}
	}
	//we get : nameOfCollection, userId, requestDetails in req

	//first save request in requests and get id

	//get collection based on userId

	//Push request Id into requests of this collection
};
