import { createStore, combineReducers } from 'redux';

import diagramReducer from './reducers/diagram.reducer';

const rootReducer = combineReducers({
	diagram: diagramReducer,
});

export function configureStore() {

	// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

	const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

	return store;
}
