import * as React from 'react';

type Props = {};

interface State {
	query: string;
}

export default class TrayItem extends React.PureComponent<Props, State> {
	state: State = {
		query: '',
	};

	buildQuery = () => {
		this.setState(() => ({ query: 'Not implemented!' }));
	}

	render() {
		return (
			<div>
				<button onClick={this.buildQuery}>Build Query</button>
				{this.state.query}
			</div>
		);
	}
}
