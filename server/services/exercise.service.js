const Errors = require('restify-errors');
const mongoose = require('mongoose');

const Exercise = require('../models/exercise.model');

/**
 * @param {object} valueTable
 * @param {string[]} valueTable.keys
 * @param {object[]} valueTable.rows
 * @param {object} expectedTable
 * @param {string[]} expectedTable.keys
 * @param {object[]} expectedTable.rows
 * @param {boolean} [isRowOrderExpected]
 * @returns {boolean}
 */
const _areTablesEqual = (valueTable, expectedTable, isRowOrderExpected = false) => {
	if (valueTable.keys.length !== expectedTable.keys.length) {
		return false;
	}
	if (valueTable.rows.length !== expectedTable.rows.length) {
		return false;
	}
	if (expectedTable.keys.some((_key) => !valueTable.keys.includes(_key))) {
		return false;
	}

	const _sortAndStringifyRow = (_row) => JSON.stringify(_row, expectedTable.keys);
	const expectedTableRowStrings = expectedTable.rows.map(_sortAndStringifyRow);
	const valueTableRowStrings = valueTable.rows.map(_sortAndStringifyRow);

	if (isRowOrderExpected) {
		if (expectedTableRowStrings.some((_rowString, _index) => _rowString !== valueTableRowStrings[_index])) {
			return false;
		}
	}
	if (!isRowOrderExpected) {
		if (expectedTableRowStrings.some((_rowString) => !valueTableRowStrings.includes(_rowString))) {
			return false;
		}
	}
	return true;
};

/**
 * @param {Object} exerciseObject
 * @param {string} exerciseObject.code
 * @param {string} exerciseObject.title
 * @param {string} exerciseObject.description
 * @param {string[]} exerciseObject.input.keys
 * @param {object[]} exerciseObject.input.rows
 * @param {string[]} exerciseObject.output.keys
 * @param {object[]} exerciseObject.output.rows
 * @param {boolean} exerciseObject.isOutputRowOrderImportant
 * @returns {Promise<mongoose.Document>}
 */
const create = async (exerciseObject) => {
	const exercise = new Exercise(exerciseObject);
	return await exercise.save();
};

/**
 * @param {string} exerciseId
 * @param {object[]} output
 * @param {string[]} output.keys
 * @param {object[]} output.rows
 * @returns {Promise<boolean>}
 */
const isOutputCorrect = async (exerciseId, output) => {
	const exercise = await Exercise.findById(exerciseId, { output: 1 }).exec();
	if (!exercise) {
		throw new Errors.BadRequestError('Exercise does not exist');
	}
	return _areTablesEqual(output, exercise.output);
};

module.exports = {
	create,
	isOutputCorrect,
};
