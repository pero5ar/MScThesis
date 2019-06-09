import * as React from 'react';
import { connect, MapDispatchToPropsParam, ReactReduxActionsToDispatchActions } from 'react-redux';

import UserActions from 'state/user';

interface DispatchProps {
	logout: typeof UserActions.logout;
}

type Props = ReactReduxActionsToDispatchActions<DispatchProps>

class Home extends React.PureComponent<Props> {
	onClick = () => this.props.logout();

	render() {
		return (
			<div>
				<h1>Hello World!</h1>
				<button onClick={this.onClick}>Logout</button>
				<span>{JSON.stringify(this.props)}</span>
			</div>
		);
	}
}

const dispatchProps: DispatchProps = {
	logout: UserActions.logout,
};

export default connect(null, dispatchProps as MapDispatchToPropsParam<DispatchProps, {}>)(Home);
