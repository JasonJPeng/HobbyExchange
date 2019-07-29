module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("User", {
    name: DataTypes.STRING,
    aboiutMe: DataTypes.TEXT
  });
  return Example;
};
