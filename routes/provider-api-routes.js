var db = require("../models"); 
var path = require("path");

module.exports = function (app) {

    //create new provider
    app.post("/api/providers", function(req, res){
        var token = "t" + Math.random(); 
        db.Provider.create({
            name: req.body.name, 
            pass: req.body.pass,
            zipCode: req.body.zipCode, 
            dailyRate: req.body.dailyRate, 
            token: token
        })
        .then(function(data){ 
            res.cookie("token", token, {maxAge:9999}); 
            req.session.user = data.dataValues; 
            res.json(req.session.user); 
        }).catch(function(err){
            console.log(err); 
            res.json(err); 
        });
    });

    //Provider login!
    app.post("/api/provider/login", function(req, res){
        
        db.Provider.findOne({
            where: {
                name: req.body.name, 
                pass: req.body.pass
            }
        }).then(function(data){
            console.log(data.dataValues);
            if (data){
                console.log("loged in"); 
                req.session.user = data.dataValues;
                //res.redirect("/profile");
                res.json(data.dataValues);
               
            } else {
                res.send("you suck")
            }
           
        }).catch(function(err){
            res.json(err);
        }); 
    }); 


};