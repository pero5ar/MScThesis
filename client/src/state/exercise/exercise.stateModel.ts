import AttemptViewModel from 'models/viewModels/attempt.viewModel';
import ExerciseViewModel from 'models/viewModels/exercise.viewModel';
import ExerciseTableViewModel from 'models/viewModels/exerciseTable.viewModel';

export interface ExerciseState {
	table: ExerciseTableViewModel;
	activeExercise: Nullable<ExerciseViewModel>;
	activeAttempt: Nullable<AttemptViewModel>;
}
