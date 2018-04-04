var db = require("../models"); 
var path = require("path");
var multer = require('multer');

var multerConf = {
    storage: multer.diskStorage({
        destination: function (req, file, next) {
            next(null, './public/homeyPics')
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

    //create new provider
    app.post("/api/providers", multer(multerConf).single('homeyavatar'), function(req, res){
        var token = "t" + Math.random(); 
        console.log(req);
        if (req.file) {
            console.log(req.file)
        }
        var shortUrl = req.file.path.replace("public", "");
        console.log(shortUrl);
        db.Provider.create({
            name: req.body.name, 
            pass: req.body.pass,
            zipCode: req.body.zipCode, 
            dailyRate: req.body.dailyRate, 
            url: shortUrl,
            token: token,
            email: req.body.email, 
            about: req.body.about,
            PhoneNo: req.body.PhoneNo,

        })
        .then(function(data){ 
            res.cookie("token", token, {maxAge:9999}); 
            req.session.user = data.dataValues; 
            res.redirect('/provider-profile');
        }).catch(function(err){
            res.redirect('/oops');
        });
    });

    //Provider login!
    app.post("/api/provider/login", function(req, res){
        console.log(req.body)
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
                res.render();
                res.json(data.dataValues);
               
            } else {
                res.send("you suck")
            }
           
        }).catch(function(err){
            res.json(err);
        }); 
    }); 


};