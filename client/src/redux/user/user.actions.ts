import { Dispatch } from 'redux';

import * as API from '../../constants/routes/api';
import * as CLIENT from '../../constants/routes/client';
import { LOCAL_STORAGE_KEYS } from '../../constants/storage.constants';

import UserType from '../../enums/userType.enum';

import RegisterFormModel from '../../models/formModels/register.formModel';
import * as UserRequestModels from '../../models/requestModels/user.requestModels';
import UserViewModel from '../../models/viewModels/user.viewModel';
import { UserData } from '../../models/localStorage.model';

import * as USER_ACTIONS from './user.actionCreators';

import { actionWithErrorHandler } from '../../utils/action.util';
import http from '../../utils/http.util';
import { redirect } from '../../utils/router.util';

type UserAction = USER_ACTIONS.UserAction;

function _getUserData(): Nullable<UserData> {
	const data = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_DATA);
	if (!data) {
		return null;
	}
	return JSON.parse(data) as UserData;
}

function _saveUserData(user: UserViewModel) {
	if (!user.token) {
		throw new Error('Cannot save user data without token');
	}
	const userData: UserData = {
		email: user.email,
		token: user.token,
	};
	localStorage.setItem(LOCAL_STORAGE_KEYS.USER_DATA, JSON.stringify(userData));
}

function _clearUserData() {
	localStorage.removeItem(LOCAL_STORAGE_KEYS.USER_DATA);
}

export function login(email: string, password: string) {
	return async function (dispatch: Dispatch<UserAction>) {
		const action = async () => {
			const user = await http.post<UserRequestModels.Login, UserViewModel>(API.USERS.LOGIN, { email, password }, { hasAuth: false });
			_saveUserData(user);
			dispatch(USER_ACTIONS.LOGIN(user));
			redirect(CLIENT.HOME);
		};
		return await actionWithErrorHandler(action, dispatch);
	};
}

export function logout() {
	return async function (dispatch: Dispatch<UserAction>) {
		const action = async () => {
			await http.post(API.USERS.LOGOUT, {});
			_clearUserData();
			dispatch(USER_ACTIONS.LOGOUT());
			redirect(CLIENT.AUTH.LOGIN);
		};
		return await actionWithErrorHandler(action, dispatch);
	};
}

export function refresh() {
	return async function (dispatch: Dispatch<UserAction>) {
		const action = async () => {
			const userData = _getUserData();
			if (!userData) {
				return;
			}
			const user = await http.get<UserViewModel>(API.USERS.REFRESH);
			user.token = userData.token;
			dispatch(USER_ACTIONS.LOGIN(user));
		};
		return await actionWithErrorHandler(action, dispatch);
	};
}

export function register(data: RegisterFormModel) {
	return async function (dispatch: Dispatch<UserAction>) {
		const action = async () => {
			const body = {
				...data,
				type: UserType.STUDENT,
			};
			const user = await http.post<UserRequestModels.Register, UserViewModel>(API.USERS.CREATE, body, { hasAuth: false });
			_saveUserData(user);
			dispatch(USER_ACTIONS.LOGIN(user));
			redirect(CLIENT.HOME);
		};
		return await actionWithErrorHandler(action, dispatch);
	};
}
