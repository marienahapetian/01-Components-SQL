const express = require("express");
const router = express.Router();

const AuthController = require("../controller/AuthController");

// 1. GET / : liste complète
router.get("/login", AuthController.login);
router.post("/register", AuthController.register);

module.exports = router;
