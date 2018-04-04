// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {


  // when loading wbesite, check if user has session if they dont load home page otherwise load profile page. 
  app.get("/", function(req, res) {
    if (!req.session.user) {
      res.sendFile(path.join(__dirname, "../public/home.html"));
    }else {
      db.Owner.findOne({
        where: {
          id: req.session.user.id
        },
        include: [db.Property]
      }).then(function(data) {
        var propObj = {
          allProperties: data.Properties,
          email: data.dataValues.email,
          user_name: data.dataValues.user_name
        }
        res.render("profile", propObj)
        
      });
    }
    
  });



  //owner profile page, is only acsessable when user is loged in
  app.get("/profile", function(req, res) {
    if (!req.session.user) {
    //res.send("you have to login"); 
    var error = {error: "You need to log in"}
    res.redirect('/oops');
    }else {
      console.log('the profile page is here' + req.session.user)
      db.Owner.findOne({
        where: {
          id: req.session.user.id
        },
        
        include: [db.Property]
      }).then(function(data) {
        console.log(data.get({plain: true}));
      
        var shortUrl = data.dataValues.url.replace("public", "");
        var homePics = [];
        homePics.push(data.Properties)

        var propObj = {
          allProperties: data.Properties,
          email: data.dataValues.email,
          user_name: data.dataValues.user_name,
          url: shortUrl,
        }
      
      
        res.render("profile", propObj)
        
      })
      //res.sendFile(path.join(__dirname, "../public/profile.html"));
    }
    
  });  

  //Trying to access profile page but not logged in
  app.get('/oops', function (req, res){
   res.sendFile(path.join(__dirname, "../public/oops1.html" ));

  })

  
  
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
      db.Provider.findOne({
        where: {
          id: req.session.user.id
        },
        include: [db.Property]
      
    }).then(function(data) {
      console.log(data) 
        var homey = {
          homeyProperties: data.Properties,
          name: data.dataValues.name,
          zipCode: data.dataValues.zipCode,
          dailyRate: data.dataValues.dailyRate
        }
        res.render("provider-profile", homey)
      })
    }
    
  });


};