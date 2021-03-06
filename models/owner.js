module.exports = function(sequelize, DataTypes) {
    var Owner = sequelize.define("Owner", {
        email: {
            type: DataTypes.STRING,
            validate:{
               isEmail: true, 
            },
            unique: {
                args: true,
                msg: 'Email address already in use!'
            }
        },
        user_name: {
            type: DataTypes.STRING,
            notNull: true,
            validate: {
                len: [1, 100]
            },
            unique: {
                args: true,
                msg: 'Name in use!'
            }
        }, 
        pass: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6, 20]
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

    Owner.associate = function (models) {
        Owner.hasMany(models.Property, {
            onDelete: "cascade"
        });
    }
    return Owner; 
};
