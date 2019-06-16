import { store } from 'index';

export const selectors = {
	getDiagramState: () => store.getState().diagram,
	getActiveAttempt: () => store.getState().exercise.activeAttempt,
};
