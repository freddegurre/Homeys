//Provider model creates a table id db where info about the home sitters will be stored. 
//Name, zip code, and amount charged

module.exports = function (sequelize, DataTypes ) {
    var Provider = sequelize.define("Provider", {
        name : {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 30],
                msg: 'Please enter a valid name'
            },
        },
        zipCode: {
            type: DataTypes.INTEGER, 
            allowNull: false,
            validate: {
                len: [5, 10],
                msg: 'Please enter a valid zip code.'
            }
        },
        dailyRate: {
            type: DataTypes.INTEGER, 
            allowNull: false,
            validate: {
                len: [1, 5],
                msg: 'Please enter a valid dollar amount.'
            }
        }
    });
    Provider.associate = function(models) {
        Provider.belongsToMany(models.Property, {
            through: 'providers2property'
        })
    };
    return Provider
};