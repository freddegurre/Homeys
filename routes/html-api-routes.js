// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {


  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // owner/signup loads the form for owners to sign up this should become popup modal on index file!
  app.get("/owner/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/owner.html"));
  });

  // For owner to register property page, to reach this they have to be loged in!
  app.get("/property", function(req, res) {
    if (!req.session.user) {
      res.send("you have to login"); 
       res.status(401); 
      }else {
        res.sendFile(path.join(__dirname, "../public/Property.html"));
      }
    
  });

  // Owner login, this should also be popup modal on index.html
  app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  //owner profile page, is only acsessable when user is loged in
  app.get("/profile", function(req, res) {
    if (!req.session.user) {
    res.send("you have to login"); 
     res.status(401); 
    }else {
      res.sendFile(path.join(__dirname, "../public/profile.html"));
    }
    
  });



};