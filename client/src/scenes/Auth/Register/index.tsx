import * as React from 'react';
import { connect, MapDispatchToPropsParam, ReactReduxActionsToDispatchActions } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as CLIENT from 'constants/routes/client';

import RegisterFormModel from 'models/formModels/register.formModel';

import { RootState } from 'state';
import UserActions from 'state/user';

interface StateProps {
	isAuthenticated: boolean;
}

interface DispatchProps {
	register: typeof UserActions.register;
}

type Props = StateProps & ReactReduxActionsToDispatchActions<DispatchProps>;

type State = RegisterFormModel;

class Register extends React.PureComponent<Props, State> {
	state: State = {
		email: '',
		password: '',
		repeatPassword: '',
		firstName: '',
		lastName: '',
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
		const { register } = this.props;
		register(this.state);
	}

	render() {
		const { isAuthenticated } = this.props;

		if (isAuthenticated) {
			return <Redirect to={CLIENT.HOME} />;
		}

		const { email, password, repeatPassword, firstName, lastName } = this.state;

		return (
			<form onSubmit={this.onSubmit}>
				<span>Email: </span>
				<input type="text" name="email" value={email} onChange={this.onChange}></input>
				<span>Password: </span>
				<input type="password" name="password" value={password} onChange={this.onChange}></input>
				<span>Repeat Password: </span>
				<input type="password" name="repeatPassword" value={repeatPassword} onChange={this.onChange}></input>
				<span>First Name: </span>
				<input type="text" name="firstName" value={firstName} onChange={this.onChange}></input>
				<span>Last Name: </span>
				<input type="text" name="lastName" value={lastName} onChange={this.onChange}></input>
				<hr />
				<input type="submit" value="Register" />
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
	register: UserActions.register,
};

export default connect(mapStateToProps, dispatchProps as MapDispatchToPropsParam<DispatchProps, {}>)(Register);

