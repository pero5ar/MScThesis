import * as HTTP_ACTIONS from './http.actionTypes';

interface StartRequest extends ReduxAction {
	type: typeof HTTP_ACTIONS.START_REQUEST;
	payload: {
		method: HttpRequestMethod;
	};
}
export function START_REQUEST(method: HttpRequestMethod): StartRequest {
	return {
		type: HTTP_ACTIONS.START_REQUEST,
		payload: { method },
	};
}

interface EndRequest extends ReduxAction {
	type: typeof HTTP_ACTIONS.END_REQUEST;
	payload: {
		method: HttpRequestMethod;
	};
}
export function END_REQUEST(method: HttpRequestMethod): EndRequest {
	return {
		type: HTTP_ACTIONS.END_REQUEST,
		payload: { method },
	};
}

export type HttpAction = StartRequest | EndRequest;
