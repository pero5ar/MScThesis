const AttemptViewModel = require('./attempt.viewModel');

class ExerciseViewModel {
	constructor(exerciseDocument, userId, attemptDocument) {
		this.id = exerciseDocument.id;
		this.code = exerciseDocument.code;
		this.title = exerciseDocument.title;
		this.description = exerciseDocument.description;
		this.input = exerciseDocument.input;
		this.isSolved = userId ? exerciseDocument.usersCompletedIds.includes(userId) : undefined;
		this.lastAttempt = attemptDocument && new AttemptViewModel(attemptDocument);
	}
}

module.exports = ExerciseViewModel;
