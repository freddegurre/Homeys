module.exports = function(sequelize, DataTypes) {
    var Owner = sequelize.define("Owner", {
        email: {
            type: DataTypes.STRING,
            notEmpty: true,
            validate: {
                isEmail: true,

            }
        }, 
        password: {
            type: DataTypes.STRING, 
            notEmpty: true,
            validate: {
                len: [6] 
            }
        }, 
        

    });  
}