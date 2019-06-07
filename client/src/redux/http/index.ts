import { Dispatch } from 'redux';

import HttpAction, * as HttpActionCreators from './http.actionCreators';
import HttpState from './http.stateModel';

export type HttpState = HttpState;

export const HttpActionsFactory = (dispatch: Dispatch<HttpAction>) => {
	return {
		start: (method: HttpRequestMethod) => dispatch(HttpActionCreators.START_REQUEST(method)),
		end: (method: HttpRequestMethod) => dispatch(HttpActionCreators.END_REQUEST(method)),
	};
};
