module.exports = function(sequelize, DataTypes) {
    var Owner = sequelize.define("Owner", {
        email: {
            type: DataTypes.STRING,
            validate: {
              isEmail:true
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
                msg: 'Name is use!'
            }
        }, 
        pass: {
            type: DataTypes.STRING,
            validate: {
                len: [1, 100]
            },
        }, 
    });
    return Owner; 
};
