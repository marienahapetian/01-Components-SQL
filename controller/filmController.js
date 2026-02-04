const pool = require("../config/db");
const FilmRepository = require("../repository/filmRepository");
require("../repository/FilmRepository");

class FilmController {
	static async getAll(req, res) {
		const films = await FilmRepository.getAll();

		res.status(200).json(films);
	}

	static async getById(req, res) {
		const films = await FilmRepository.getFilmById(req.params.id);
		if (films.length === 0) return res.status(404).send("Film non trouvé");
		res.json(films[0]);
	}

	static async create(req, res) {
		const { titre } = req.body;
		if (!titre) return res.status(400).send("titre requis");

		try {
			const [result, fields] = await pool.query("INSERT INTO films (titre) VALUES (?)", [titre]);
			if (result.affectedRows === 1) {
				console.log("Insert successful! Inserted ID:", result.insertId);
				res.status(201).send("Film ajouté");
			} else {
				console.log("Insert failed.");
				res.status(500).send("Film pas ajouté");
			}
		} catch (err) {
			res.status(500).send("Erreur : " + err.message);
		}
	}

	static async update(req, res) {
		const { titre } = req.body;
		if (!titre) return res.status(400).send("Nouveau titre requis");
		const [result, fields] = await pool.query("UPDATE films SET titre=? WHERE id=?", [titre, req.params.id]);
		if (result.affectedRows > 0) {
			console.log("Update successful!");
			res.status(201).send("Titre mis à jour");
		} else {
			console.log("Update failed.");
			res.status(500).send("Film pas modifié");
		}
		try {
		} catch (err) {
			res.status(500).send("Erreur : " + err.message);
		}
	}

	static async delete(req, res) {
		try {
			const [result] = await pool.query("DELETE FROM films WHERE id = ?", [req.params.id]);
			if (result.affectedRows === 0) return res.status(404).send("Film non trouvé");
			res.status(200).send("Film supprimé");
		} catch (err) {
			res.status(500).send("Erreur : " + err.message);
		}
	}
}

module.exports = FilmController;
