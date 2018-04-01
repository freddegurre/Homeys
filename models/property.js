//Property model will create a table in db with: propName and address, and will be associated with the Owner model

module.exports = function (sequelize, DataTypes) {
    var Property = sequelize.define('Property', {
        propName: {
            type: DataTypes.STRING,
            notNull: true,
            validate: {
                len: [3, 30],
                //msg: 'House already in database!'
            },
        },
        streetAddress : {
            type: DataTypes.STRING, 
            notNull: true,
            validate: {
                len: [3, 30],
                //msg: 'Please enter a valid street name.'
            },
            
        },
        zipCode: {
            type: DataTypes.INTEGER, 
            notNull: true,
            validate: {
                len: [1, 10],
               // msg: 'Please enter a valid zip code.'
            },
            
        },
        city: {
            type: DataTypes.STRING, 
            notNull: true,
            validate: {
                len: [1, 25],
                //msg: 'Please enter a valid city.'
            },
          
        },
        state: {
            type: DataTypes.STRING, 
            allowNull: false,
            validate: {
                len: [1, 20],
                //msg: 'Please enter a valid state.'
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
