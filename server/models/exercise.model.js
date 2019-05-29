const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
	keys: {
		type: [String],
	},
	rows: {
		type: Object,
	},
}, { _id: false });

const exerciseSchema = new mongoose.Schema({
	code: {
		type: String,
		unique: true,
		required: [true, 'Code is required'],
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
	usersAttemptedIds: {
		type: [mongoose.Schema.Types.ObjectId],
	},
	usersCompletedIds: {
		type: [mongoose.Schema.Types.ObjectId],
	},
}, { timestamps: true });

module.exports = mongoose.model('Attempt', exerciseSchema);
