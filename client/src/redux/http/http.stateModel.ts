export interface HttpState {
	getRequestsInProgress: number;
	postRequestsInProgress: number;
	putRequestsInProgress: number;
	patchRequestsInProgress: number;
	deleteRequestsInProgress: number;
}
