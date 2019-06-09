import * as React from 'react';
import { connect, MapDispatchToPropsParam, ReactReduxActionsToDispatchActions } from 'react-redux';
import { History } from 'history';
import { Route, Switch, Router } from 'react-router-dom';

import * as CLIENT from 'constants/routes/client';

import UserActions from 'state/user';

import withAuth from 'wrappers/withAuth';

import Login from './scenes/Auth/Login';
import Register from './scenes/Auth/Register';
import Home from './scenes/Home';

interface OwnProps {
	history: History;
}

interface DispatchProps {
	refreshUser: typeof UserActions.refresh;
}

type Props = OwnProps & ReactReduxActionsToDispatchActions<DispatchProps>;

class App extends React.PureComponent<Props> {
	async componentDidMount() {
		const { refreshUser } = this.props;
		refreshUser();
	}

	render() {
		const { history } = this.props;

		return (
			<div className="App">
				<Router history={history}>
					<Switch>
						<Route
							exact={true}
							path={CLIENT.HOME}
							component={withAuth(Home)}
						/>
						<Route
							exact={true}
							path={CLIENT.AUTH.LOGIN}
							component={Login}
						/>
						<Route
							exact={true}
							path={CLIENT.AUTH.REGISTER}
							component={Register}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}

const dispatchProps: DispatchProps = {
	refreshUser: UserActions.refresh,
};

export default connect(null, dispatchProps as MapDispatchToPropsParam<DispatchProps, {}>)(App);
