import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import * as serviceWorker from './serviceWorker';
import { configureStore } from './redux';

import './styles/index.scss';

export const store = configureStore();

const renderApp = () => {
	const RootComponent = (
		<Provider store={store}>
			<App />
		</Provider>
	);
	ReactDOM.render(RootComponent, document.getElementById('root'));
};

if (process.env.NODE_ENV !== 'production' && module.hot) {
	module.hot.accept('./App', renderApp);
}

console.info(process.env.REACT_APP_ENV_TEST);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
