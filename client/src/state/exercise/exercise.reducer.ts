import * as EXERCISE_ACTIONS from './exercise.actionTypes';
import { ExerciseAction } from './exercise.actionCreators';
import { ExerciseState } from './exercise.stateModel';

const initialState: ExerciseState = {
	table: { rows: [] },
	activeExercise: null,
	activeAttempt: null,
};

export default function exerciseReducer(state: ExerciseState = initialState, action: ExerciseAction) {
	switch (action.type) {
		case EXERCISE_ACTIONS.SET_EXERCISE_TABLE:
			return { ...state, table: action.payload.table || initialState.table };
		case EXERCISE_ACTIONS.SET_ACTIVE_EXERCISE:
			return { ...state, activeExercise: action.payload.exercise || initialState.activeExercise };
		case EXERCISE_ACTIONS.SET_ACTIVE_ATTEMPT:
			return { ...state, activeAttempt: action.payload.attempt || initialState.activeAttempt };
		default:
			return state;
	}
}
