/* eslint-disable @typescript-eslint/no-explicit-any */

declare interface NodeModule {
	hot?: any;
}

declare interface Window {
	__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: Function;
}

declare type Nullable<T> = T | null;

declare type HttpRequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

declare interface ReduxAction {
	type: string;
	payload?: any;
}
