class InsertFailed extends Error {
	constructor(message) {
		message = "Insert failed: " + message;
		super(message);
		this.name = "InsertFailed";
		this.code = 400;
	}
}

module.exports = InsertFailed;
