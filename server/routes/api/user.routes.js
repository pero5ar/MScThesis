const express = require('express');
const asyncWrap = require('express-async-wrap');

const authenticate = require('../../middleware/authentication.middleware');

const UserController = require('../../controllers/user.controller');

const router = express.Router();

router.post('', asyncWrap(UserController.create));

router.post('/login', asyncWrap(UserController.login));

router.post('/logout', authenticate, asyncWrap(UserController.logout));

router.get('/refresh', authenticate, asyncWrap(UserController.refresh));

module.exports = router;
