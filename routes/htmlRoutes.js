var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.sendFile(index.html)
    // db.Example.findAll({}).then(function(dbExamples) {
    //   res.render("index", {
    //     msg: "Welcome!",
    //     examples: dbExamples
    //   });
    // });
  });

  // Load example page and pass in an example by id

  // Use handle Bars
  // app.get("/api/users/:id", function(req, res) {
  //   db.User.findOne({ where: { id: req.params.id } }).then(function(userData) {
  //     res.render("user", {
  //       all: userData
  //     });
  //   });
  // });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
