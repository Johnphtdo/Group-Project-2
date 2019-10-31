module.exports = function(sequelize, DataTypes) {
    var Recipe = sequelize.define("Recipe", {
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      recipe_name: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      ingredients: {
        type: DataTypes.STRING(400),
        allowNull: false,
      }, 
      instructions: {
        type: DataTypes.STRING(1200),
        allowNull: false,
      },
      cook_time: {
       type: DataTypes.INTEGER,
       allowNull: false,
      }, 
      prep_time: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    });
    return Recipe;
  };