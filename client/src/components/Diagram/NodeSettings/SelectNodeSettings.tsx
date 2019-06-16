import * as React from 'react';
import { connect } from 'react-redux';

import { NodeModels } from 'engine';

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

interface OwnProps {
	node: InstanceType<typeof NodeModels.SelectNodeModel>;
	removeNode: () => void;
}

interface StateProps {
	message: string | undefined;
	options: string[] | undefined;
}

type Props = OwnProps & StateProps;

class SelectNodeSettings extends React.PureComponent<Props> {

	onCheck = (key: string, event: React.ChangeEvent<HTMLInputElement>) => {
		const { selectedKeys } = this.props.node.settings;

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
		this.props.node.settings = newSettings;
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
	const previousNodeId = state.diagram.nodes[ownProps.node.id].previousNodeId;
	if (!previousNodeId || !state.diagram.dataByNode[previousNodeId]) {
		return {
			message: 'Options are not available for select nodes that are not directly or indirectly connected to start.',
			options: undefined,
		};
	}
	return {
		message: undefined,
		options: state.diagram.dataByNode[previousNodeId].keys,
	};
}

export default connect(mapStateToProps)(SelectNodeSettings);
