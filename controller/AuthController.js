const UserRepository = require("../repository/UserRespository");

class AuthController {
	static async login(req, res) {
		try {
			const user = await UserRepository.get(req.body.username, req.body.password);

			if (user) {
				return res.status(200).send("connected");
			} else {
				return res.status(403).send("user not found");
			}
		} catch (e) {
			res.status(403).send(e.message);
		}
	}

	static async register(req, res) {
		try {
			const result = await UserRepository.create(req.body);
			console.log(result.insertId);
			res.status(200).send("User created!");
		} catch (e) {
			res.status(500).send(e.message);
		}
	}
}

module.exports = AuthController;
