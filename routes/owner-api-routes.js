var db = require("../models");
var path = require("path");
var multer = require('multer');

var multerConf = {
    storage: multer.diskStorage({
        destination: function (req, file, next) {
            next(null, './public/uploads')
        },
        filename: function (req, file, next) {
            console.log(file);
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


module.exports = function (app) {

    //get all owners in DB. 
    /*app.get("/api/owners", function (req, res){
            db.Owner.findAll({}).then(function(data){
                res.json(data); 
                var id = req.session.user
                console.log("id" + JSON.stringify(id)); 
            });
        });*/

    //get owner by id and return json. 
    app.get("/api/owners/", function (req, res) {
        db.Owner.findOne({
            where: {
                id: req.session.user.id
            },
            include: [db.Property]
        }).then(function (data) {
            res.json(data.dataValues);
        });
    });


    //Create new owner
    app.post("/api/owners", multer(multerConf).single('avatar'), function (req, res) {
        //console.log(req.body); 
        var token = "t " + Math.random();
        console.log(req);
        if (req.file) {
            console.log(req.file)
        }
        db.Owner.create({
            email: req.body.email,
            user_name: req.body.user_name,
            pass: req.body.pass,
            url: req.file.path, 
            token: token
        })
            .then(function (data) {
                //console.log(data.dataValues)
                res.cookie("token", token, { maxAge: 9999 })
                req.session.user = data.dataValues;
                res.redirect('/profile')
                
            }).catch(function (err) {
                res.json(err);
            })





    });
    //Login route 
    app.post("/api/login", function (req, res) {

        db.Owner.findOne({
            where: {
                user_name: req.body.user_name,
                pass: req.body.pass
            }
        }).then(function (data) {
            console.log(data.dataValues);
            if (data) {
                console.log("loged in");
                req.session.user = data.dataValues;
                //res.redirect("/profile");
                res.json(data.dataValues);

            } else {
                res.send("you suck")
            }

        }).catch(function (err) {
            res.json(err);
        });
    });

    //LOGOUT of Owner Profile. Destroy session!
    app.get('/bye', function (req, res) {
        console.log("logout clicked");
        req.session.destroy(function(err) {
            if (err) {
                console.log(err)
            } else {
                console.log(req.end);
                res.redirect('/')
            };
        });
    });

    // delete owner 
    app.delete("/api/owners/:id", function (req, res) {
        db.Owner.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (data) {
            res.json(data);
        })
    });

}; 