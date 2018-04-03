//Routes for viewing property info
var db = require("../models");
var path = require("path");
var geocoder = require('google-geocoder');
var geodist = require('geodist')
var multer = require('multer');

var multerConf = {
    storage: multer.diskStorage({
        destination: function (req, file, next) {
            next(null, './public/propPhotos')
        },
        filename: function (req, file, next) {
            //console.log(file);
            const ext = file.mimetype.split('/')[1];
            next(null, file.fieldname + "-" + Date.now() + "." + ext)
        }
    }),
    fileFilter: function (req, file, next) {
        if (!file) {
            next();
        }
        const image = file.mimetype.startsWith('image/');
        if (image) {
            next(null, true);
        } else {
            next({ message: "file type not supported" }, false)
        }
    }
}

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
    app.post("/api/properties", multer(multerConf).array('homePics', 3), function (req, res) {
        //console.log(req.files); 
       var shorturlpaths = [];
        for (i=0 ;i<req.files.length; i++) {
            shorturlpaths.push(req.files[i].path.replace('public',""));  
        };
        db.Property.create({
            propName: req.body.propName,
            streetAddress: req.body.streetAddress,
            zipCode: req.body.zipCode,
            city: req.body.city,
            state: req.body.state,
            OwnerId: req.session.user.id, 
            pic1: shorturlpaths[0],
            pic2: shorturlpaths[1],
            pic3: shorturlpaths[2],
        })
            .then(function (data) {
                //res.json(data);
                res.redirect("/profile")
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
    var dist = 0;
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
        });

        //Get sitter zip codes and turn them to lat.long
        db.Provider.findAll({}).then(function (data) {
            var numberOfSitters = data.length;
            console.log(data.length);
            var counter = 0

            findClosest();

            function findClosest () {
                //get lat/long of sitter
                geo.find(data[counter].zipCode, function (err, result, callback) {
                    console.log('geocode happening now')
                    lat = result[0].location.lat;
                    lng = result[0].location.lat;
                    sitterLocation = { lat: lat, long: lng };

                    //Calculate distance between sitter and house
                    dist = geodist(houseLocation, sitterLocation);

                    //Determine which sitter is closet to the home
                    if (dist < closest) {
                        console.log('distance ranking happening now');
                        closest = dist;
                        closestSitter = data[counter];
                        console.log(`the new distance to beat is ${closest}`);
                        console.log(`the new sitter is ${JSON.stringify(closestSitter)}`);
                    };
                    counter ++;
                    console.log('counter has been updated to: '+counter)
                    if (counter < numberOfSitters) {
                        findClosest();
                    } else if (counter >= numberOfSitters) {
                        counter = 0;
                    }
                });
            };  
                        
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





