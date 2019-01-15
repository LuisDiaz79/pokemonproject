const router = require("express").Router();
const pokemonsRoutes = require("./pokemons");
const authRoutes = require("./auth");

// Book routes
router.use("/pokemons", pokemonsRoutes);
router.use("/auth", authRoutes);

module.exports = router;
