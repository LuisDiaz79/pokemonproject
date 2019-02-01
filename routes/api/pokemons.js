const router = require("express").Router();
const pokemonController = require("../../controllers/pokemonController");

var passport = require('passport');
require('../../config/passport')(passport);

// Matches with "/api/pokemons"
router.route("/")
  .get(passport.authenticate('jwt', { session: false}), function(req, res){
    
    var token = getToken(req.headers);;

    if(token){
      pokemonController.findAll(req, res);
    }else {
      return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
  })
  .post(passport.authenticate('jwt', { session: false}), pokemonController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(passport.authenticate('jwt', { session: false}), pokemonController.findById)
  .put(passport.authenticate('jwt', { session: false}), pokemonController.update)
  .delete(passport.authenticate('jwt', { session: false}), pokemonController.remove);

router
  .route("/opponent")
  .post(passport.authenticate('jwt', { session: false}), pokemonController.findOpponnet);


router.post('/init', function (req, res) {
    let initialPokemons = [
        {
            apiId: 1,
            name: "Bulbasaur",
            imageURL: "/pokemon/bulbasaur.png",
            animatedURL: "https://img.pokemondb.net/sprites/black-white/anim/normal/bulbasaur.gif"
        },
        {
            apiId: 4,
            name: "Charmander",
            imageURL: "/pokemon/charmander.png",
            animatedURL: "https://img.pokemondb.net/sprites/black-white/anim/normal/charmander.gif"
        },
        {
            apiId: 7,
            name: "Squirtle",
            imageURL: "/pokemon/squirle.png",
            animatedURL: "https://img.pokemondb.net/sprites/black-white/anim/normal/squirtle.gif"
        }
    ];
    res.json({ pokemons: initialPokemons });
});

getToken = function (headers) {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(' ');
      if (parted.length === 2) {
        return parted[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
  };


module.exports = router;
