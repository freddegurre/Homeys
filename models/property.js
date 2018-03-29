//Property model will create a table in db with: propName and address, and will be associated with the Owner model

module.exports = function (sequelize, DataTypes) {
    var Property = sequelize.define('Property', {
        propName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 30],
                msg: 'Please enter a valid property name'
            },
            unique: {
                args: true,
                msg: 'Email address already in use!'
            }
        },
        streetAddress : {
            type: DataTypes.STRING, 
            allowNull: false,
            validate: {
                len: [3, 30],
                msg: 'Please enter a valid street name.'
            },
            
        },
        zipCode: {
            type: DataTypes.INTEGER, 
            allowNull: false,
            validate: {
                len: [5, 10],
                msg: 'Please enter a valid zip code.'
            },
            
        },
        city: {
            type: DataTypes.STRING, 
            allowNull: false,
            validate: {
                len: [3, 25],
                msg: 'Please enter a valid city.'
            },
          
        },
        state: {
            type: DataTypes.STRING, 
            allowNull: false,
            validate: {
                len: [4, 20],
                msg: 'Please enter a valid city.'
            },
        }
    });

    Property.associate = function(models) {
        Property.belongsTo(models.Owner, {
            foreignKey: {
                allowNull: false
            }
        })
    };

    Property.associate = function(models) {
        Property.belongsTo(models.Provider, {
            foreignKey: {
                allowNull: true
            }
        })
    }

    return Property;
}
