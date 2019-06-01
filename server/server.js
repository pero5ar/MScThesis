#!/usr/bin/env node

const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const expressConfig = require('./config/express.config');
const mongoConfig = require('./config/mongo.config');
const routesConfig = require('./config/routes.config');

const errorMiddleware = require('./middleware/error.middleware');

const app = express();

expressConfig.initialize(app);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

routesConfig.configure(app);

mongoConfig.configureDatabase(app);

// catch 404 and forward to error handler
app.use((req, res, next) => {
	next(createError(404));
});

// error handler
app.use(errorMiddleware);

expressConfig.listen(app);
