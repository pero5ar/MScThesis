import React from 'react';

import { traverseNodesFromStart } from '../utils/engine.utils.js';

export default class TrayItem extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			query: ''
		};
	}

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