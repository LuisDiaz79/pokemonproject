var passport = require('passport');
var json = require('circular-json');
var settings = require('../../config/settings');
require('../../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../../models/User");
var Player = require("../../models/player");
const playerController = require("../../controllers/playerController");
const pokemonController = require("../../controllers/pokemonController");

const asyncHandler = (promise) => {
    return promise
        .then(response => [null, response])
        .catch(err => [err, null]);
}


//Create router for signup or register the new user.

router.post('/register', function (req, res) {
    console.log("AUTH REGISTER.POST");
    if (!req.body.username || !req.body.password) {
        res.json({ success: false, msg: 'Please pass username and password.' });
    } else {
        var newUser = new User({
            username: req.body.username,
            password: req.body.password
        });
        // save the user
        newUser.save(async function (err) {
            if (err) {
                return res.json({ success: false, msg: 'Username already exists.' });
            }
            let newPlayer = {
                name: req.body.name,
                email: req.body.username,
                gender: req.body.chosenGender,
                level: 1,
                exptonextlvl: 100,
                actualexp: 0,
                pokemonAPIID: req.body.chosenPokemon

            }
            req.body = newPlayer;
            playerController.create(req, res);
        });
    }
});

//Create router for login or sign-in.

router.post('/login', function (req, res) {
    console.log("AUTH LOGIN.POST");
    User.findOne({
        username: req.body.username
    }, function (err, user) {
        if (err) throw err;

        if (!user) {
            res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
        } else {
            // check if password matches

            user.comparePassword(req.body.password, async (err, isMatch) => {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var token = jwt.sign(user.toJSON(), settings.secret);
                    // return the information including token as JSON


                    const [error, userInfo] = await asyncHandler(Player.find({ email: user.username }));

                    if (!error) {
                        console.log(userInfo[0].pokemonAPIID);
                        req.body.pokemonId = userInfo[0].pokemonAPIID;
                        // console.log(req);
                        pokemonController.findPokemonAPI(req, res)
                            .then((result) => {
                                res.json({
                                    success: true,
                                    token: 'JWT ' + token,
                                    userInfo: userInfo,
                                    myPokemon: result.pokemon
                                });
                            }).catch(err => err);

                    } else {
                        res.status(404).send({ success: false, msg: 'Authentication failed. User not found.' });
                    }

                } else {
                    res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
                }
            });
        }
    });
});


//Export the router variable as a module.

module.exports = router;