const express = require("express");
const app = express();
const filmsRoutes = require("./routes/films");
const authRoutes = require("./routes/auth");

app.use(express.json());
app.use("/films", filmsRoutes);
app.use("/auth", authRoutes);

app.listen(3000, () => {
	console.log("Serveur démarré sur http://localhost:3000");
});
