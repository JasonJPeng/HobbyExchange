$(document).ready(function() { //  Beginning of jQuery

   $.ajax({
       type: "GET",
       url: "api/hobbies"
   }).then(function(data) {
       data.forEach(function(e){
           opt = `<option value="${e.id}" >${e.name}</option>`;
           $(".HobbyList").append(opt);
// for admin.html
           htmlCode = `<li>(${e.id})  ${e.name}</li>`;
           $("#HobbyList").append(htmlCode);

       })
      
   })

//    $.ajax({
//     type: "GET",
//     url: "api/hobbies"
//     }).then(function(data) {
//     data.forEach(function(e){
//         htmlCode = `<li>(${e.id})  ${e.name}</li>`;
//         $("#HobbyList").append(htmlCode)
//     })
//     console.log(data)
//    })

$("#FindMatch").on("click", function (event) {
    event.preventDefault();
    var id = $("#user-id").val().trim();
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
        console.log(data);
      })    
        
   })  // end of submit

   function displayMatches(arrObj) {
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
          Teaching ${e.user_name} on ${teach} <br>
          Learning ${learn} from ${e.user_name} <br>
          qulification: ${qualification}  <br>
          <hr>
       `;
        $("#MatchedResults").append(htmlCode);

       });

   }


})