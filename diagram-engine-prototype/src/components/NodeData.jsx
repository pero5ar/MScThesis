import React from 'react';
import { connect } from 'react-redux';

class NodeData extends React.PureComponent {
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

function mapStateToProps(state, ownProps) {
	return {
		data: state.diagram.dataByNode[ownProps.nodeId],
	};
}

export default connect(mapStateToProps)(NodeData);