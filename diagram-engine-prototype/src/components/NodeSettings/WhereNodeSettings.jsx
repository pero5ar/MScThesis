import React from 'react';
import { connect } from 'react-redux';

import { WHERE_CONDITION_TYPES } from '../../core/nodeModels/where.nodeModel';

const Select = ({ value, options, onChange }) => (
	<div>
		<select value={value || ''} onChange={onChange}>
			<option key='null' value={null}></option>
			{options.map((_option) => <option key={_option.value || _option} value={_option.value || _option}>{_option.label || _option.value || _option}</option>)}
		</select>
	</div>
);

const CONDITION_TYPE_OPTIONS = Object.values(WHERE_CONDITION_TYPES).map((_conditionType) => ({ value: _conditionType.TYPE, label: _conditionType.LABEL }));

class WhereNodeSettings extends React.PureComponent {

	onKeyChange = (event) => {
		const { settings } = this.props.node;
		this.props.node.settings = { ...settings, key: event.target.value };
		this.forceUpdate();
	}

	onConditionTypeChange = (event) => {
		const { settings } = this.props.node;
		this.props.node.settings = { ...settings, conditionType: event.target.value };
		this.forceUpdate();
	}

	onConditionValueChange = (event) => {
		const { settings } = this.props.node;
		this.props.node.settings = { ...settings, conditionValue: event.target.value };
		this.forceUpdate();
	}

	render() {
		const { message, options } = this.props;

		return (
			<div className="node-settings">
				<h3>WHERE node settings for {this.props.node.id}</h3>
				<br />
				<button onClick={this.props.removeNode}>Remove Node</button>
				<br />
				<br />
				{options
					? (<>
						<Select value={this.props.node.settings.key} options={options} onChange={this.onKeyChange} />
						<Select value={this.props.node.settings.conditionType} options={CONDITION_TYPE_OPTIONS} onChange={this.onConditionTypeChange} />
						<input key={this.props.node.id} value={this.props.node.settings.conditionValue} onChange={this.onConditionValueChange} />
					</>)
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
			message: 'Options are not available for where nodes that are not directly or indirectly connected to start.',
			options: undefined,
		}
	}
	return {
		message: undefined,
		options: state.diagram.dataByNode[previousNodeId].keys,
	};
}

export default connect(mapStateToProps)(WhereNodeSettings);