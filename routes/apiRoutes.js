var db = require("../models");

async function teachToUsers(id) {
   let allTeach = await db.Teach.findAll({
                           where:{user_id: id}
                        });

   var myTeach = allTeach.map(e=>{return e.hobby_id});
   let teachTo = await db.Learn.findAll({
                          where: {hobby_id: myTeach}
                        })                                      
    return teachTo;
}

async function learnFromUsers(id) {
  let allLearn = await db.Learn.findAll({
                          where:{user_id: id}
                       });

  var myLearn = allLearn.map(e=>{return e.hobby_id});
  let learnFrom = await db.Teach.findAll({
                         where: {hobby_id: myLearn}
                       })
   return learnFrom;
}

async function createUser (req) {
  var output = {};

// Create a new user  
  let userData = await db.User.create({
    name: req.body.name,
    email: req.body.email,
    about_me: req.body.about_me
  });
  output.user = userData;
  var userId = userData.id;
// create multiple teaching skills
  let teachData = await db.Teach.bulkCreate(
      [
        {user_id: userId,
         hobby_id: req.body.hobby_id1,
         Description: req.body.desc_1 
        },
        {user_id: userId,
        hobby_id: req.body.hobby_id2,
        Description: req.body.desc_2 
        },
        {user_id: userId,
         hobby_id: req.body.hobby_id3,
         Description: req.body.desc_3 
        }
      ]
  );
  output.teach = teachData;

// create multiple learning needs 
  let learnData = await db.Learn.bulkCreate(
    [
      {user_id: userId,
       hobby_id: req.body.learn_id1,
       Description: req.body.learn_desc_1 
      },
      {user_id: userId,
      hobby_id: req.body.learn_id2,
      Description: req.body.learn_desc_2 
      },
      {user_id: userId,
       hobby_id: req.body.learn_id3,
       Description: req.body.learn_desc_3 
      }
    ]
);
output.learn = learnData;

// find who need to teach ==== teachTo
teachTo = await teachToUsers(userId); 
for (var i=0; i< teachTo.length; i++) {
  var obj = teachTo[i];
  let data = await db.User.findOne({ where: {id: obj.user_id}})
  obj.username = data.name;
}    
output.teachTo = teachTo;

// find who can I learn from ==== learnFrom
output.learnFrom = await learnFromUsers(userId); 
// output.learnFrom = "FFFFFFFF";

output['message'] = "CCCCCC"
output.teachTo[1]['message'] = "OOOOOOOO"

return output;
  
}


module.exports = function(app) {
  // Get all examples
  app.get("/api/hobbies", function(req, res) {
    db.Hobby.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  app.get("/api/users/:userid/skills", function(req, res) {
    db.Learn.findAll({
      where:{
        user_id: req.params.userid
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
//  
  app.get("/api/users/:userid/teachto", function(req, res) {
    db.Teach.findAll({
      where:{
        user_id: req.params.userid
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
  app.post("/api/users", async function (req,res) {
     let data = await createUser(req); 
     res.json(data);
  })

///////////////////////////////////////////////
//       var resultAll = {
//         user: result
//       };
//       var userId = result.id;
//       var arrObj = [
//         {user_id: userId,
//          hobby_id: req.body.hobby_id1,
//          Description: req.body.desc_1 
//         },
//         {user_id: userId,
//           hobby_id: req.body.hobby_id2,
//           Description: req.body.desc_2 
//          },
//          {user_id: userId,
//           hobby_id: req.body.hobby_id3,
//           Description: req.body.desc_3 
//          }
//       ];
//       var arrObjLearn = [
//         {user_id: userId,
//          hobby_id: req.body.learn_id1,
//          Description: req.body.learn_desc_1 
//         },
//         {user_id: userId,
//           hobby_id: req.body.learn_id2,
//           Description: req.body.learn_desc_2 
//          },
//          {user_id: userId,
//           hobby_id: req.body.learn_id3,
//           Description: req.body.learn_desc_3 
//          }
//       ]; 
//     })    

// // Add records to learns table and teaches table
//       db.Teach.bulkCreate(arrObj).then(function(resultTeach) {
//        resultAll.teach = resultTeach;
//        db.Learn.bulkCreate(arrObjLearn).then(function(resultLearn) {
//         resultAll.learn = resultLearn
//         // res.json(resultAll);
//        });
// // ///////////////////////////////////////////////////
// // Create a match jspn
// //
//      var match = {teachto: {}, learnfrom: {}};
    
//      db.Teach.findAll({
//       where:{
//         user_id: userId
//       }
//     }).then(function(data) {
//       var myTeach = data.map(e=>{return e.hobby_id})
//       db.Learn.findAll({
//         where: {
//           hobby_id: myTeach
//         }
//       }).then(function (resultTeachTo){
//         match.teachto = resultTeachTo;

//         db.Learn.findAll({
//           where:{
//             user_id: userId
//           }
//         }).then(function(data) {
//           var myLearn = data.map(e=>{return e.hobby_id});
//           db.Teach.findAll({
//             where: {
//               hobby_id: myLearn
//             }
//           }).then(function (resultLearnFrom){
//             match.learnfrom = resultLearnFrom;
//             res.json(match);
//           })  // end of db.Teach
//       }) ; // end of db.Learn

//       // res.json(data); 
//       });  
//     });
//   });
//////////////////////////////////////////////////////////
 // /api/users/:userid/skills for teach.html
 app.post("/api/users/:userid/skills", function(req, res) {
  var arrObj = [
    {user_id: req.params.userid,
     hobby_id: req.body.hobby_id1,
     Description: req.body.desc_1 
    },
    {user_id: req.params.userid,
      hobby_id: req.body.hobby_id2,
      Description: req.body.desc_2 
     },
     {user_id: req.params.userid,
      hobby_id: req.body.hobby_id3,
      Description: req.body.desc_3 
     }
  ];
  db.Teach.bulkCreate(arrObj).then(function(result) {
   res.json(result);
  });


});


 // /api/users/:userid/needs triggered by learn.html
 app.post("/api/users/:userid/needs", function(req, res) {
  var arrObj = [
    {user_id: req.params.userid,
     hobby_id: req.body.hobby_id1,
     Description: req.body.desc_1 
    },
    {user_id: req.params.userid,
      hobby_id: req.body.hobby_id2,
      Description: req.body.desc_2 
     },
     {user_id: req.params.userid,
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
