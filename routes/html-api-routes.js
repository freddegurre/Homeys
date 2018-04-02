// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");

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
      console.log('the profile page is here' + req.session.user)
      db.Owner.findOne({
        where: {
          id: req.session.user.id
        },
        include: [db.Property]
      }).then(function(data) {
        var propObj = {
          allProperties: data.Properties
        }
        res.render("profile", propObj)
        
      })
      //res.sendFile(path.join(__dirname, "../public/profile.html"));
    }
    
  });  
  
  //---------------PROVIDER-------

  //provider signup loads the form for providers to signup, this hould become popup on indix!
  app.get("/provider/signup", function(req, res){
    res.sendFile(path.join(__dirname, "../public/provider.html" ))
  })

  //Login provider
  app.get("/provider-login", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/provider-login.html"));
  });

  //Provider profile page is only acsessable when user is loged in
  app.get("/provider-profile", function(req, res) {
    if (!req.session.user) {
    res.send("you have to login"); 
     res.status(401); 
    }else {
      res.sendFile(path.join(__dirname, "../public/provider-profile.html"));
    }
    
  });


};