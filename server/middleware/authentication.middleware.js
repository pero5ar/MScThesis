const Errors = require('restify-errors');
const asyncWrap = require('express-async-wrap');
const UserService = require('../services/user.service');

const authenticate = asyncWrap(async (req, res, next) => {
	const { email, token } = req.headers;
	if (!email || !token) {
		throw new Errors.UnauthorizedError('Missing authentication details');
	}

	const user = await UserService.findByEmailForAuth(email);
	if (!user) {
		throw new Errors.UnauthorizedError('User does not exist');
	}
	const isTokenValid = await user.isTokenValid(token);
	if (!isTokenValid) {
		throw new Errors.UnauthorizedError('Invalid token');
	}

	res.locals.userId = user.id;
	res.locals.userEmail = user.email;
	res.locals.userType = user.type;

	next();
});

module.exports = authenticate;
