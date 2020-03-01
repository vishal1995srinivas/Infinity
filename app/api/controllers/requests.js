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
	},
	// updateById: function(req, res, next) {
	// 	movieModel.findByIdAndUpdate(req.params.movieId, { name: req.body.name }, function(err, movieInfo) {
	// 		if (err) next(err);
	// 		else {
	// 			res.json({ status: 'success', message: 'Movie updated successfully!!!', data: null });
	// 		}
	// 	});
	// },
	// deleteById: function(req, res, next) {
	// 	movieModel.findByIdAndRemove(req.params.movieId, function(err, movieInfo) {
	// 		if (err) next(err);
	// 		else {
	// 			res.json({ status: 'success', message: 'Movie deleted successfully!!!', data: null });
	// 		}
	// 	});
	// },

	create: function(req, res, next) {
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
				else res.json({ status: 'success', message: 'Request added successfully!!!', data: null });
			}
		);
	}
};
