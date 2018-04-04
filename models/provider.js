//Provider model creates a table id db where info about the home sitters will be stored. 
//Name, zip code, and amount charged

module.exports = function (sequelize, DataTypes ) {
    var Provider = sequelize.define("Provider", {
        name : {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 30],
            },
            unique: {
                args: true,
                msg: 'Name already in use!'
            },
        },
        pass: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6, 20]
            }
        },
        zipCode: {
            type: DataTypes.INTEGER, 
            allowNull: false,
            validate: {
                len: [3, 10],
            }
        },
        dailyRate: {
            type: DataTypes.INTEGER, 
            allowNull: false,
            validate: {
                len: [1, 5],
            }
        }, 
        token: {
            type: DataTypes.STRING,
            allowNull: false
        },
        url: {
            type: DataTypes.TEXT
          }
    });

    Provider.associate = function (models) {
        Provider.hasMany(models.Property, {
            onDelete: "cascade",
            
        });
    }

    return Provider
};