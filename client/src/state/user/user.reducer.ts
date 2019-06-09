import * as USER_ACTIONS from './user.actionTypes';

import { UserAction } from './user.actionCreators';
import { UserState } from './user.stateModel';

const initialState: UserState = {
	user: null,
	isAuthenticated: false,
};

export default function userReducer(state: UserState = initialState, action: UserAction): UserState {
	switch (action.type) {
		case USER_ACTIONS.LOGIN:
			return { ...state, user: action.user, isAuthenticated: true };
		case USER_ACTIONS.LOGOUT:
			return { ...state, user: initialState.user, isAuthenticated: false };
		case USER_ACTIONS.SET_IS_AUTHENTICATED: {
			return { ...state, isAuthenticated: action.isAuthenticated };
		}
		default:
			return state;
	}
}
