//Routes for viewing property info
var db = require("../models"); 
var path = require("path");

module.exports = function (app) {

    //View all properties in DB 
    app.get('/api/properties', function (req, res) {
        db.Property.findAll({}).then(function (data) {
            res.json(data)
        });
    });

    //Create a new property
    app.post("/api/properties", function (req, res) {
        console.log(req.body);
        console.log(req.session.user.id); 
       db.Property.create({
            propName: req.body.propName,
            streetAddress: req.body.streetAddress,
            zipCode: req.body.zipCode,
            city: req.body.city,
            state: req.body.state,
            OwnerId: req.session.user.id
        })
        .then(function (data) {
            res.json(data);
        }).catch(function (err) {
            res.json(err);
            console.log(err); 
        });
    });

    //Update a property
    app.put('/api/property', function (req, res) {
        dp.Property.update(
            req.body,
            {
                where: {
                    id: req.body.ud
                }
            }).then(function(data){
                res.json(data)
            })
    });

    //Delete a property
    app.delete('/api/properties/:id', function (req, res) {
        db.Property.destroy ({
            where: {
                id: req.params.id
            }
        }).then(function(data){
            res.json(data);
        })
    })

}



