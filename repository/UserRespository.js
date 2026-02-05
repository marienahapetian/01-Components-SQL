const bcrypt = require("bcrypt");
const saltRounds = 10;

const pool = require("../config/db");
const UserNotFound = require("../exception/UserNotFound");
class UserRepository {
	static async login(username, password) {
		try {
			const [result] = await pool.query("SELECT * FROM users WHERE username=?", [username]);
			let user = result[0];

			const match = await bcrypt.compare(password, user.password);

			if (match) {
				return user;
			} else {
				return false;
			}
		} catch (e) {
			console.log(e);
			throw new UserNotFound(e.message);
		}
	}
}
module.exports = UserRepository;
