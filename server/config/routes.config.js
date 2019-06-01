const express = require('express');
const path = require('path');
const expressConfig = require('./express.config');
const { API_PATH } = require('../constants/value.constants');
const userRouter = require('../routes/api/user.routes');
const exerciseRouter = require('../routes/api/exercise.routes');

const GET_MAX_AGE = process.env.STATIC_MAX_AGE || 31557600000;

const useProductionRoutes = (app) => {
	const distClientPath = path.join(__dirname, '..', '..', 'dist-client');
	app.use('/images', express.static(path.join(distClientPath, 'images'), { maxAge: GET_MAX_AGE()}));
	app.use('/libs', express.static(path.join(distClientPath, 'libs'), { maxAge: GET_MAX_AGE() }));
	app.use('/static', express.static(path.join(distClientPath, 'static'), { maxAge: GET_MAX_AGE() }));
	app.get('*', (req, res) => res.sendFile(path.join(distClientPath, 'index.html')));
};

const useDevelopmentRoutes = (app) => {
	app.get('/:url?', (req, res) =>
		res.redirect(`https://localhost:${expressConfig.getPort()}/${req.params.url || ''}`)
	);
};

const configure = (app) => {
	app.use(`${API_PATH}/users`, userRouter);
	app.use(`${API_PATH}/exercises`, exerciseRouter);
	if (expressConfig.isProduction()) {
		useProductionRoutes(app);
	} else {
		useDevelopmentRoutes(app);
	}
};

module.exports = {
	configure,
};
