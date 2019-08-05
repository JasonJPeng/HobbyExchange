var myId = "";
var hobbies = [2,3,4];

$(document).ready(function() { //  Beginning of jQuery
    // alert("hhh");
   $.ajax({
       type: "GET",
       url: "api/hobbies"
   }).then(function(data) {
       hobbies = data;
       data.forEach(function(e){
           opt = `<option value="${e.id}" >${e.name}</option>`;
           $(".HobbyList").append(opt);
// for admin.html
           htmlCode = `<li>(${e.id})  ${e.name}</li>`;
           $("#HobbyList").append(htmlCode);

       })
      
   })
  
   $.ajax({
     type: "GET",
     url: "api/users"
   }).then(function(data) {

    var numDisplay = Math.min(20, data.length)

        shuffle(data);
       for(var i=0; i<numDisplay; i++) {
           var htmlCode = `
              <img src="${data[i].photo_url}" height="75">
           `;
           $("#groupImg").append(htmlCode);
       }

       console.log(data);
   })    
   


   $("#login").on("click", function (event) {
    event.preventDefault();
     myId = $("#username").val().trim();

     $("#displayme").hide();
    $.get("api/users/" + myId).then(function(data){
        showUserInfo(data);
    })

    $.get("api/users/" + myId + "/skills").then(function(teachData){
        var out = teachData.map(x=> hobbies.find(a=> a.id === x.hobby_id).name);
        var hobbyList = $("<ul>");
        out.forEach(function(e){
            hobbyList.append($("<li>").html(e));
        })
        $("#teach").html("I can teach").append(hobbyList);
        console.log("teach=====>  ", out);
    })
    $.get("api/users/" + myId + "/needs").then(function(learnData){
        var out = learnData.map(x=> hobbies.find(a=> a.id === x.hobby_id).name)
        var hobbyList = $("<ul>");
        out.forEach(function(e){
            hobbyList.append($("<li>").html(e));
        })
        $("#learn").html("I want to learn").append(hobbyList);
        
        console.log("Learn =====> ", out);
    })

   }) 

$(document).on("click", "#FindMatch", function (event) {
    event.preventDefault();
    if (myId === "") {
     id = $("#user-id").val().trim();
    } else {
       id = myId; 
    }
    $("#info").show();
    $("#myinfo").hide();
    $("#skillset").hide();
    $("#MatchedResults").text("");
    $.get("api/users/" + id + "/match").then(function(data){
        displayMatches(data);
    })
})   

   $("#submit").on("click", function (event) {
    event.preventDefault();

    var user = {
        name: $("#user-name").val().trim(),
        about_me: $("#user-description").val().trim(),
        email: $("#user-email").val().trim(),
        photo_url: $("#user-photo").val().trim(),
        teach_id1: $("select[name='teach-subject-1']" ).val().trim(),
        teach_id2: $("select[name='teach-subject-2']" ).val().trim(),
        teach_id3: $("select[name='teach-subject-3']" ).val().trim(),
        learn_id1: $("select[name='learn-subject-1']" ).val().trim(),
        learn_id2: $("select[name='learn-subject-2']" ).val().trim(),
        learn_id3: $("select[name='learn-subject-3']" ).val().trim(),
        desc_1: $("input[name='qualification-1']" ).val().trim(),
        desc_2: $("input[name='qualification-2']" ).val().trim(),
        desc_3: $("input[name='qualification-3']" ).val().trim()
      };
      console.log(user);
      $.post("/api/users", user).then(function (data) {
          displayMatches(data.sortedMatch);
          alert("Keep your ID <"+  data.user.id + "> for future match. ");
        console.log(data);
      })    
        
   })  // end of submit
})  
// ==============================================================
   function displayMatches(arrObj) {
       if (arrObj.length === 0) {// no matches
        $("#MatchedResults").html("<h2>No Matches</h2>");
           return;
       }

       arrObj.forEach(function(e){
       if (e.teach.length > 1) {    
         teach = e.teach.reduce( (a,b)=>a.name + ", " + b.name);
       } else {
         teach = e.teach[0].name;  
       }
       if (e.learn.length > 1) {
         learn = e.learn.reduce( (a,b)=>a.name + ", " + b.name);
         qualification = e.learn.reduce( (a,b)=> a.desc + "<br>" + b.desc)
       } else {
          learn = e.learn[0].name;
          qualification = e.learn[0].desc
       }

    var htmlCode = `

                      
    <div class="form-row">
            <div class="name">${e.user_name}</div>
            <div class="value">
                <div class="input-group">
                <img src="${e.user_photo}" height="200">
                </div>
            </div>
        </div>
    <div class="form-row">
            <div class="name">Contact ${e.user_name}</div>
            <div class="value">
                <div class="input-group">
                    ${e.user_about} <br> e-mail: ${e.user_email}
                </div>
            </div>
        </div>
        
        <div class="form-row">
            <div class="name">Teach ${e.user_name}</div>
            <div class="value">
                <div class="input-group">
                    ${teach}
                </div>
            </div>
        </div>

        <div class="form-row">
            <div class="name">${e.user_name} can teach</div>
            <div class="value"> 
                <div class="input-group">
                    ${learn}
                </div>
            </div>
        </div>
        
        <div class="form-row">
            <div class="name">${e.user_name}'s Qualification</div>
            <div class="value">
                <div class="input-group">
                    ${qualification}
                </div>
            </div>
        </div>
        
        
        <hr>
        <hr>

    `
       

        $("#MatchedResults").append(htmlCode);
        // matches.append(htmlCode);

       });
    //    $("#MatchedResults").append(matches);
   }

   function showUserInfo(data){

    var htmlCode = `
    <img src="${data.photo_url}" height="200">
    <p>${data.name}</p>
    <p>${data.about_me}</p>
    <p>${data.email}</p>

    <div>
            <input id="user-id">
            <button class="btn btn--radius-2 btn--red" id="FindMatch">Find My Matches</button>
        </div>
    
    
    `
    $("#myinfo").append(htmlCode);
      
       console.log(data);
   }


   function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]]; // swap elements
    }
  }

