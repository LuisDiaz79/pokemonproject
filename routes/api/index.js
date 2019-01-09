const router = require("express").Router();
const pokemonsRoutes = require("./pokemons");

// Book routes
router.use("/pokemons", pokemonsRoutes);

module.exports = router;
