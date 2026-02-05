const UserRepository = require("../repository/UserRespository");

class AuthController {
	static async login(req, res) {
		try {
			const user = await UserRepository.login(req.body.username, req.body.password);

			if (user) {
				return res.status(200).send("connected");
			} else {
				return res.status(403).send("user not found");
			}
			console.log(result);
		} catch (e) {
			res.status(403).send(e.message);
		}
	}
}

module.exports = AuthController;
