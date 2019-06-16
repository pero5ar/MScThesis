import AttemptViewModel from 'models/viewModels/attempt.viewModel';
import ExerciseViewModel from 'models/viewModels/exercise.viewModel';
import ExerciseTableViewModel from 'models/viewModels/exerciseTable.viewModel';

import * as EXERCISE_ACTIONS from './exercise.actionTypes';

interface SetExerciseTable {
	type: typeof EXERCISE_ACTIONS.SET_EXERCISE_TABLE;
	payload: {
		table: Nullable<ExerciseTableViewModel>;
	};
}
export function SET_EXERCISE_TABLE(table: Nullable<ExerciseTableViewModel>): SetExerciseTable {
	return {
		type: EXERCISE_ACTIONS.SET_EXERCISE_TABLE,
		payload: { table },
	};
}

interface SetActiveExercise {
	type: typeof EXERCISE_ACTIONS.SET_ACTIVE_EXERCISE;
	payload: {
		exercise: Nullable<ExerciseViewModel>;
	};
}
export function SET_ACTIVE_EXERCISE(exercise: Nullable<ExerciseViewModel>): SetActiveExercise {
	return {
		type: EXERCISE_ACTIONS.SET_ACTIVE_EXERCISE,
		payload: { exercise },
	};
}

interface SetActiveAttempt {
	type: typeof EXERCISE_ACTIONS.SET_ACTIVE_ATTEMPT;
	payload: {
		attempt: Nullable<AttemptViewModel>;
	};
}
export function SET_ACTIVE_ATTEMPT(attempt: Nullable<AttemptViewModel>): SetActiveAttempt {
	return {
		type: EXERCISE_ACTIONS.SET_ACTIVE_ATTEMPT,
		payload: { attempt },
	};
}

export type ExerciseAction = SetExerciseTable | SetActiveExercise | SetActiveAttempt;
