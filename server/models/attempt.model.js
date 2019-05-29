const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
	diagramState: {
		type: Object,
	},
	engineState: {
		type: Object,
	},
	timestamp: {
		type: Date,
	},
}, { _id: false });

const attemptSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: [true, 'User Id is required'],
	},
	exerciseId: {
		type: mongoose.Schema.Types.ObjectId,
		required: [true, 'Exercise Id is required'],
	},
	isSuccessful: {
		type: Boolean,
		default: false,
	},
	beginState: {
		type: stateSchema,
		required: [true, 'Begin State is required'],
	},
	endState: {
		type: stateSchema,
		default: null,
	},
	currentState: {
		type: stateSchema,
		required: [true, 'Current State is required'],
	},
	previousAttemptId: {
		type: mongoose.Schema.Types.ObjectId,
	},
	nextAttemptId: {
		type: mongoose.Schema.Types.ObjectId,
		default: null,
	},
}, { timestamps: true });

module.exports = mongoose.model('Attempt', attemptSchema);
