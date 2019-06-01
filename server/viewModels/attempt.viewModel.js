class AttemptViewModel {
	constructor(attemptDocument) {
		this.id = attemptDocument.id;
		this.exerciseId = attemptDocument.exerciseId;
		this.isSuccessful = attemptDocument.isSuccessful;
		this.hasEnded = !!attemptDocument.endState;
		this.currentState = attemptDocument.currentState;
	}
}

module.exports = AttemptViewModel;
