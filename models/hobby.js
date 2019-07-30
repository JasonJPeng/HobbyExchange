module.exports = function(sequelize, DataTypes) {
    var Example = sequelize.define("Hobby", {
      name: DataTypes.STRING
    });
    return Example;
  };
  