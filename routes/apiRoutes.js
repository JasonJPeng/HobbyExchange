var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/hobbies", function(req, res) {
    db.Hobby.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  app.get("/api/learnFrom/:userId", function(req, res) {
    db.Learn.findAll({
      where:{
        user_id: req.params.userId
      }
    }).then(function(data) {
      var myLearn = data.map(e=>{return e.hobby_id})
      db.Teach.findAll({
        where: {
          hobby_id: myLearn
        }
      }).then(function (result){

        res.json(result);
      })

      // res.json(data);
    });
  });

  app.get("/api/teachTo/:userId", function(req, res) {
    db.Teach.findAll({
      where:{
        user_id: req.params.userId
      }
    }).then(function(data) {
      var myTeach = data.map(e=>{return e.hobby_id})
      db.Learn.findAll({
        where: {
          hobby_id: myTeach
        }
      }).then(function (result){

        res.json(result);
      })

      // res.json(data);
    });
  });


  // Create a new example
  app.post("/api/user", function(req, res) {
    db.User.create(req.body).then(function(result) {
      res.json(result);
    });
  });

 // Create a new example
 app.post("/api/:user/teach", function(req, res) {
  var arrObj = [
    {user_id: req.params.user,
     hobby_id: req.body.hobby_id1,
     Description: req.body.desc_1 
    },
    {user_id: req.params.user,
      hobby_id: req.body.hobby_id2,
      Description: req.body.desc_2 
     },
     {user_id: req.params.user,
      hobby_id: req.body.hobby_id3,
      Description: req.body.desc_3 
     }
  ];
  db.Teach.bulkCreate(arrObj).then(function(result) {
   res.json(result);
  });

});


 // Create a new example
 app.post("/api/:user/learn", function(req, res) {
  var arrObj = [
    {user_id: req.params.user,
     hobby_id: req.body.hobby_id1,
     Description: req.body.desc_1 
    },
    {user_id: req.params.user,
      hobby_id: req.body.hobby_id2,
      Description: req.body.desc_2 
     },
     {user_id: req.params.user,
      hobby_id: req.body.hobby_id3,
      Description: req.body.desc_3 
     }
  ];
  db.Learn.bulkCreate(arrObj).then(function(result) {
   res.json(result);
  });

});



  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
