module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1]
        }
      }
     
    });
    return Users;
  };