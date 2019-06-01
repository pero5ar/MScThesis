const Errors = require('restify-errors');
const mongoose = require('mongoose');	// eslint-disable-line no-unused-vars

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

/**
 * @param {string} userId
 * @returns {Promise<mongoose.Document>}
 */
const findById = async (userId) => {
	const user = await User.findById(userId).exec();
	if (!user) {
		throw new Errors.NotFoundError('User does not exist');
	}
	return user;
};

/**
 * @param {string} email
 * @returns {Promise<mongoose.Document>}
 */
const findByEmail = async (email) => {
	const user = await User.findOne({ email }).exec();
	if (!user) {
		throw new Errors.NotFoundError('User does not exist');
	}
	return user;
};

/**
 * NOTE: Only exposes id, email and type.
 *
 * @param {string} email
 * @param {string} token
 * @returns {Promise<mongoose.Document>}
 */
const findByEmailForAuth = async (email) => {
	return await User.findOne({ email }, { id: 1, email: 1, type: 1 }).exec();
};

module.exports = {
	create,
	findById,
	findByEmail,
	findByEmailForAuth,
};
