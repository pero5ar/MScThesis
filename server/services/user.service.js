const mongoose = require('mongoose');

const User = require('../models/user.model');
const { USER_TYPE_ENUM } = require('../enums/userType.enum');

/**
 * @param {Object} userObject
 * @param {string} userObject.email
 * @param {string} userObject.password
 * @param {string} userObject.type
 * @param {string} userObject.firstName
 * @param {string} userObject.lastName
 * @returns {Promise<mongoose.Document>}
 */
const create = async (userObject) => {
	const objectToCreate = { ...userObject };
	if (userObject.type === USER_TYPE_ENUM.STUDENT) {
		objectToCreate.studentData = [];
	} else if (userObject.type === USER_TYPE_ENUM.TEACHER) {
		objectToCreate.teacherData = [];
	}

	/** @type {mongoose.Document} */
	const user = new User(objectToCreate);
	return await user.save();
};

const findUserByEmailAndToken = async (email, token) => {
	return await User.findOne({ email, token }).exec();
};
