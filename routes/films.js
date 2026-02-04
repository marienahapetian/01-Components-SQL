const express = require("express");
const router = express.Router();

const FilmController = require("../controller/FilmController");

// 1. GET / : liste complète
router.get("/", FilmController.getAll);

// 2. GET /:id : film par ID
router.get("/:id", FilmController.getById);

// 3. POST / : ajout d’un film
router.post("/", FilmController.create);

// 4. PATCH /:id : modification du titre
router.patch("/:id", FilmController.update);

// 5. DELETE /:id : suppression
router.delete("/:id", FilmController.delete);

module.exports = router;
