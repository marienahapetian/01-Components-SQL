const bcrypt = require("bcrypt");
const saltRounds = 10;

const pool = require("../config/db");
const UserNotFound = require("../exception/UserNotFound");
const InsertFailed = require("../exception/InsertFailed");
class UserRepository {
	static async get(username, password) {
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

	static async create(data) {
		const { username, email, password } = data;

		try {
			const hash = bcrypt.hashSync(password, saltRounds);
			const [result] = await pool.query("INSERT INTO users (username, email, password) VALUES (?,?,?)", [username, email, hash]);
			return result;
		} catch (e) {
			throw new InsertFailed(e.message);
		}
	}
}
module.exports = UserRepository;
