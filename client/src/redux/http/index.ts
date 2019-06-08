import { Dispatch } from 'redux';

import * as HTTP_ACTIONS from './http.actionCreators';
import { HttpState } from './http.stateModel';

export type HttpState = HttpState;

type HttpAction = HTTP_ACTIONS.HttpAction;

export const HttpActionsFactory = (dispatch: Dispatch<HttpAction>) => {
	return {
		start: (method: HttpRequestMethod) => dispatch(HTTP_ACTIONS.START_REQUEST(method)),
		end: (method: HttpRequestMethod) => dispatch(HTTP_ACTIONS.END_REQUEST(method)),
	};
};
