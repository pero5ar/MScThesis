import { combineReducers, createStore, applyMiddleware, Store, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import DiagramState from './diagram/diagram.stateModel';
import HttpState from './http/http.stateModel';

import diagram from './diagram/diagram.reducer';
import http from './http/http.reducer';

export interface RootState {
	diagram: DiagramState;
	http: HttpState;
}

const rootReducer = combineReducers<RootState>({
	diagram,
	http,
});

export function configureStore(): Store<RootState> {
	const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

	const store = createStore(
		rootReducer,
		composeEnhancers(
			applyMiddleware(reduxThunk)
		)
	);

	if (process.env.NODE_ENV !== 'production' && module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept('.', () => {
			store.replaceReducer(rootReducer);
		});
	}

	return store;
}
