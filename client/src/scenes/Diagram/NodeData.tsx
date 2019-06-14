import React from 'react';
import { connect } from 'react-redux';

import NodeDataModel from 'models/nodeData.model';

import { RootState } from 'state';

interface OwnProps {
	nodeId: Nullable<string>;
}

interface StateProps {
	data?: NodeDataModel;
}

type Props = OwnProps & StateProps;

class NodeData extends React.PureComponent<Props> {
	render() {
		const { data, nodeId } = this.props;
		if (!data) {
			return <span>Node needs to be connected to start to calculate data</span>;
		}
		return (
			<table>
				<thead>
					<tr>
						{data.keys.map((_key) => <th key={_key}>{_key}</th>)}
					</tr>
				</thead>
				<tbody>
					{data.rows.map((_row, _rowIndex) => (
						<tr key={`${nodeId}_#${_rowIndex}`}>
							{Object.entries(_row).map(([_key, _value]) => <td key={_key}>{_value}</td>)}
						</tr>
					))}
				</tbody>
			</table>
		);
	}
}

function mapStateToProps(state: RootState, ownProps: OwnProps): StateProps {
	const { nodeId } = ownProps;
	if (!nodeId) {
		return { data: undefined };
	}
	return { data: state.diagram.dataByNode[nodeId] };
}

export default connect(mapStateToProps)(NodeData);
