const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const DEFAULTS = require('../constants/defaults.constants');
const { EMAIL_REGEX } = require('../constants/regex.constants');

const { USER_TYPE_VALUES } = require('../enums/userType.enum');
const { SCHOOL_TYPE_VALUES } = require('../enums/schoolType.enum');

const PWD_PEPPER = process.env.PWD_PEPPER || '';
const PWD_ROUNDS = +process.env.PWD_ROUNDS || 10;
const TOKEN_ROUNDS = +process.env.TOKEN_ROUNDS || 5;

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
			return bcrypt.hashSync(value + PWD_PEPPER, PWD_ROUNDS);
		},
	},
	token: {
		type: String,
		unique: true,
		sparse: true,
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
}, { timestamps: true });

userSchema.methods.checkPassword = function (password) {
	const isPasswordCorrect = bcrypt.compareSync(password, this.password);
	return isPasswordCorrect;
};
userSchema.methods.generateToken = function () {
	const token = this.password.substring(8, 15) + Date.now();
	this.token = bcrypt.hashSync(token, TOKEN_ROUNDS);
};
userSchema.methods.clearToken = function () {
	this.token = null;
};

module.exports = mongoose.model('User', userSchema);
