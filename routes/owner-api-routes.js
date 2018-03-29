var db = require("../models"); 

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
            }
        }).then(function(data){
            res.json(data); 
        });
    }); 

    //Create new owner
    app.post("/api/owners", function (req, res){
        console.log(req.body); 
        db.Owner.create({
            email: req.body.email, 
            user_name: req.body.user_name, 
            pass: req.body.pass
        }).then(function(data){
            res.json(data); 
        }).catch(function(err){
            res.json(error);
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