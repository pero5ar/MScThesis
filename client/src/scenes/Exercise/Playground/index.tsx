import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect, ReactReduxActionsToDispatchActions } from 'react-redux';
import Button from 'react-bootstrap/Button';

import NodeData from 'models/nodeData.model';

import { AttemptState } from 'models/requestModels/attempt.requestModels';

import { AttemptStateViewModel } from 'models/viewModels/attempt.viewModel';
import ExerciseViewModel from 'models/viewModels/exercise.viewModel';

import { RootState } from 'state';
import { DiagramState } from 'state/diagram';
import ExerciseActions from 'state/exercise';

import { selectors } from 'utils/state.util';

import Diagram from 'components/Diagram';

interface PathParams {
	exerciseId: string;
}

type OwnProps = RouteComponentProps<PathParams>;

interface StateProps {
	activeExercise: ExerciseViewModel | undefined;
	activeAttemptId: string | undefined;
}

interface DispatchProps {
	setActiveExercise: typeof ExerciseActions.setActiveExercise;
	createAttempt: typeof ExerciseActions.createAttempt;
	updateAttempt: typeof ExerciseActions.updateAttempt;
}

type Props = OwnProps & StateProps & ReactReduxActionsToDispatchActions<DispatchProps>

interface State {
	hasStarted: boolean;
	attemptState: Nullable<AttemptStateViewModel>;
}

const initialState: State = {
	hasStarted: false,
	attemptState: null,
};

class ExercisePlayground extends React.PureComponent<Props, State> {
	state: State = initialState;

	static getDerivedStateFromProps(props: Readonly<Props>, state: State): Partial<State> | null {
		const startPrerequisitesNotMet = !props.activeExercise || !props.activeAttemptId;
		if (startPrerequisitesNotMet && state.hasStarted) {
			return initialState;
		}
		return null;
	}

	async componentDidMount() {
		const { setActiveExercise, match: { params: { exerciseId } } } = this.props;
		await setActiveExercise(exerciseId);
	}

	start = async () => {
		const { activeAttemptId, createAttempt, match: { params: { exerciseId } } } = this.props;
		const activeAttempt = selectors.getActiveAttempt();

		if (activeAttempt && activeAttempt.id !== activeAttemptId) {
			console.error('Mismatch between state and component prop for active attempt. Cancelling action');
			return;
		}

		if (!activeAttempt) {
			const emptyState: AttemptState = { diagramState: null, serializedGraph: '' };
			await createAttempt(exerciseId, emptyState);
			this.setState(() => ({ hasStarted: true, attemptState: null }));
		} else {
			this.setState(() => ({ hasStarted: true, attemptState: activeAttempt.currentState }));
		}
	}

	updateAttempt = async (diagramState: DiagramState, serializedGraph: string, output?: NodeData, hasEnded?: boolean) => {
		const { updateAttempt, activeAttemptId, match: { params: { exerciseId } } } = this.props;
		if (!activeAttemptId) {
			this.setState(() => ({ ...initialState }));
			return;
		}
		const state: AttemptState = { diagramState, serializedGraph };
		await updateAttempt(exerciseId, activeAttemptId, state, output, hasEnded);
	}

	saveAttempt = async (diagramState: DiagramState, serializedGraph: string, output?: NodeData) => {
		await this.updateAttempt(diagramState, serializedGraph, output, false);
	}

	onEnd = async (diagramState: DiagramState, serializedGraph: string, output: NodeData) => {
		await this.updateAttempt(diagramState, serializedGraph, output, true);
		this.setState(() => ({ ...initialState }));
	}

	render() {
		const { activeExercise } = this.props;
		const { hasStarted, attemptState } = this.state;

		if (!activeExercise || !hasStarted) {
			return <Button onClick={this.start}>Start Attempt</Button>;
		}
		return (
			<Diagram
				input={activeExercise.input}
				initialState={attemptState}
				saveState={this.saveAttempt}
				onEnd={this.onEnd}
			/>
		);
	}
}

function mapStateToProps(state: RootState): StateProps {
	return {
		activeExercise: state.exercise.activeExercise || undefined,
		activeAttemptId: (state.exercise.activeAttempt || { id: undefined }).id,
	};
}

const dispatchProps: DispatchProps = {
	setActiveExercise: ExerciseActions.setActiveExercise,
	createAttempt: ExerciseActions.createAttempt,
	updateAttempt: ExerciseActions.updateAttempt,
};

export default connect(mapStateToProps, dispatchProps)(ExercisePlayground);
