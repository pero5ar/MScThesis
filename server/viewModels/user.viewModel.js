class UserViewModel {
	constructor(userDocument, token) {
		this.email = userDocument.email;
		this.token = token;
		this.type = userDocument.type;
		this.firstName = userDocument.firstName;
		this.lastName = userDocument.lastName;
	}
}

module.exports = UserViewModel;
