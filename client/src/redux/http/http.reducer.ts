import * as HTTP_ACTIONS from './http.actionTypes';

import { HttpAction } from './http.actionCreators';
import { HttpState } from './http.stateModel';

const initialState: HttpState = {
	getRequestsInProgress: 0,
	postRequestsInProgress: 0,
	putRequestsInProgress: 0,
	patchRequestsInProgress: 0,
	deleteRequestsInProgress: 0,
};

export default function httpReducer(state: HttpState = initialState, action: HttpAction): HttpState {
	switch (action.type) {
		case HTTP_ACTIONS.START_REQUEST:
			return addToRequestsInProgress(state, action.method, 1);
		case HTTP_ACTIONS.END_REQUEST:
			return addToRequestsInProgress(state, action.method, -1);
		default:
			return state;
	}
}

function addToRequestsInProgress(state: HttpState, method: HttpRequestMethod, value: number): HttpState {
	switch (method) {
		case 'GET':
			return { ...state, getRequestsInProgress: state.getRequestsInProgress + value };
		case 'POST':
			return { ...state, postRequestsInProgress: state.postRequestsInProgress + value };
		case 'PUT':
			return { ...state, putRequestsInProgress: state.putRequestsInProgress + value };
		case 'PATCH':
			return { ...state, patchRequestsInProgress: state.patchRequestsInProgress + value };
		case 'DELETE':
			return { ...state, deleteRequestsInProgress: state.deleteRequestsInProgress + value };
	}
	return state;
};
