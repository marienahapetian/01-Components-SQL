class UpdateFailed extends Error {
	constructor(message) {
		message = "Update failed: " + message;
		super(message);
		this.name = "UpdateFailed";
		this.code = 400;
	}
}

module.exports = UpdateFailed;
