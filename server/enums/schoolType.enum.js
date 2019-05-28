const SCHOOL_TYPE_ENUM = Object.freeze({
	PRIMARY: 'PRIMARY',
	SECONDARY: 'SECONDARY',
	HIGHER: 'HIGHER',
});

const SCHOOL_TYPE_VALUES = Object.freeze(Object.values(SCHOOL_TYPE_ENUM));

module.exports = {
	SCHOOL_TYPE_ENUM,
	SCHOOL_TYPE_VALUES,
};
