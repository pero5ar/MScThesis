const Errors = require('restify-errors');
const express = require('express');

/**
 * @param {Errors.RestifyHttpErrorOptions} error
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {Function} [next]
 * @returns {void}
 */
const onError = (error, req, res, next) => {
	if (process.env.NODE_ENV !== 'production') {
		console.info(error);
	}
	if (error && error.statusCode) {
		res.status(error.statusCode).json(error.context);
	} else if (error && !error.statusCode) {
		res.status(500).json(new Errors.InternalServerError());
	} else if (next) {
		next();
	}
};

module.exports = onError;
