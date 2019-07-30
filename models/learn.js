module.exports = function(sequelize, DataTypes) {
    var Example = sequelize.define("Learn", {
      user_id: DataTypes.INTEGER,
      hobby_id: DataTypes.INTEGER,
      Description: DataTypes.TEXT
    });
    return Example;
  };
  