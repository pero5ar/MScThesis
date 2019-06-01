const mongoose = require('mongoose');

const configureDatabase = () => {
	mongoose.connect(process.env.MONGO_STRING,
		{ useNewUrlParser: true },
		(_err) => {
			if (_err) {
				return console.error(_err);
			}
			console.info('Database connection successful!');
		});
};

module.exports = {
	configureDatabase,
};
