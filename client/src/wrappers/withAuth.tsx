import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { AUTH } from 'constants/routes/client';

import { RootState } from 'state';

interface StateProps {
	isAuthenticated: boolean;
}

type AuthenticationProps<P> = P & StateProps;

function mapStateToProps(state: RootState): StateProps {
	return {
		isAuthenticated: state.user.isAuthenticated,
	};
}

export default function <P>(InnerComponent: React.ComponentClass<P>) {
	class Authentication extends React.PureComponent<AuthenticationProps<P>> {
		render() {
			const { isAuthenticated } = this.props;
			return isAuthenticated ? <InnerComponent {...this.props} /> : <Redirect to={AUTH.LOGIN} />;
		}
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const wrappedComponent = connect(mapStateToProps)(Authentication as any);
	return wrappedComponent as unknown as React.ComponentClass<P>;
}
