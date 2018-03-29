//Property model will create a table in db with: propName and address, and will be associated with the Owner model

module.exports = function (sequelize, DataTypes) {
    var Property = sequelize.define('Property', {
        propName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 30]
            },
            unique: {
                args: true,
                msg: 'Please enter a valid property name'
            }
        },
        streetAddress : {
            type: DataTypes.STRING, 
            allowNull: false,
            validate: {
                len: [3, 30]
            },
            unique: {
                args: true,
                msg: 'Please enter a valid street name.'
            }
        },
        zipCode: {
            type: DataTypes.INTEGER, 
            allowNull: false,
            validate: {
                len: [5, 10]
            },
            unique: {
                args: true,
                msg: 'Please enter a valid zip code.'
            }
        },
        city: {
            type: DataTypes.STRING, 
            allowNull: false,
            validate: {
                len: [3, 25]
            },
            unique: {
                args: true,
                msg: 'Please enter a valid city.'
            }
        },
        state: {
            type: DataTypes.STRING, 
            allowNull: false,
            validate: {
                len: [4, 20]
            },
            unique: {
                args: true,
                msg: 'Please enter a valid city.'
            }
        }
    });

    Post.associate = function(models) {
        Post.belongsToMany(models.Owner, {
            through: 'properties2owner'
        })
    }

    return Property;
}
