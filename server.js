var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var session = require('express-session');



// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Static directory
app.use(express.static("public"));
app.use(cookieParser());
app.use(session({secret: "Your secret key"}));

// Routes
// =============================================================
require("./routes/owner-api-routes.js")(app);
//add the right routing here once we have it
require("./routes/html-api-routes.js")(app); 
require("./routes/property-api-routes.js")(app); 


// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});