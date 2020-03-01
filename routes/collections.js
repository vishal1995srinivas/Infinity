const express = require('express');
const router = express.Router();
const collectionsController = require('../app/api/controllers/collections');
router.get('/', collectionsController.getAll);
router.post('/', collectionsController.createCollection);
router.put('/', collectionsController.AddRequestToCollection);
router.delete('/:collectionId', collectionsController.deleteByName);
module.exports = router;
