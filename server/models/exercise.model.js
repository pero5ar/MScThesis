const mongoose = require('mongoose');

const { EXERCISE_CODE_REGEX } = require('../constants/regex.constants');

const tableSchema = new mongoose.Schema({
	keys: {
		type: [String],
	},
	rows: {
		type: [Object],
	},
}, { _id: false });

const exerciseSchema = new mongoose.Schema({
	code: {
		type: String,
		unique: true,
		required: [true, 'Code is required'],
		match: [EXERCISE_CODE_REGEX, 'Code is invalid'],
		lowercase: true,
		trim: true,
	},
	title: {
		type: String,
		required: [true, 'Title is required'],
	},
	description: {
		type: String,
		required: [true, 'Description text is required'],
	},
	input: {
		type: tableSchema,
		required: [true, 'Input table is required'],
	},
	output: {
		type: tableSchema,
		required: [true, 'Output table is required'],
	},
	isOutputRowOrderImportant: {
		type: Boolean,
		default: false,
	},
	usersAttemptedIds: {
		type: [mongoose.Schema.Types.ObjectId],
	},
	usersCompletedIds: {
		type: [mongoose.Schema.Types.ObjectId],
	},
}, { timestamps: true });

module.exports = mongoose.model('Exercise', exerciseSchema);
