const { Router } = require('express');
const router = Router();
const userController = require('../controllers/user.controller');

router.get('/users', userController.getUsers);

router.post('/users', userController.addUser);

module.exports = router;