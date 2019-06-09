import axios, { AxiosRequestConfig } from 'axios';

import { store } from 'index';

import { LOCAL_STORAGE_KEYS } from 'constants/storage.constants';

import { UserData } from 'models/localStorage.model';

import { HttpActionsFactory } from 'state/http';

interface HttpHeaders {
	email?: string;
	token?: string;
}

interface HttpConfig extends AxiosRequestConfig {
	hasAuth?: boolean;
}

function _getAuthHeaders(): HttpHeaders {
	const localStorageUserData = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_DATA);
	if (!localStorageUserData) {
		return {};
	}
	const userData: UserData = JSON.parse(localStorageUserData);
	return {
		email: userData.email,
		token: userData.token,
	};
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function _get<TOut = any>(url: string, { hasAuth = true, ...options }: HttpConfig = {}): Promise<TOut> {
	const HttpActions = HttpActionsFactory(store.dispatch);
	try {
		HttpActions.start('GET');

		const config: AxiosRequestConfig = { ...options };
		if (hasAuth) {
			config.headers = { ...config.headers, ..._getAuthHeaders() };
		}
		const response = await axios.get<TOut>(url, config);

		HttpActions.end('GET');
		return response.data;
	} catch (error) {
		HttpActions.end('GET');
		throw error;
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function _post<TIn extends object, TOut = void>(url: string, data: TIn, { hasAuth = true, ...options }: HttpConfig = {}): Promise<TOut> {
	const HttpActions = HttpActionsFactory(store.dispatch);
	try {
		HttpActions.start('POST');

		const config: AxiosRequestConfig = { ...options };
		if (hasAuth) {
			config.headers = { ...config.headers, ..._getAuthHeaders() };
		}
		const response = await axios.post<TOut>(url, data, config);

		HttpActions.end('POST');
		return response.data;
	} catch (error) {
		HttpActions.end('POST');
		throw error;
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function _put<TIn extends object, TOut = void>(url: string, data: TIn, { hasAuth = true, ...options }: HttpConfig = {}): Promise<TOut> {
	const HttpActions = HttpActionsFactory(store.dispatch);
	try {
		HttpActions.start('PUT');

		const config: AxiosRequestConfig = { ...options };
		if (hasAuth) {
			config.headers = { ...config.headers, ..._getAuthHeaders() };
		}
		const response = await axios.put<TOut>(url, data, config);

		HttpActions.end('PUT');
		return response.data;
	} catch (error) {
		HttpActions.end('PUT');
		throw error;
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function _patch<TIn extends object, TOut = void>(url: string, data: TIn, { hasAuth = true, ...options }: HttpConfig = {}): Promise<TOut> {
	const HttpActions = HttpActionsFactory(store.dispatch);
	try {
		HttpActions.start('PATCH');

		const config: AxiosRequestConfig = { ...options };
		if (hasAuth) {
			config.headers = { ...config.headers, ..._getAuthHeaders() };
		}
		const response = await axios.patch<TOut>(url, data, config);

		HttpActions.end('PATCH');
		return response.data;
	} catch (error) {
		HttpActions.end('PATCH');
		throw error;
	}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function _delete<TIn extends object, TOut = void>(url: string, data?: TIn, { hasAuth = true, ...options }: HttpConfig = {}): Promise<TOut> {
	const HttpActions = HttpActionsFactory(store.dispatch);
	try {
		HttpActions.start('DELETE');

		const config: AxiosRequestConfig = { ...options };
		if (hasAuth) {
			config.headers = { ...config.headers, ..._getAuthHeaders() };
		}
		if (data) {
			config.data = { ...config.data, ...data };
		}
		const response = await axios.delete<TOut>(url, config);

		HttpActions.end('DELETE');
		return response.data;
	} catch (error) {
		HttpActions.end('DELETE');
		throw error;
	}
}

export default {
	get: _get,
	post: _post,
	put: _put,
	patch: _patch,
	delete: _delete,
};
