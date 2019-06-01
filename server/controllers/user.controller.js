/* eslint-disable valid-jsdoc */
const Errors = require('restify-errors');
const express = require('express');

const UserService = require('../services/user.service');

const UserViewModel = require('../viewModels/user.viewModel');

/**
 * @typedef {(req: express.Request, res: express.Response, next?: Function) => Promise<express.Response>} Endpoint
 */

/** @type {Endpoint} */
const create = async (req, res) => {
	// TODO: validate

	const user = await UserService.create({
		email: req.body.email,
		password: req.body.password,
		type: req.body.type,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
	});
	const token = await user.generateToken();
	const viewModel = new UserViewModel(user, token);

	return res.status(201).json(viewModel);
};

/** @type {Endpoint} */
const login = async (req, res) => {
	const { password, email } = req.body;

	const user = await UserService.findByEmail(email);
	const isPasswordValid = await user.isPasswordValid(password);
	if (!isPasswordValid) {
		throw new Errors.BadRequestError('Invalid password');
	}

	const token = await user.generateToken();
	const viewModel = new UserViewModel(user, token);

	return res.status(200).json(viewModel);
};

/** @type {Endpoint} */
const logout = async (req, res) => {
	const { userId } = res.locals;

	const user = await UserService.findById(userId);
	await user.clearToken();

	return res.status(200);
};

module.exports = {
	create,
	login,
	logout,
};
