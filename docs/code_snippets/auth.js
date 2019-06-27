const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const GET_PWD_PEPPER = () => process.env.PWD_PEPPER || '';
const GET_TOKEN_PEPPER = () => process.env.TOKEN_PEPPER || '';
const GET_PWD_ROUNDS = () => +process.env.PWD_ROUNDS || 10;
const GET_TOKEN_ROUNDS = () => +process.env.TOKEN_ROUNDS || 5;

// SHEMA KORISNIK:
const userSchema = new mongoose.Schema({
  /*...*/
  password: {
    type: String,
    required: [true, 'Password is required.'],
    set: function(value) {
      return bcrypt.hashSync(value + GET_PWD_PEPPER(), GET_PWD_ROUNDS());
    },
  },
  tokenTimestamp: Number,
  /*...*/
}, { timestamps: true });

userSchema.methods.isPasswordValid = async function (password) {
  const isPasswordValid = await bcrypt.compare(password + GET_PWD_PEPPER(), this.password);
  return isPasswordValid;
};

userSchema.methods.generateToken = async function () {
  this.tokenTimestamp = Date.now();
  const tokenData = this.tokenTimestamp.toString() + this.id; + GET_TOKEN_PEPPER();
  const token = await bcrypt.hash(tokenData, GET_TOKEN_ROUNDS());
  await this.save();  // save after token has been successfully generated
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

const Errors = require('restify-errors');
const UserService = require('../services/user.service');

const authenticate = async (req, res, next) => {
  const { email, token } = req.headers;
  if (!email || !token) {
    throw new Errors.UnauthorizedError('Missing authentication details');
  }

  const user = await UserService.findByEmailForAuth(email);
  if (!user) {
    throw new Errors.UnauthorizedError('User does not exist');
  }
  const isTokenValid = await user.isTokenValid(token);
  if (!isTokenValid) {
    throw new Errors.UnauthorizedError('Invalid token');
  }

  res.locals.userId = user.id;
  res.locals.userEmail = user.email;
  res.locals.userType = user.type;

  next();
};

module.exports = authenticate;
