class ExerciseTableViewModel {
	constructor(exerciseDocuments, userId) {
		this.rows = exerciseDocuments.map((_exerciseDocument) => ({
			id: _exerciseDocument.id,
			code: _exerciseDocument.code,
			title: _exerciseDocument.title,
			numberOfUsersAttempted: _exerciseDocument.usersAttemptedIds.length,
			numberOfUsersCompleted: _exerciseDocument.usersCompletedIds.length,
			isAttempted: _exerciseDocument.usersAttemptedIds.includes(userId),
			isSolved: _exerciseDocument.usersCompletedIds.includes(userId),
		}));
	}
}

module.exports = ExerciseTableViewModel;
