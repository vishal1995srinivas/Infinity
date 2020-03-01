const express = require('express');
const router = express.Router();
const userController = require('../app/api/controllers/users');

router.post('/register', userController.validate('createUser'), userController.create);
router.post('/authenticate', userController.validate('loginUser'), userController.authenticate);

module.exports = router;
