const pool = require("../config/db");
const FilmRepository = require("../repository/filmRepository");
require("../repository/FilmRepository");

class FilmController {
	static async getAll(req, res) {
		const films = await FilmRepository.getAll();

		res.status(200).json(films);
	}

	static async getById(req, res) {
		const films = await FilmRepository.getById(req.params.id);
		if (films.length === 0) return res.status(404).send("Film non trouvé");
		res.json(films[0]);
	}

	static async create(req, res) {
		const { titre } = req.body;
		if (!titre) return res.status(400).send("titre requis");

		try {
			const result = await FilmRepository.create(req.body);
			if (result.affectedRows) {
				console.log("Insert successful! Inserted ID:  ", result.insertId);
				res.status(201).send("Film ajouté");
			} else {
				console.log("Insert failed.");
				res.status(500).send("Error while creating the film: Film pas ajouté");
			}
		} catch (err) {
			res.status(500).send("Erreur Message in Controller: " + err.message);
		}
	}

	static async update(req, res) {
		const { titre } = req.body;
		if (!titre) return res.status(400).send("Nouveau titre requis");

		try {
			const result = await FilmRepository.update(req.params.id, req.body);

			if (result.affectedRows) {
				console.log("Update successful!");
				res.status(201).send("Titre mis à jour");
			} else {
				console.log("Update failed.");
				res.status(500).send("Film pas modifié");
			}
		} catch (e) {
			res.status(500).send("Erreur : " + e.message);
		}
	}

	static async delete(req, res) {
		try {
			const result = await FilmRepository.delete(req.params.id);
			if (result.affectedRows === 0) return res.status(404).send("Film non trouvé");
			res.status(200).send("Film supprimé");
		} catch (err) {
			res.status(500).send("Erreur : " + err.message);
		}
	}
}

module.exports = FilmController;
