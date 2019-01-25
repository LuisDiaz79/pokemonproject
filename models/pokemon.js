const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pokemonSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  apiId: { 
    type: Number, 
    required: true 
  },
  imageURL: { 
    type: String, 
    required: true 
  },
  backImageURL: { 
    type: String, 
    required: false 
  },
  animatedURL: { 
    type: String, 
    required: true 
  }
});

const Pokemon = mongoose.model("Pokemon", pokemonSchema);

module.exports = Pokemon;
