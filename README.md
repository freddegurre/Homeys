# Homeys
#### Peace of Mind with help from your neighbors
Homeys is a Full stack web application where home owners and house sitters can meet. The application is built on MVC standars and Rest API.  HTML/CSS Javascript/jQuery, Handlebars, Node.js, Express, Sequelize And MySql together with more dependencies

### Two types of users
* Property Owner 
* Property Sitter 

### Property Owner 
Once a property owner has registered their profile. They need to register one or more properties in order to benifit from the application. When they regiser a property they can chose to find a house sitter, and book them to look after their house. They will get name, picture, phone, adress and daily price for the house sitter. 

### House sitter
A house sitter is someone that will look after the owners Property and do specified tasks requested by the owner. They register a prfile and give a breif description about themselves and their daily price. At that moment any house owner can book them to look after their house Easy as that. 

The application is hosted on Heroku, here is a link Homeys! [Homeys!](https://homeys.herokuapp.com/)

### DB
The database is a simple MySql with Three tables. **Owners** **Properties** **Providers** Owners and providers can have mutiple Properties, but Properties can only have one Owner & provider. 


### dependencies
                "dependencies": {
                    "body-parser": "^1.18.2",
                    "cookie-parser": "^1.4.3",
                    "express": "^4.16.3",
                    "express-handlebars": "^3.0.0",
                    "express-session": "^1.15.6",
                    "geocoder": "^0.2.3",
                    "geodist": "^0.2.1",
                    "geolib": "^2.0.24",
                    "google-geocoder": "^0.2.1",
                    "multer": "^1.3.0",
                    "mysql2": "^1.5.3",
                    "path": "^0.12.7",
                    "save": "^2.3.2",
                    "sequelize": "^4.37.4"
                }

###### Bianca Torres, Daniel Lawrence, Daniel Bulbulian-Baxter, Fredrik Gustafson

:poop:
