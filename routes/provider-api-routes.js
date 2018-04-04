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
        db.Provider.create({
            name: req.body.name, 
            pass: req.body.pass,
            zipCode: req.body.zipCode, 
            dailyRate: req.body.dailyRate, 
            url: req.file.path,
            token: token
        })
        .then(function(data){ 
            res.cookie("token", token, {maxAge:9999}); 
            req.session.user = data.dataValues; 
            res.send('Congrats you are a homey now!');
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