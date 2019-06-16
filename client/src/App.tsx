import * as React from 'react';
import { connect, ReactReduxActionsToDispatchActions } from 'react-redux';
import { History } from 'history';
import { Route, Switch, Router } from 'react-router-dom';

import * as CLIENT from 'constants/routes/client';

import UserActions from 'state/user';

import withAuth from 'wrappers/withAuth';

import Login from './scenes/Auth/Login';
import Register from './scenes/Auth/Register';
import ExerciseTable from './scenes/Exercise/Table';
import ExercisePlayground from './scenes/Exercise/Playground';
import Home from './scenes/Home';
import Error from './scenes/Error';

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
							path={CLIENT.EXERCISE.TABLE}
							component={withAuth(ExerciseTable)}
						/>
						<Route
							exact={true}
							path={CLIENT.EXERCISE.PLAYGROUND()}
							component={withAuth(ExercisePlayground)}
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
						<Route
							exact={true}
							path={CLIENT.ERROR.ERR400}
							component={Error}
						/>
						<Route
							exact={true}
							path={CLIENT.ERROR.ERR403}
							component={Error}
						/>
						<Route
							exact={true}
							path={CLIENT.ERROR.ERR404}
							component={Error}
						/>
						<Route
							exact={true}
							path={CLIENT.ERROR.ERR500}
							component={Error}
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

export default connect(null, dispatchProps)(App);
