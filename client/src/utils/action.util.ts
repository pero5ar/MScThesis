import { Dispatch } from 'redux';
import { AxiosError } from 'axios';

import { ERROR, AUTH } from '../constants/routes/client';

import { SET_IS_AUTHENTICATED } from '../redux/user/user.actionCreators';

import { redirect } from './router.util';

type AxiosErrorHandler<T> = (error: AxiosError, dispatch: Dispatch) => void | Promise<void> | Promise<T>;
type NonAxiosErrorHandler<T> = (error: Error, dispatch: Dispatch) => void | Promise<void> | Promise<T>;
type ErrorHandler<T> = AxiosErrorHandler<T> | NonAxiosErrorHandler<T>

interface ErrorHandlerDict<T = void> {
	noResponse?: AxiosErrorHandler<T>;
	err400?: AxiosErrorHandler<T>;
	err401?: AxiosErrorHandler<T>;
	err403?: AxiosErrorHandler<T>;
	err404?: AxiosErrorHandler<T>;
	err500?: AxiosErrorHandler<T>;
	default?: AxiosErrorHandler<T>;
	notHttp?: NonAxiosErrorHandler<T>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function _isAxiosError(error: any): error is AxiosError {
	return error.isAxiosError;
};

const _defaultErrorHandlerDict: Required<ErrorHandlerDict> = {
	noResponse: console.error,
	err400: () => redirect(ERROR.ERR400),
	err401: (_error, _dispatch) => {
		_dispatch(SET_IS_AUTHENTICATED(false));
		redirect(AUTH.LOGIN);
	},
	err403: () => redirect(ERROR.ERR403),
	err404: () => redirect(ERROR.ERR404),
	err500: () => redirect(ERROR.ERR500),
	default: console.error,
	notHttp: (_error) => {
		throw _error;
	},
};

export async function actionWithErrorHandler<T>(
	action: () => Promise<T>,
	dispatch: Dispatch,
	errorHandlerDict: ErrorHandlerDict<T | void> = {}
): Promise<T | void> {
	try {
		return await action();
	} catch (error) {
		let _handler: ErrorHandler<T | void> = errorHandlerDict.notHttp || _defaultErrorHandlerDict.notHttp;
		if (_isAxiosError(error) && !error.response) {
			_handler = errorHandlerDict.noResponse || _defaultErrorHandlerDict.noResponse;
		}
		if (_isAxiosError(error) && !!error.response) {
			switch (error.response.status) {
				case 400:
					_handler = errorHandlerDict.noResponse || _defaultErrorHandlerDict.noResponse;
					break;
				case 401:
					_handler = errorHandlerDict.noResponse || _defaultErrorHandlerDict.noResponse;
					break;
				case 403:
					_handler = errorHandlerDict.noResponse || _defaultErrorHandlerDict.noResponse;
					break;
				case 404:
					_handler = errorHandlerDict.noResponse || _defaultErrorHandlerDict.noResponse;
					break;
				case 500:
					_handler = errorHandlerDict.noResponse || _defaultErrorHandlerDict.noResponse;
					break;
				default:
					_handler = errorHandlerDict.noResponse || _defaultErrorHandlerDict.noResponse;
					break;
			}
		}
		return await _handler(error, dispatch);
	}
}
