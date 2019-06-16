import { Dispatch } from 'redux';

import * as API from 'constants/routes/api';
import * as CLIENT from 'constants/routes/client';

import NodeData from 'models/nodeData.model';

import * as AttemptRequestModels from 'models/requestModels/attempt.requestModels';

import AttemptViewModel from 'models/viewModels/attempt.viewModel';
import ExerciseViewModel from 'models/viewModels/exercise.viewModel';
import ExerciseTableViewModel from 'models/viewModels/exerciseTable.viewModel';

import * as EXERCISE_ACTIONS from './exercise.actionCreators';

import { actionWithErrorHandler } from 'utils/action.util';
import http from 'utils/http.util';
import { redirect } from 'utils/router.util';

type ExerciseAction = EXERCISE_ACTIONS.ExerciseAction;

export function getExerciseTable() {
	return async function (dispatch: Dispatch<ExerciseAction>) {
		const action = async () => {
			const exerciseTable = await http.get<ExerciseTableViewModel>(API.EXERCISES.TABLE);
			dispatch(EXERCISE_ACTIONS.SET_EXERCISE_TABLE(exerciseTable));
		};
		return await actionWithErrorHandler(action, dispatch);
	};
}

export function setActiveExercise(exerciseId: string) {
	return async function (dispatch: Dispatch<ExerciseAction>) {
		const action = async () => {
			const exercise = await http.get<ExerciseViewModel>(API.EXERCISES.SINGLE(exerciseId));
			dispatch(EXERCISE_ACTIONS.SET_ACTIVE_EXERCISE(exercise));
			const hasActiveAttempt = !!exercise.lastAttempt && !exercise.lastAttempt.hasEnded;
			dispatch(EXERCISE_ACTIONS.SET_ACTIVE_ATTEMPT(hasActiveAttempt ? exercise.lastAttempt : null));
		};
		return await actionWithErrorHandler(action, dispatch);
	};
}

export function createAttempt(exerciseId: string, state: AttemptRequestModels.AttemptState) {
	return async function (dispatch: Dispatch<ExerciseAction>) {
		const action = async () => {
			const data: AttemptRequestModels.Create = { state };
			const url = API.EXERCISES.ATTEMPTS.CREATE(exerciseId);
			const attempt = await http.post<AttemptRequestModels.Create, AttemptViewModel>(url, data);
			dispatch(EXERCISE_ACTIONS.SET_ACTIVE_ATTEMPT(attempt));
		};
		return await actionWithErrorHandler(action, dispatch);
	};
}

export function updateAttempt(
	exerciseId: string,
	attemptId: string,
	state: AttemptRequestModels.AttemptState,
	output: Nullable<NodeData> = null,
	hasEnded: boolean = false
) {
	return async function (dispatch: Dispatch<ExerciseAction>) {
		const errorHandlers = {
			err404: () => {
				dispatch(EXERCISE_ACTIONS.SET_ACTIVE_ATTEMPT(null));
				redirect(CLIENT.ERROR.ERR404);
			},
		};
		const action = async () => {
			const data: AttemptRequestModels.Update = { state, output, hasEnded };
			const url = API.EXERCISES.ATTEMPTS.SINGLE(exerciseId, attemptId);
			const attempt = await http.put<AttemptRequestModels.Update, AttemptViewModel>(url, data);
			dispatch(EXERCISE_ACTIONS.SET_ACTIVE_ATTEMPT(attempt));
		};
		return await actionWithErrorHandler(action, dispatch, errorHandlers);
	};
}
