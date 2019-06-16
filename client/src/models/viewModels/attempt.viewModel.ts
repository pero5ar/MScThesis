import { AttemptState } from 'models/requestModels/attempt.requestModels';

interface AttemptStateViewModel extends AttemptState {
	timestamp: Date;
}

interface AttemptViewModel {
	id: string;
	exerciseId: string;
	isSuccessful: boolean;
	hasEnded: boolean;
	currentState: AttemptStateViewModel;
}

export default AttemptViewModel;
