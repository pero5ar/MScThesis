const Errors = require('restify-errors');
const mongoose = require('mongoose');

const Attempt = require('../models/attempt.model');
const Exercise = require('../models/exercise.model');
const User = require('../models/user.model');

/**
 * @typedef {{ diagramState: object; serializedGraph: string; timestamp: Date; }} State
 */

/**
 * @param {Object} attemptObject
 * @param {string} attemptObject.userId
 * @param {string} attemptObject.exerciseId
 * @param {State} attemptObject.state
 * @returns {Promise<mongoose.Document>}
 */
const create = async (attemptObject) => {
	const { userId, exerciseId, state } = attemptObject;

	/** @type {mongoose.Document[]} */
	const [user, exercise] = await Promise.all([
		User.findById(userId, { exercisesAttemptedIds: 1 }).exec(),
		Exercise.findById(exerciseId, { usersAttemptedIds: 1 }).exec(),
	]);
	if (!user || !exercise) {
		throw new Errors.BadRequestError('User or exercise does not exist');
	}

	const objectToCreate = {
		userId,
		exerciseId,
		beginState: { ...state },
		currentState: { ...state },
		states: [{ ...state }],
	};
	const previousAttempt = await findLastForUserAndExercise(userId, exerciseId);
	if (previousAttempt) {
		objectToCreate.previousAttemptId = previousAttempt.id;
	}
	/** @type {mongoose.Document} */
	const attempt = new Attempt(objectToCreate);
	await attempt.save();

	if (!previousAttempt) {
		user.exercisesAttemptedIds.push(exerciseId);
		exercise.usersAttemptedIds.push(userId);
		await Promise.all([
			user.save(),
			exercise.save(),
		]);
	}
	return attempt;
};

/**
 * @param {string} userId
 * @param {string} exerciseId
 * @returns {Promise<mongoose.Document>}
 */
const findAllForUserAndExercise = async (userId, exerciseId) => {
	return await Attempt.find({ userId, exerciseId }).exec();
};

/**
 * @param {string} userId
 * @param {string} exerciseId
 * @returns {Promise<mongoose.Document>}
 */
const findLastForUserAndExercise = async (userId, exerciseId) => {
	return await Attempt.findOne({ userId, exerciseId, nextAttemptId: null }).exec();
};

/**
 * @param {string} attemptId
 * @param {State} state
 * @param {boolean} isFinished
 * @param {boolean} isSuccessful
 * @returns {Promise<mongoose.Document>}
 */
const update = async (attemptId, state, hasEnded, isSuccessful) => {
	const attempt = await Attempt.findById(attemptId).exec();

	if (!attempt) {
		throw new Errors.NotFoundError();
	}
	if (attempt.endState) {
		throw new Errors.BadRequestError('Cannot update an attempt that has ended');
	}
	attempt.currentState = { ...state };
	attempt.states.push({ ...state });

	if (!hasEnded) {
		return await attempt.save();
	}
	attempt.endState = { ...state };

	if (!isSuccessful) {
		return await attempt.save();
	}
	attempt.isSuccessful = true;
	await attempt.save();	// save before updated linked ones in case something breaks

	await Promise.all([
		User.updateOne(
			{ id: attempt.userId },
			{ $addToSet: { exercisesCompletedIds: attempt.exerciseId } }
		).exec(),
		Exercise.updateOne(
			{ id: attempt.exerciseId },
			{ $addToSet: { usersCompletedIds: attempt.userId } }
		).exec(),
	]);
	return attempt;
};

module.exports = {
	create,
	findAllForUserAndExercise,
	findLastForUserAndExercise,
	update,
};
