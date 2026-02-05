class UserNotFound extends Error {
	constructor(message) {
		message = "User Not Found";
		super(message);
		this.name = "UserNotFound";
		this.code = 409;
	}
}
module.exports = UserNotFound;
