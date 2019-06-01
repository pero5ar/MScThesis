const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const DEFAULTS = require('../constants/defaults.constants');
const { EMAIL_REGEX } = require('../constants/regex.constants');

const { USER_TYPE_VALUES } = require('../enums/userType.enum');
const { SCHOOL_TYPE_VALUES } = require('../enums/schoolType.enum');

const GET_PWD_PEPPER = () => process.env.PWD_PEPPER || '';
const GET_TOKEN_PEPPER = () => process.env.TOKEN_PEPPER || '';
const GET_PWD_ROUNDS = () => +process.env.PWD_ROUNDS || 10;
const GET_TOKEN_ROUNDS = () => +process.env.TOKEN_ROUNDS || 5;

const studentDataSchema = new mongoose.Schema({
	classGroup: {
		type: String,
	},
	classGrade: {
		type: Number,
		min: 1,
		max: 8,
	},
	schoolType: {
		type: String,
		enum: SCHOOL_TYPE_VALUES,
	},
	school: {
		type: String,
	},
	teacherIds: {
		type: [mongoose.Schema.Types.ObjectId],
	},
}, { _id: false });

const teacherDataSchema = new mongoose.Schema({
	classGroups: {
		type: [String],
	},
	schools: {
		type: [String],
	},
	studentIds: {
		type: [mongoose.Schema.Types.ObjectId],
	},
}, { _id: false });

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: [true, 'Email is required.'],
		match: [EMAIL_REGEX, 'Email is invalid.'],
		lowercase: true,
		trim: true,
	},
	password: {
		type: String,
		select: false,
		required: [true, 'Password is required.'],
		set: function(value) {
			return bcrypt.hashSync(value + GET_PWD_PEPPER(), GET_PWD_ROUNDS());
		},
	},
	tokenTimestamp: {
		type: Number,
	},
	type: {
		type: String,
		required: [true, 'Type is required.'],
		default: DEFAULTS.DEFAULT_USER_TYPE,
		enum: USER_TYPE_VALUES,
	},
	firstName: {
		type: String,
		required: [true, 'First name is required.'],
	},
	lastName: {
		type: String,
		required: [true, 'Last name is required.'],
	},
	personalData: {
		type: Object,
		default: {},
	},
	studentData: {
		type: [{
			schoolYear: String,	// e.g. '2018/2019'
			start: Date,
			end: Date,
			data: studentDataSchema,
		}],
		default: null,
	},
	teacherData: {
		type: [{
			schoolYear: String,	// e.g. '2018/2019'
			start: Date,
			end: Date,
			data: teacherDataSchema,
		}],
		default: null,
	},
	exercisesAttemptedIds: {
		type: [mongoose.Schema.Types.ObjectId],
	},
	exercisesCompletedIds: {
		type: [mongoose.Schema.Types.ObjectId],
	},
}, { timestamps: true });

userSchema.methods.isPasswordValid = async function (password) {
	const isPasswordValid = bcrypt.compare(password, this.password);
	return isPasswordValid;
};

userSchema.methods.generateToken = async function () {
	this.tokenTimestamp = Date.now();
	const tokenData = this.tokenTimestamp.toString() + this.id; + GET_TOKEN_PEPPER();
	const token = await bcrypt.hash(tokenData, GET_TOKEN_ROUNDS());
	await this.save();	// save after token has been successfully generated
	return token;
};
userSchema.methods.isTokenValid = async function(token) {
	if (!this.tokenTimestamp) {
		return false;
	}
	const tokenData = this.tokenTimestamp.toString() + this.id; + GET_TOKEN_PEPPER();
	const isTokenValid = await bcrypt.compare(tokenData, token);
	return isTokenValid;
};
userSchema.methods.clearToken = async function () {
	this.tokenTimestamp = null;
	await this.save();
};

module.exports = mongoose.model('User', userSchema);
