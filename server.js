const express = require("express");
const app = express();
const filmsRoutes = require("./routes/films");
const authRoutes = require("./routes/auth");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

app.use(express.json());
app.use("/api/films", filmsRoutes);
app.use("/auth", authRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => {
	console.log("Serveur démarré sur http://localhost:3000");
});
