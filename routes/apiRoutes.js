var db = require("../models");

function sortMatch(arrObj) {
    var sortedArr = [];
    arrObj.forEach(function(e){
      var obj = sortedArr.find(x => {
         if (x.user_id === e.user_id) {
           return x;
         }
        })
      if (obj === undefined ) {
        sortedArr.push( {
          user_id: e.user_id,
          teach: [{
              id: e.teach_id,
              name: e.teach_subject,
              desc: e.teach_info
          }],
          learn: [{
              id: e.learn_id,
              name: e.learn_subject,
              desc: e.learn_info 
          }]
        })  
      } else {
        if (obj.teach.find(x=> x.id === e.teach_id) === undefined ) {
          obj.teach.push({
            id: e.teach_id,
            name: e.teach_subject,
            desc: e.teach_info
          })
       }
       if (obj.learn.find(x=> x.id === e.learn_id) === undefined ) {
        obj.learn.push({
          id: e.learn_id,
          name: e.learn_subject,
          desc: e.learn_info 
        })
       }
      }  
    } )

     return sortedArr;
}

async function findHobby(id) {
  return new Promise((resolve, reject) => {
    db.Hobby.findAll({
      where: { id: id }
    }).then(function (data) {
      resolve(data[0].name);
    })
  })
}

async function findUser(id) {
  return new Promise((resolve, reject) => {
    db.User.findAll({
      where: {id:id}
    }).then(function(data){
      resolve(data[0]);
    })
  })
}

async function getMatchData(elementT, elementL) {
  console.log('getMatchData');
  return new Promise(async (resolve, reject) => {
    let teach_subject = await findHobby(elementT.hobby_id);
    let learn_subject = await findHobby(elementL.hobby_id);
    let user_obj = await findUser(elementT.user_id);
    let obj = {
      user_id: elementT.user_id,
      user_name: user_obj.name,
      user_about: user_obj.about_me,
      user_photo: user_obj.photo_url,
      user_email: user_obj.email,
      teach_id: elementT.hobby_id,
      teach_subject: teach_subject,
      teach_info: elementT.Description,
      learn_id: elementL.hobby_id,
      learn_subject: learn_subject,
      learn_info: elementL.Description
    };
    resolve(obj)
  })

}

async function findMatch(teachTo, learnFrom) {

  return new Promise(async (resolve, reject) => {
    let temp = [];
    for (var i = 0; i < teachTo.length; i++) {
      for (var j = 0; j < learnFrom.length; j++) {
        if (teachTo[i].user_id === learnFrom[j].user_id) {
          temp.push(getMatchData(teachTo[i], learnFrom[j]));
        }
      }     
    }
    Promise.all(temp).then(data => {
      resolve(data);
    })
  });// end of promise
}




async function teachToUsers(id) {
  let allTeach = await db.Teach.findAll({
    where: { user_id: id }
  });

  var myTeach = allTeach.map(e => { return e.hobby_id });
  let teachTo = await db.Learn.findAll({
    where: { hobby_id: myTeach }
  })

  return teachTo;
}

async function learnFromUsers(id) {
  let allLearn = await db.Learn.findAll({
    where: { user_id: id }
  });

  var myLearn = allLearn.map(e => { return e.hobby_id });
  let learnFrom = await db.Teach.findAll({
    where: { hobby_id: myLearn }
  })
  return learnFrom;
}

async function createUser(req) {
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
      {
        user_id: userId,
        hobby_id: req.body.hobby_id1,
        Description: req.body.desc_1
      },
      {
        user_id: userId,
        hobby_id: req.body.hobby_id2,
        Description: req.body.desc_2
      },
      {
        user_id: userId,
        hobby_id: req.body.hobby_id3,
        Description: req.body.desc_3
      }
    ]
  );
  output.teach = teachData;

  // create multiple learning needs 
  let learnData = await db.Learn.bulkCreate(
    [
      {
        user_id: userId,
        hobby_id: req.body.learn_id1,
        Description: req.body.learn_desc_1
      },
      {
        user_id: userId,
        hobby_id: req.body.learn_id2,
        Description: req.body.learn_desc_2
      },
      {
        user_id: userId,
        hobby_id: req.body.learn_id3,
        Description: req.body.learn_desc_3
      }
    ]
  );
  output.learn = learnData;

  // find who need to teach ==== teachTo
  teachTo = await teachToUsers(userId);

  output.teachTo = teachTo;

  // find who can I learn from ==== learnFrom
  output.learnFrom = await learnFromUsers(userId);

  output.match = await findMatch(output.teachTo, output.learnFrom);

  output.sortedMatch = sortMatch(output.match)


  return output;

}


module.exports = function (app) {
  // Get all examples
  app.get("/api/hobbies", function (req, res) {
    db.Hobby.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  app.get("/api/users/:userid/skills", function (req, res) {
    db.Learn.findAll({
      where: {
        user_id: req.params.userid
      }
    }).then(function (data) {
      var myLearn = data.map(e => { return e.hobby_id })
      db.Teach.findAll({
        where: {
          hobby_id: myLearn
        }
      }).then(function (result) {

        res.json(result);
      })

      // res.json(data);
    });
  });
  //  
  app.get("/api/users/:userid/teachto", function (req, res) {
    db.Teach.findAll({
      where: {
        user_id: req.params.userid
      }
    }).then(function (data) {
      var myTeach = data.map(e => { return e.hobby_id })
      db.Learn.findAll({
        where: {
          hobby_id: myTeach
        }
      }).then(function (result) {

        res.json(result);
      })

      // res.json(data);
    });
  });


  // Create a new example
  app.post("/api/users", async function (req, res) {
    let data = await createUser(req);
    res.json(data);
  })

  // /api/users/:userid/skills for teach.html
  app.post("/api/users/:userid/skills", function (req, res) {
    var arrObj = [
      {
        user_id: req.params.userid,
        hobby_id: req.body.hobby_id1,
        Description: req.body.desc_1
      },
      {
        user_id: req.params.userid,
        hobby_id: req.body.hobby_id2,
        Description: req.body.desc_2
      },
      {
        user_id: req.params.userid,
        hobby_id: req.body.hobby_id3,
        Description: req.body.desc_3
      }
    ];
    db.Teach.bulkCreate(arrObj).then(function (result) {
      res.json(result);
    });


  });


  // /api/users/:userid/needs triggered by learn.html
  app.post("/api/users/:userid/needs", function (req, res) {
    var arrObj = [
      {
        user_id: req.params.userid,
        hobby_id: req.body.hobby_id1,
        Description: req.body.desc_1
      },
      {
        user_id: req.params.userid,
        hobby_id: req.body.hobby_id2,
        Description: req.body.desc_2
      },
      {
        user_id: req.params.userid,
        hobby_id: req.body.hobby_id3,
        Description: req.body.desc_3
      }
    ];
    db.Learn.bulkCreate(arrObj).then(function (result) {
      res.json(result);
    });

  });



  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });
};
