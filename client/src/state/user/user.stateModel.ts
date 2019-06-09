import UserViewModel from 'models/viewModels/user.viewModel';

export interface UserState {
	user: Nullable<UserViewModel>;
	isAuthenticated: boolean;
}
