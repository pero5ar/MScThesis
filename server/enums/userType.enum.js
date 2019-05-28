const USER_TYPE_ENUM = Object.freeze({
	STUDENT: 'STUDENT',
	TEACHER: 'TEACHER',
	ADMINISTRATOR: 'ADMINISTRATOR',
});

const USER_TYPE_VALUES = Object.freeze(Object.values(USER_TYPE_ENUM));

module.exports = {
	USER_TYPE_ENUM,
	USER_TYPE_VALUES,
};
