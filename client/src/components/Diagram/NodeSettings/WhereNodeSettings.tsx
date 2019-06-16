import React from 'react';
import { connect } from 'react-redux';

import { NodeModels, GetNodeModelSettingsType, WHERE_CONDITIONS } from 'engine';

import { RootState } from 'state';

type SelectOption<T> = T extends string ? string : {
	label?: string;
	value?: string;
};

type SelectOptionElement = string & {
	label?: string;
	value?: string;
};

interface SelectProps<T> {
	options: SelectOption<T>[];
	value: Nullable<string>;
	onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

function Select<T>({ value, options, onChange }: SelectProps<T>) {
	return (
		<div>
			<select value={value || ''} onChange={onChange}>
				<option key='null' value={undefined}></option>
				{(options as SelectOptionElement[]).map((_option) =>
					<option key={_option.value || _option} value={_option.value || _option}>
						{_option.label || _option.value || _option}
					</option>
				)}
			</select>
		</div>
	);
}

const CONDITION_TYPE_OPTIONS = Object.values(WHERE_CONDITIONS).map((_conditionType) => ({ value: _conditionType.TYPE, label: _conditionType.LABEL }));

type WhereNodeType = InstanceType<typeof NodeModels.WhereNodeModel>;
type WhereNodeSettingsType = GetNodeModelSettingsType<WhereNodeType>;

interface OwnProps {
	node: WhereNodeType;
	removeNode: () => void;
}

interface StateProps {
	message: string | undefined;
	options: string[] | undefined;
	settings: WhereNodeSettingsType;	// used to force updates, use the node prop to read data
}

type Props = OwnProps & StateProps;

class WhereNodeSettings extends React.PureComponent<Props> {

	onKeyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const { settings } = this.props.node;
		this.props.node.settings = { ...settings, key: event.target.value };
	}

	onConditionTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const { settings } = this.props.node;
		this.props.node.settings = { ...settings, conditionType: event.target.value as keyof WHERE_CONDITIONS };
	}

	onConditionValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { settings } = this.props.node;
		this.props.node.settings = { ...settings, conditionValue: event.target.value };
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
						<Select<string> value={this.props.node.settings.key} options={options} onChange={this.onKeyChange} />
						<Select value={this.props.node.settings.conditionType} options={CONDITION_TYPE_OPTIONS} onChange={this.onConditionTypeChange} />
						<input key={this.props.node.id} value={this.props.node.settings.conditionValue} onChange={this.onConditionValueChange} />
					</>)
					: message
				}
			</div>
		);
	}
}

function mapStateToProps(state: RootState, ownProps: OwnProps): StateProps {
	const nodeId = ownProps.node.id;
	const previousNodeId = state.diagram.nodes[ownProps.node.id].previousNodeId;
	const settings = state.diagram.nodes[nodeId].settings as WhereNodeSettingsType;

	if (!previousNodeId || !state.diagram.dataByNode[previousNodeId]) {
		return {
			message: 'Options are not available for where nodes that are not directly or indirectly connected to start.',
			options: undefined,
			settings,
		};
	}
	return {
		message: undefined,
		options: state.diagram.dataByNode[previousNodeId].keys,
		settings,
	};
}

export default connect(mapStateToProps)(WhereNodeSettings);
