//Routes for viewing property info
var db = require("../models");
var path = require("path");
var geocoder = require('google-geocoder');
var geodist = require('geodist')

var geo = geocoder({
    key: 'AIzaSyConfTJBxXd2JOwcungPSU_4XS-e4CrS24'
});


module.exports = function (app) {

    //View all properties in DB 
    app.get('/api/properties', function (req, res) {
        db.Property.findAll({}).then(function (data) {
            res.json(data)
        });
    });

    //Create a new property
    app.post("/api/properties", function (req, res) {
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
    app.put('/api/property/:id', function (req, res) {
        db.Property.update(req.body,{
            where: {
                id: req.params.id
            }
            }).then(function(data){
                res.json(data)
            })
    });

    //Delete a property
    app.delete('/api/properties/:id', function (req, res) {
        console.log(req.params.id)
        db.Property.destroy ({
            where: {
                id: req.params.id
            }
        }).then(function (data) {
            res.json(data);
        })
    });

    var proplat;
    var proplng;
    var lat;
    var lng;
    var houseLocation = {};
    var sitterLocation = {};
    var dist=0;
    var closest = 1000;
    var closestSitter;
    

    //Find sitter
    app.get('/find-homey', function (req, res) {
        //Get house zip code to lat/long
        var propZip = 93109;
        geo.find(propZip, function (err, result) {
            proplat = result[0].location.lat;
            proplng = result[0].location.lat;
            houseLocation = { lat: proplat, long: proplng }
            console.log("here it is for the house lat " + proplat + "and long:  " + proplng)
        });

        //Get sitter zip codes and turn them to lat.long
        db.Provider.findAll({}).then(function (data) {
            //res.send(data);
            //convert zipCodes to latitude longitude for all sitters
            var zipCodes = [];
         
            
            for (i = 0; i < data.length; i++) {

                //get lat/long of sitter
                geo.find(data[i].zipCode, function (err, result) {
                    
                    lat = result[0].location.lat;
                    lng = result[0].location.lat;
                    console.log(`sitter lat is ${lat}`);
                    console.log(`sitter lng is ${lng}`);
                    sitterLocation = { lat: lat, long: lng }

                    //Calculate distance between sitter and house
                    dist = geodist(houseLocation, sitterLocation)
                    console.log(dist);

                    //Determine which sitter is closet to the home
                    if (dist < closest) {
                        closest = dist;
                        //closestSitter = data[i].dataValues.name;
                        //console.log(`the cloeset one is ${closestSitter}`);
                    }; 
                });  
                
            };
            
            console.log(closest);
            


            res.end();

        }).then(function (data) {



        })

    })

    //Get one property a property
    app.get('/api/properties/:id', function (req, res) {
        db.Property.findOne ({
            where: {
                id: req.params.id
            }
        }).then(function(data){
            res.json(data);
        }); 
    })

}





