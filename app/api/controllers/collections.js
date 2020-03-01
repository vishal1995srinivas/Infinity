const collectionsModel = require('../models/collections');
const requestsModel = require('../models/requests');

module.exports = {
	// getById: function(req, res, next) {
	// 	console.log(req.body);
	// 	movieModel.findById(req.params.movieId, function(err, movieInfo) {
	// 		if (err) {
	// 			next(err);
	// 		} else {
	// 			res.json({ status: 'success', message: 'Movie found!!!', data: { movies: movieInfo } });
	// 		}
	// 	});
	// },
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
	deleteByName: function(req, res, next) {
		let id = req.params.collectionId;
		collectionsModel.findByIdAndRemove(id, function(err, collectionInfo) {
			if (err) next(err);
			else {
				res.json({ status: 'success', message: 'Collection deleted successfully!!!', data: null });
			}
		});
	},
	createCollection: function(req, res, next) {
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
	},
	AddRequestToCollection: function(req, res, next) {
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
	}
	//we get : nameOfCollection, userId, requestDetails in req

	//first save request in requests and get id

	//get collection based on userId

	//Push request Id into requests of this collection
};
// function getSaveIteree(num, cb) {
// 	Restaurant.findOne({
// 	  restaurant_id: restaurantId
// 	}).exec((err, restaurant) => {
// 	  if (err) {
// 		return cb(err);
// 	  }
// 	  if (!restaurant) {
// 		return cb(new Error('Restaurant not found'));
// 	  }
// 	  restaurant.grades.push(makeNewGrade());
// 	  restaurant.save(cb);
// 	});
//   }
