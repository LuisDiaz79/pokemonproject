const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
  username: { 
    type: String, 
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  }
});

const Pokemon = mongoose.model("Pokemon", pokemonSchema);

module.exports = Pokemon;
