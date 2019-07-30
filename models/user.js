module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("User", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    photo_url: DataTypes.STRING,
    about_me: DataTypes.TEXT
  });
  return Example;
};

