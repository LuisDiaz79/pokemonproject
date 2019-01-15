const router = require("express").Router();
const pokemonController = require("../../controllers/pokemonController");

var passport = require('passport');
require('../../config/passport')(passport);

// Matches with "/api/books"
router.route("/")
  .get(passport.authenticate('jwt', { session: false}), function(req, res){
    
    var token = getToken(req.headers);
    console.log(`POKEMON GET ${token}`);

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
