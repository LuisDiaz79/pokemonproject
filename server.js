const express = require("express");

const mongoose = require("mongoose");
const routes = require("./routes");
const auth = require('./routes/api/auth');
const app = express();
const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

//Auth
app.use('/api/auth', auth);


mongoose.Promise = require('bluebird');
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/pokemonproject", { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('MONGO connection succesful'))
  .catch((err) => console.error(err));

// Start the API server
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});

