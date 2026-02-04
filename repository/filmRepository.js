const pool = require("../config/db");

class FilmRepository {
	static async getAll() {
		console.log("repository");

		const [films] = await pool.query("SELECT * FROM films");
		console.log("repository", films);
		return films;
	}

	static async getFilmById(id) {
		const [films] = await pool.query("SELECT * FROM films WHERE id=? LIMIT 1", [id]);
		return films;
	}
}

module.exports = FilmRepository;
