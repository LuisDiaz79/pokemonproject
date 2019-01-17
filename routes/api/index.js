const router = require("express").Router();
const playersRoutes = require("./players");
const pokemonsRoutes = require("./pokemons");
const authRoutes = require("./auth");

// Book routes
router.use("/players", playersRoutes);
router.use("/pokemons", pokemonsRoutes);
router.use("/auth", authRoutes);

module.exports = router;
