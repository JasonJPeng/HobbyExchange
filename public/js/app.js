$(document).ready(function() { //  Beginning of jQuery
   $.ajax({
       type: "GET",
       url: "api/hobbies"
   }).then(function(data) {
       data.forEach(function(e){
           opt = `<option value="${e.id}" >${e.name}</option>`;
           $("#hobby-1").append(opt)
           $("#hobby-2").append(opt)
           $("#hobby-3").append(opt)
       })
       

       console.log(data)
   })
})