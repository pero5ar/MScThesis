const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const DEFAULTS = require('../constants/defaults.constants');
const { EMAIL_REGEX } = require('../constants/regex.constants');

const { USER_TYPE_ENUM, USER_TYPE_VALUES } = require('../enums/userType.enum');
const { SCHOOL_TYPE_ENUM, SCHOOL_TYPE_VALUES } = require('../enums/schoolType.enum');

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
});

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
		set: function(value) {
			return bcrypt.hashSync(value, 10);
		},
	},
	token: {
		type: String,
		unique: true,
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
	gender: {
		type: String,
	},
	studentData: studentDataSchema,
}, { timestamps: true });

userSchema.methods.checkPassword = function (password) {
	const isPasswordCorrect = bcrypt.compareSync(password, this.password);
	return isPasswordCorrect;
};

userSchema.methods.generateToken = function generateToken() {
	const token = this.email + Date.now();
	this.token = bcrypt.hashSync(token, 5);
};

module.exports = mongoose.model('User', userSchema);
