const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    level:{
        type: Number,
        required: true
    },
    exptonextlvl:{
        type: Number
    },
    actualexp:{
        type: Number
    },
    pokemonAPIID: {
        type: String,
        required: true
    }
});

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
