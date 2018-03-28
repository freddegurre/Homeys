module.exports = function(sequelize, DataTypes) {
    var Owner = sequelize.define("Owner", {
        email: {
            type: DataTypes.STRING, 
            isEmail: true, 
            notEmpty: true
        }, 

    });  
}