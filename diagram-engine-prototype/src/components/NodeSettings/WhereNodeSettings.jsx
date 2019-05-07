import React from 'react';

import { WHERE_CONDITION_TYPES } from '../../core/nodeModels/where.nodeModel';

const Select = ({ value, options, onChange }) => (
	<div>
		<select value={value || ''} onChange={onChange}>
			{options.map((_option) => <option key={_option.value} value={_option.value}>{_option.label}</option>)}
		</select>
	</div>
);


const FOO = ['field_A', 'field_B', 'field_C'];

const CONDITION_TYPE_OPTIONS = Object.values(WHERE_CONDITION_TYPES).map((_conditionType) => ({ value: _conditionType.TYPE, label: _conditionType.LABEL }));

const FOO_OPTIONS = FOO.map((_field) => ({ value: _field, label: _field.replace('_', ' ') }));

export default class WhereNodeSettings extends React.PureComponent {

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
		return (
			<div className="node-settings">
				<h3>WHERE node settings for {this.props.node.id}</h3>
				<br />
				<button onClick={this.props.removeNode}>Remove Node</button>
				<br />
				<br />
				<Select value={this.props.node.settings.key} options={FOO_OPTIONS} onChange={this.onKeyChange} />
				<Select value={this.props.node.settings.conditionType} options={CONDITION_TYPE_OPTIONS} onChange={this.onConditionTypeChange} />
				<input key={this.props.node.id} value={this.props.node.settings.conditionValue} onChange={this.onConditionValueChange} />
			</div>
		);
	}
}