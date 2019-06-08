import UserViewModel from '../../models/viewModels/user.viewModel';

import * as USER_ACTIONS from './user.actionTypes';

interface Login {
	type: typeof USER_ACTIONS.LOGIN;
	user: UserViewModel;
}
export function LOGIN(user: UserViewModel): Login {
	return {
		type: USER_ACTIONS.LOGIN,
		user,
	};
}

interface Logout {
	type: typeof USER_ACTIONS.LOGOUT;
}
export function LOGOUT(): Logout {
	return {
		type: USER_ACTIONS.LOGOUT,
	};
};

interface SetIsAuthenticated {
	type: typeof USER_ACTIONS.SET_IS_AUTHENTICATED;
	isAuthenticated: boolean;
}
export function SET_IS_AUTHENTICATED(isAuthenticated: boolean) {
	return {
		type: USER_ACTIONS.SET_IS_AUTHENTICATED,
		isAuthenticated,
	};
}

export type UserAction = Login | Logout | SetIsAuthenticated;
