import * as React from 'react';
import { connect } from 'react-redux';

import { NodeModels, GetNodeModelSettingsType } from 'engine';

import { RootState } from 'state';

interface CheckboxProps {
	label: string;
	value: boolean;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({ label, value, onChange }: CheckboxProps) => (
	<div>
		<span>{label.replace('_', ' ')}</span>
		<input type="checkbox" onChange={onChange} checked={value} />
	</div>
);

type SelectNodeType = InstanceType<typeof NodeModels.SelectNodeModel>;
type SelectNodeSettingsType = GetNodeModelSettingsType<SelectNodeType>;

interface OwnProps {
	node: SelectNodeType;
	removeNode: () => void;
}

interface StateProps {
	message: string | undefined;
	options: string[] | undefined;
	settings: SelectNodeSettingsType;	// used to force updates, use the node prop to read data
}

type Props = OwnProps & StateProps;

class SelectNodeSettings extends React.PureComponent<Props> {

	onCheck = (key: string, event: React.ChangeEvent<HTMLInputElement>) => {
		const { node } = this.props;
		const { selectedKeys } = node.settings;

		let newSettings = null;
		if (!event.target.checked && selectedKeys.includes(key)) {
			newSettings = { selectedKeys: selectedKeys.filter((_key) => _key !== key) };
		}
		if (event.target.checked && !selectedKeys.includes(key)) {
			newSettings = { selectedKeys: [...selectedKeys, key] };
		}

		if (!newSettings) {
			return;
		}
		node.settings = newSettings;
	}

	renderOption = (option: string) => {
		const { node } = this.props;
		const onCheck = this.onCheck.bind(this, option);
		return (
			<Checkbox
				key={option}
				label={option}
				value={node.settings.selectedKeys.includes(option)}
				onChange={onCheck}
			/>
		);
	}

	render() {
		const { message, options, removeNode, node } = this.props;

		return (
			<div className="node-settings">
				<h3>SELECT node settings for {node.id}</h3>
				<br />
				<button onClick={removeNode}>Remove Node</button>
				<br />
				<br />
				{ options ? options.map(this.renderOption) : message }
			</div>
		);
	}
}

function mapStateToProps(state: RootState, ownProps: OwnProps): StateProps {
	const nodeId = ownProps.node.id;
	const previousNodeId = state.diagram.nodes[nodeId].previousNodeId;
	const settings = state.diagram.nodes[nodeId].settings as SelectNodeSettingsType;

	if (!previousNodeId || !state.diagram.dataByNode[previousNodeId]) {
		return {
			message: 'Options are not available for select nodes that are not directly or indirectly connected to start.',
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

export default connect(mapStateToProps)(SelectNodeSettings);
