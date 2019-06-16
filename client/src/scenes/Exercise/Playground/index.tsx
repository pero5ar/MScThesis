import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect, ReactReduxActionsToDispatchActions } from 'react-redux';
import Button from 'react-bootstrap/Button';

import NodeData from 'models/nodeData.model';

import { AttemptState } from 'models/requestModels/attempt.requestModels';

import AttemptViewModel from 'models/viewModels/attempt.viewModel';
import ExerciseViewModel from 'models/viewModels/exercise.viewModel';

import { RootState } from 'state';
import DiagramActions, { DiagramState } from 'state/diagram';
import ExerciseActions from 'state/exercise';

import Diagram from 'components/Diagram';

interface PathParams {
	exerciseId: string;
}

type OwnProps = RouteComponentProps<PathParams>;

interface StateProps {
	activeExercise: ExerciseViewModel | undefined;
	activeAttempt: AttemptViewModel | undefined;
}

interface DispatchProps {
	setState: typeof DiagramActions.setState;
	setActiveExercise: typeof ExerciseActions.setActiveExercise;
	createAttempt: typeof ExerciseActions.createAttempt;
	updateAttempt: typeof ExerciseActions.updateAttempt;
}

type Props = OwnProps & StateProps & ReactReduxActionsToDispatchActions<DispatchProps>

interface State {
	hasStarted: boolean;
}

class ExercisePlayground extends React.PureComponent<Props, State> {
	state: State = {
		hasStarted: false,
	};

	static getDerivedStateFromProps(props: Readonly<Props>, state: State): Partial<State> | null {
		const startPrerequisitesNotMet = !props.activeExercise || !props.activeAttempt;
		if (startPrerequisitesNotMet && state.hasStarted) {
			return { hasStarted: false };
		}
		return null;
	}

	async componentDidMount() {
		const { setActiveExercise, match: { params: { exerciseId } } } = this.props;
		await setActiveExercise(exerciseId);
	}

	start = async () => {
		const { activeAttempt, setState, createAttempt, match: { params: { exerciseId } } } = this.props;

		if (!activeAttempt) {
			const emptyState: AttemptState = { diagramState: null, serializedGraph: '' };
			await createAttempt(exerciseId, emptyState);
			setState(null);
		} else {
			setState(activeAttempt.currentState && activeAttempt.currentState.diagramState);
		}
		this.setState(() => ({ hasStarted: true }));
	}

	updateAttempt = async (diagramState: DiagramState, serializedGraph: string, output?: NodeData, hasEnded?: boolean) => {
		const { updateAttempt, activeAttempt, match: { params: { exerciseId } } } = this.props;
		if (!activeAttempt) {
			this.setState(() => ({ hasStarted: false }));
			return;
		}
		const state: AttemptState = { diagramState, serializedGraph };
		await updateAttempt(exerciseId, activeAttempt.id, state, output, hasEnded);
	}

	onUpdate = async (diagramState: DiagramState, serializedGraph: string, output?: NodeData) => {
		this.updateAttempt(diagramState, serializedGraph, output, false);
	}

	onEnd = async (diagramState: DiagramState, serializedGraph: string, output: NodeData) => {
		this.updateAttempt(diagramState, serializedGraph, output, true);
		this.setState(() => ({ hasStarted: false }));
	}

	render() {
		const { activeExercise } = this.props;
		const { hasStarted } = this.state;

		if (!activeExercise || !hasStarted) {
			return <Button onClick={this.start}>Start Attempt</Button>;
		}
		return <Diagram input={activeExercise.input} onUpdate={this.onUpdate} onEnd={this.onEnd} />;
	}
}

function mapStateToProps(state: RootState): StateProps {
	return {
		activeExercise: state.exercise.activeExercise || undefined,
		activeAttempt: state.exercise.activeAttempt || undefined,
	};
}

const dispatchProps: DispatchProps = {
	setState: DiagramActions.setState,
	setActiveExercise: ExerciseActions.setActiveExercise,
	createAttempt: ExerciseActions.createAttempt,
	updateAttempt: ExerciseActions.updateAttempt,
};

export default connect(mapStateToProps, dispatchProps)(ExercisePlayground);
