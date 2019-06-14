import * as React from 'react';

import { traverseNodesFromStart } from 'utils/engine.util';

type Props = {};

interface State {
	query: string;
}

export default class TrayItem extends React.PureComponent<Props, State> {
	state: State = {
		query: '',
	};

	buildQuery = () => {
		const nodes = traverseNodesFromStart();
		const query = nodes.reduce((_query, _node, _index) => {
			_query += _node.name;
			if (_index < nodes.length - 1) {
				_query += ' -> ';
			}
			return _query;
		}, '');
		this.setState(() => ({ query }));
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
