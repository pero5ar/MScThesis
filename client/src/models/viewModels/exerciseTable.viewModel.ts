export interface ExerciseTableRowViewModel {
	id: string;
	code: string;
	title: string;
	numberOfUsersAttempted: number;
	numberOfUsersCompleted: number;
	isAttempted: boolean;
	isSolved: boolean;
}

interface ExerciseTableViewModel {
	rows: ExerciseTableRowViewModel[];
}

export default ExerciseTableViewModel;
