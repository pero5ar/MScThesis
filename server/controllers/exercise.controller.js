/* eslint-disable valid-jsdoc */
const express = require('express');	// eslint-disable-line no-unused-vars

const AttemptService = require('../services/attempt.service');
const ExerciseService = require('../services/exercise.service');

const AttemptViewModel = require('../viewModels/attempt.viewModel');

/**
 * @typedef {(req: express.Request, res: express.Response, next?: Function) => Promise<express.Response>} Endpoint
 */

/** @type {Endpoint} */
const createAttempt = async (req, res) => {
	const { userId } = res.locals;
	const { exerciseId } = req.params;
	// TODO: validate

	const attempt = await AttemptService.create({
		userId: userId,
		exerciseId: exerciseId,
		state: req.body.state,
	});
	const viewModel = new AttemptViewModel(attempt);

	return res.sendStatus(201).json(viewModel);
};

/** @type {Endpoint} */
const updateAttempt = async (req, res) => {
	const { exerciseId, attemptId } = req.params;
	const { state, output, hasEnded } = req.body;
	// TODO: validate

	const isSuccessful = hasEnded && !!output && await ExerciseService.isOutputCorrect(exerciseId, output);
	const attempt = await AttemptService.update(attemptId, state, hasEnded, isSuccessful);
	const viewModel = new AttemptViewModel(attempt);

	return res.status(200).json(viewModel);
};


module.exports = {
	createAttempt,
	updateAttempt,
};
