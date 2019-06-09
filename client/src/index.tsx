import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';

import App from './App';
import * as serviceWorker from './serviceWorker';
import { configureStore } from 'state';

import './styles/index.scss';

export const store = configureStore();
export const history = createBrowserHistory();

const renderApp = () => {
	const RootComponent = (
		<Provider store={store}>
			<App history={history} />
		</Provider>
	);
	ReactDOM.render(RootComponent, document.getElementById('root'));
};

if (process.env.NODE_ENV !== 'production' && module.hot) {
	module.hot.accept('./App', renderApp);
}
renderApp();

console.info(process.env.REACT_APP_ENV_TEST);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
