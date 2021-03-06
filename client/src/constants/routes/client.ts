export const AUTH = {
	LOGIN: '/login',
	LOGOUT: '/logout',
	REGISTER: '/register',
};

export const EXERCISE = {
	TABLE: '/exercises',
	PLAYGROUND: (exerciseId: string = ':exerciseId') => `/exercises/${exerciseId}/play`,
};

export const HOME = '/';

export const DIAGRAM = '/diagram';

export const ERROR = {
	ERR400: '/400',
	ERR403: '/403',
	ERR404: '/404',
	ERR500: '/500',
};
