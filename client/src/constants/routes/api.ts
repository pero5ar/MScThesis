const API_PATH = '/api/v1.0';

const USERS_PATH = `${API_PATH}/users`;
const EXERCISES_PATH = `${API_PATH}/exercises`;

export const USERS = {
	CREATE: USERS_PATH,
	LOGIN: `${USERS_PATH}/login`,
	LOGOUT: `${USERS_PATH}/logout`,
	REFRESH: `${USERS_PATH}/refresh`,
};

export const EXERCISES = {
	TABLE: `${EXERCISES_PATH}/table`,
	SINGLE: (exerciseId: string) => `${EXERCISES_PATH}/${exerciseId}`,
	ATTEMPTS: {
		CREATE: (exerciseId: string) => `${EXERCISES_PATH}/${exerciseId}/attempts`,
		SINGLE: (exerciseId: string, attemptId: string) => `${EXERCISES_PATH}/${exerciseId}/attempts/${attemptId}`,
	},
};
