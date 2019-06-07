declare interface NodeModule {
	hot?: any;	// eslint-disable-line @typescript-eslint/no-explicit-any
}

declare interface Window {
	__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: Function;
}

declare type Nullable<T> = T | null;

declare type HttpRequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
