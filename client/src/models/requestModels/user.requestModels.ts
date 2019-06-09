import UserType from 'enums/userType.enum';

export interface Register {
	email: string;
	password: string;
	repeatPassword: string;
	type: UserType;
	firstName: string;
	lastName: string;
}

export interface Login {
	email: string;
	password: string;
}
