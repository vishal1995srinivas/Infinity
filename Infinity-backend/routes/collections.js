const express = require('express');
const router = express.Router();
const collectionsController = require('../app/api/controllers/collections');
router.get('/', collectionsController.getAll);
router.post('/', collectionsController.validate('create'), collectionsController.createCollection);
router.put('/', collectionsController.validate('addRequest'), collectionsController.AddRequestToCollection);
router.delete('/:collectionId', collectionsController.deleteById);
module.exports = router;
