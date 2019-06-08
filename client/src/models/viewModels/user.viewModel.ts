import UserType from '../../enums/userType.enum';

interface UserViewModel {
	email: string;
	token?: string;	// only sent with register or login
	type: UserType;
	firstName: string;
	lastName: string;
};

export default UserViewModel;
