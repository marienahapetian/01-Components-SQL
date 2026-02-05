class DeleteFailed extends Error {
	constructor(message) {
		message = "Update failed: " + message;
		super(message);
		this.name = "DeleteFailed";
		this.code = 400;
	}
}

module.exports = DeleteFailed;
