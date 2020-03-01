const express = require('express');
const router = express.Router();
const requestController = require('../app/api/controllers/requests');

router.get('/', requestController.getAll);
router.post('/', requestController.validate('create'), requestController.create);
module.exports = router;

/*
getHistory ,
postRequest
postCollection -> first save to requests, get id of new request saved and then save to collection array.
delete collection
*/
