const mongoose = require('mongoose');

const configureDatabase = () => {
	mongoose.connect(process.env.MONGO_STRING,
		{ useNewUrlParser: true },
		err => {
			if (err) {
				return console.error(err);
			}
			console.info('Database connection successful!');
		});
};

module.exports = {
	configureDatabase,
};
