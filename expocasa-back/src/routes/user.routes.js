const { Router } = require('express');
const router = Router();
const userController = require('../controllers/user.controller');

router.get('/users', userController.getUsers);

router.post('/users', userController.addUser);

router.post('/login', userController.login);

module.exports = router;