const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// 1. GET / : liste complète
router.get("/", async (req, res) => {
	const [films] = await pool.query("SELECT * FROM films");

	console.log(films);
	res.status(200).json(films);
});

// 2. GET /:id : film par ID
router.get("/:id", async (req, res) => {
	//TODO : ECRIRE LA REQUETE PREPAREE
	const [films] = await pool.query("SELECT * FROM films WHERE id=? LIMIT 1", [req.params.id]);
	if (films.length === 0) return res.status(404).send("Film non trouvé");
	res.json(films[0]);
});

// 3. POST / : ajout d’un film
router.post("/", async (req, res) => {
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
});

// 4. PATCH /:id : modification du titre
router.patch("/:id", async (req, res) => {
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
});

// 5. DELETE /:id : suppression
router.delete("/:id", async (req, res) => {
	try {
		const [result] = await pool.query("DELETE FROM films WHERE id = ?", [req.params.id]);
		if (result.affectedRows === 0) return res.status(404).send("Film non trouvé");
		res.status(200).send("Film supprimé");
	} catch (err) {
		res.status(500).send("Erreur : " + err.message);
	}
});

module.exports = router;
