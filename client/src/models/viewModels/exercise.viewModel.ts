import NodeData from 'models/nodeData.model';
import AttemptViewModel from 'models/viewModels/attempt.viewModel';

interface ExerciseViewModel {
	id: string;
	code: string;
	title: string;
	description: string;
	input: NodeData;
	isSolved: boolean;
	lastAttempt: AttemptViewModel;
}

export default ExerciseViewModel;
