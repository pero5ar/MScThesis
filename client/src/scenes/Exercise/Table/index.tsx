import * as React from 'react';
import { connect, ReactReduxActionsToDispatchActions } from 'react-redux';
import Table from 'react-bootstrap/Table';

import * as CLIENT from 'constants/routes/client';

import ExerciseTableViewModel, { ExerciseTableRowViewModel } from 'models/viewModels/exerciseTable.viewModel';

import { RootState } from 'state';
import ExerciseActions from 'state/exercise';

import { redirect } from 'utils/router.util';

type OwnProps = {};

interface StateProps {
	table: ExerciseTableViewModel;
}

interface DispatchProps {
	getTable: typeof ExerciseActions.getExerciseTable;
}

type Props = OwnProps & StateProps & ReactReduxActionsToDispatchActions<DispatchProps>

class ExerciseTable extends React.PureComponent<Props> {
	componentDidMount() {
		const { getTable } = this.props;
		getTable();
	}

	onRowClick = async (exerciseId: string) => redirect(CLIENT.EXERCISE.PLAYGROUND(exerciseId));

	renderRow = (row: ExerciseTableRowViewModel) => {
		const onClick = this.onRowClick.bind(this, row.id);

		return (
			<tr key={row.code} onClick={onClick}>
				<td>{row.code}</td>
				<td>{row.title}</td>
				<td>{row.isAttempted ? 'yes' : 'no'}</td>
				<td>{row.isSolved ? 'yes' : 'no'}</td>
				<td>{row.numberOfUsersCompleted} / {row.numberOfUsersAttempted}</td>
			</tr>
		);
	}

	render() {
		const { table } = this.props;

		return (
			<Table>
				<thead>
					<tr>
						<th>Code</th>
						<th>Title</th>
						<th>Attempted</th>
						<th>Solved</th>
						<th>Users Competed / Users Attempted</th>
					</tr>
				</thead>
				<tbody>
					{table.rows.map(this.renderRow)}
				</tbody>
			</Table>
		);
	}
}

function mapStateToProps(state: RootState): StateProps {
	return {
		table: state.exercise.table,
	};
}

const dispatchProps: DispatchProps = {
	getTable: ExerciseActions.getExerciseTable,
};

export default connect(mapStateToProps, dispatchProps)(ExerciseTable);
