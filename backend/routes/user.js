const express = require('express');
const router = express.Router();
const userController = require('../controllers/user')

router.post('/signup', userController.userSignUp);

router.post('/login', userController.userLogin);

router.get('/logout', userController.userLogOut)

module.exports = router;