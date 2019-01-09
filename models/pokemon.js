const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  synopsis: String,
  date: { type: Date, default: Date.now }
});

const Pokemon = mongoose.model("Pokemon", pokemonSchema);

module.exports = Pokemon;
