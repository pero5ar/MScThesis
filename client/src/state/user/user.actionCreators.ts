import UserViewModel from 'models/viewModels/user.viewModel';

import * as USER_ACTIONS from './user.actionTypes';

interface Login extends ReduxAction {
	type: typeof USER_ACTIONS.LOGIN;
	payload: {
		user: UserViewModel;
	};
}
export function LOGIN(user: UserViewModel): Login {
	return {
		type: USER_ACTIONS.LOGIN,
		payload: { user },
	};
}

interface Logout extends ReduxAction {
	type: typeof USER_ACTIONS.LOGOUT;
}
export function LOGOUT(): Logout {
	return {
		type: USER_ACTIONS.LOGOUT,
	};
};

interface SetIsAuthenticated extends ReduxAction {
	type: typeof USER_ACTIONS.SET_IS_AUTHENTICATED;
	payload: {
		isAuthenticated: boolean;
	};
}
export function SET_IS_AUTHENTICATED(isAuthenticated: boolean): SetIsAuthenticated {
	return {
		type: USER_ACTIONS.SET_IS_AUTHENTICATED,
		payload: { isAuthenticated },
	};
}

export type UserAction = Login | Logout | SetIsAuthenticated;
