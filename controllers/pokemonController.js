var axios = require("axios");
const db = require("../models");

let findPokemonByAPI = function (pokemonId){
  console.log("Pokemon findPokemonByAPI");
  return axios.get("https://pokeapi.co/api/v2/pokemon/"+pokemonId)
    .then( response => response.data)
    .catch(err => err);
};

let findMoves = function (pokemonOBJ){
  
  let pokeMoves = [];
  let apiMoves =  pokemonOBJ.moves;
  
  for(let i=0; i<4 ; i++){
    let movesRdm = Math.floor(Math.random() * parseInt(apiMoves.length)); 
    pokeMoves.push(apiMoves[movesRdm].move.name);            
  }
  return pokeMoves;
}
// Defining methods for the PokemonsController
module.exports = {
  findAll: function(req, res) {
    console.log("Pokemon findAll");
    db.Pokemon
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel =>res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    console.log("Pokemon findById");
    db.Pokemon
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findPokemonAPI : function (req, res){
    console.log("Pokemon findPokemonByAPI");

    return new Promise((resolve, reject) => {
      findPokemonByAPI(req.body.pokemonId)
          .then(data =>{
            console.log(data);
            pokeMoves = findMoves(data);
            let pokemon = data;
            pokemon.pokeMoves = pokeMoves;
            resolve({pokemon : pokemon});
          }).catch(err => reject(res.status(422).json(err)));
    });

    
  },
  findOpponnet : function (req, res){
    console.log("Pokemon findOponnet");
    db.Pokemon
      .find()
      .then(async dbModel => {
        let pokNum = Math.floor(Math.random() * dbModel.length); 
        let opponent =  dbModel[pokNum];
        let pokeMoves =[];

        findPokemonByAPI(opponent.apiId)
          .then(data =>{
            pokeMoves = findMoves(data);
            //console.log(pokeMoves);
            return res.json({opponent : opponent, pokeMoves: pokeMoves});
          }).catch(err => res.status(422).json(err));
      }).catch(err => res.status(422).json(err));
  },
 
  create: function(req, res) {
    console.log("Pokemon create");
    db.Pokemon
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    console.log("Pokemon update");
    db.Pokemon
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    console.log("Pokemon remove");
    db.Pokemon
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
  
};
