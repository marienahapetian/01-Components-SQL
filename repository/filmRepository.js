const pool = require("../config/db");
const DeleteFailed = require("../exception/DeleteFailed");
const InsertFailed = require("../exception/InsertFailed");
const UpdateFailed = require("../exception/UpdateFailed");

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

	static async update(id, data) {
		const { titre, duree_minutes, annee_sortie } = data;

		try {
			const [result] = await pool.query("UPDATE films SET titre = ?, duree_minutes = ?, annee_sortie = ? WHERE id=?", [titre, duree_minutes, annee_sortie, id]);

			return result;
		} catch (e) {
			throw new UpdateFailed(e.message);
		}
	}

	static async delete(id) {
		try {
			const [result] = await pool.query("DELETE FROM films WHERE id = ?", [id]);
			return result;
		} catch (e) {
			throw new DeleteFailed(e.message);
		}
	}
}

module.exports = FilmRepository;
