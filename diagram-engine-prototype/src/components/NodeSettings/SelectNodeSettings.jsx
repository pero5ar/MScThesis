import React from 'react';
import { connect } from 'react-redux';

const Checkbox = ({ label, value, onChange }) => (
	<div>
		<span>{label.replace('_', ' ')}</span>
		<input type="checkbox" onChange={onChange} checked={value} />
	</div>
);

class SelectNodeSettings extends React.PureComponent {

	onCheck = (key, event) => {
		const { selectedKeys } = this.props.node.settings;

		let newSettings = null
		if (!event.target.checked && selectedKeys.includes(key)) {
			newSettings = { selectedKeys: selectedKeys.filter((_key) => _key !== key) };
		}
		if (event.target.checked && !selectedKeys.includes(key)) {
			newSettings = { selectedKeys: [...selectedKeys, key] };
		}

		if (!newSettings) {
			return;
		}
		this.props.node.settings = newSettings;
		this.forceUpdate();
	}

	render() {
		const { message, options } = this.props;

		return (
			<div className="node-settings">
				<h3>SELECT node settings for {this.props.node.id}</h3>
				<br />
				<button onClick={this.props.removeNode}>Remove Node</button>
				<br />
				<br />
				{options
					? options.map((_key) => (
						<Checkbox
							key={_key}
							label={_key}
							value={this.props.node.settings.selectedKeys.includes(_key)}
							onChange={this.onCheck.bind(this, _key)}
						/>
					))
					: message
				}
			</div>
		);
	}
}

function mapStateToProps(/**@type {{ diagram: DiagramState }}*/state, ownProps) {
	const previousNodeId = state.diagram.nodes[ownProps.node.id].previousNodeId;
	if (!previousNodeId || !state.diagram.dataByNode[previousNodeId]) {
		return {
			message: 'Options are not available for select nodes that are not directly or indirectly connected to start.',
			options: undefined,
		}
	}
	return {
		message: undefined,
		options: state.diagram.dataByNode[previousNodeId].keys,
	};
}

export default connect(mapStateToProps)(SelectNodeSettings);