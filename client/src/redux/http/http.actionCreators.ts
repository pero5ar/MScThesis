import * as HTTP_ACTIONS from './http.actionTypes';

interface StartRequest {
	type: typeof HTTP_ACTIONS.START_REQUEST;
	method: HttpRequestMethod;
}
export function START_REQUEST(method: HttpRequestMethod): StartRequest {
	return {
		type: HTTP_ACTIONS.START_REQUEST,
		method,
	};
}

interface EndRequest {
	type: typeof HTTP_ACTIONS.END_REQUEST;
	method: HttpRequestMethod;
}
export function END_REQUEST(method: HttpRequestMethod): EndRequest {
	return {
		type: HTTP_ACTIONS.END_REQUEST,
		method,
	};
}

export type HttpAction = StartRequest | EndRequest;
