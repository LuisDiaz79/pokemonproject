const db = require("../models");

// Defining methods for the PokemonsController
module.exports = {
  findAll: function(req, res) {
    console.log("Player findAll");
    db.Player
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => {
        console.log(dbModel);
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },
  findById: function(id) {
    console.log(`Player findById ${id}`);
    db.Player
      .find({name : id})
      .then(dbModel => {
        console.log(dbModel);
        res.json(dbModel)
      })
      .catch(err => ({status : 422, err : err}));
  },
  create: function(req, res) {
    console.log("Player create");
    db.Player
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    console.log("Player update");
    db.Player
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    console.log("Player remove");
    db.Player
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
