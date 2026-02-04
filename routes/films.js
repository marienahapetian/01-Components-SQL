const express = require("express");
const router = express.Router();

const { getAllFilms, getFilmById, addFilm, updateFilm, deleteFilm } = require("../controller/filmController");

// 1. GET / : liste complète
router.get("/", getAllFilms);

// 2. GET /:id : film par ID
router.get("/:id", getFilmById);

// 3. POST / : ajout d’un film
router.post("/", addFilm);

// 4. PATCH /:id : modification du titre
router.patch("/:id", updateFilm);

// 5. DELETE /:id : suppression
router.delete("/:id", deleteFilm);

module.exports = router;
