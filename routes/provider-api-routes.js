var db = require("../models"); 
var path = require("path");

module.exports = function (app) {

    //create new provider
    app.post("/api/providers", function(req, res){
        var token = "t" + Math.random(); 
        console.log(req.body); 
        db.Provider.create({
            name: req.body.name, 
            zipCode: req.body.zipCode, 
            dailyRate: req.body.dailyRate, 
            token: token
        })
        .then(function(data){
            res.cookie("token", token, {maxAge:9999}); 
            req.session.user = data.dataValues; 
            req.json(req.session.user); 
        }).catch(function(err){
            console.log(err); 
            res.json(err); 
        });
    });

};