import * as React from 'react';
import { connect, MapDispatchToPropsParam, ReactReduxActionsToDispatchActions } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import * as CLIENT from 'constants/routes/client';

import { RootState } from 'state';
import UserActions from 'state/user';

import { redirect } from 'utils/router.util';

interface StateProps {
	isAuthenticated: boolean;
}

interface DispatchProps {
	login: typeof UserActions.login;
}

type Props = RouteComponentProps & StateProps & ReactReduxActionsToDispatchActions<DispatchProps>;

interface State {
	email: string;
	password: string;
}

class Login extends React.PureComponent<Props, State> {
	state: State = {
		email: '',
		password: '',
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onChange = (event: any) => {
		const { name, value } = event.target as { name: keyof State; value: string; };
		const updatedState = { [name]: value } as Pick<State, keyof State>;
		this.setState(() => updatedState);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onSubmit = (e: any) => {
		e.preventDefault();
		const { email, password } = this.state;
		const { login } = this.props;
		login(email, password);
	}

	componentDidUpdate() {
		const { isAuthenticated } = this.props;

		if (isAuthenticated) {
			const { location: { state: { origin } = { origin: undefined } } } = this.props;
			if (!origin) {
				redirect(CLIENT.HOME);
			} else {
				redirect(origin, true);
			}
		}
	}

	render() {
		const { isAuthenticated } = this.props;

		if (isAuthenticated) {
			return null;	// redirect handled in componentDidUpdate
		}
		const { email, password } = this.state;

		return (
			<form onSubmit={this.onSubmit}>
				<span>Email: </span>
				<input type="text" name="email" value={email} onChange={this.onChange}></input>
				<span>Password: </span>
				<input type="password" name="password" value={password} onChange={this.onChange}></input>
				<hr />
				<input type="submit" value="Login" />
			</form>
		);
	}
}

function mapStateToProps(state: RootState): StateProps {
	return {
		isAuthenticated: state.user.isAuthenticated,
	};
};

const dispatchProps: DispatchProps = {
	login: UserActions.login,
};

export default connect(mapStateToProps, dispatchProps as MapDispatchToPropsParam<DispatchProps, {}>)(Login);

