const pool = require("../config/db");
const InsertFailed = require("../exception/InsertFailed");

class FilmRepository {
	static async getAll() {
		console.log("repository");

		const [films] = await pool.query("SELECT * FROM films");
		console.log("repository", films);
		return films;
	}

	static async getById(id) {
		const [films] = await pool.query("SELECT * FROM films WHERE id=? LIMIT 1", [id]);
		return films;
	}

	static async create(data) {
		const { titre, duree_minutes, annee_sortie } = data;
		try {
			const [result] = await pool.query("INSERT INTO films (titre, duree_minutes, annee_sortie) VALUES (?,?,?)", [titre, duree_minutes, annee_sortie]);
			return result;
		} catch (e) {
			throw new InsertFailed(e.message);
		}
	}
}

module.exports = FilmRepository;
