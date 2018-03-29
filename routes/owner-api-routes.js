var db = require("../models"); 
var path = require("path");

module.exports = function(app){

    //get all owners in DB. 
    app.get("/api/owners", function (req, res){
        db.Owner.findAll({}).then(function(data){
            res.json(data); 
        });
    });

    //get owner by id and return json. 
    app.get("/api/owners/:id", function(req, res){
        db.Owner.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Property]
        }).then(function(data){
            res.json(data); 
        });
    });

    //Create new owner
    app.post("/api/owners", function (req, res){
        console.log(req.body); 

        if(!req.body.user_name || !req.body.password){
            res.status("400");
            res.send("Invalid details!");
         } else {
            db.Owner.findAll({email: req.body.email}).then(function(data){
                res.json("user already exists", data);
            });
            db.Owner.create({
                email: req.body.email, 
                user_name: req.body.user_name, 
                pass: req.body.pass
            }).then(function(data){
                req.session.user = data;
                res.json("userCreated", data); 
            }).catch(function(err){
                res.json(err);
            }); 
           
         }
      
        
    });
    //Login route 
    app.post("/api/login", function(req, res){
        console.log(req.body.us); 
        
        db.Owner.findOne({
            where: {
                user_name: req.body.user_name, 
                pass: req.body.pass
            }
        }).then(function(data){
            
            if (data){
               res.json(data);
            } else {
                res.send("you suck")
            }
           
        }).catch(function(err){
            res.json(err);
        }); 
    }); 
    // delete owner 
    app.delete("/api/owners/:id", function(req, res){
        db.Owner.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(data){
            res.json(data); 
        })
    }); 

}; 