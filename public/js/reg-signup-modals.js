$("#signup").on("click", function (event) {
  event.preventDefault();
  $("#signUpModal").modal();
});


$("#logInOwner").on("click", function (event) {
  event.preventDefault();
  $("#loginOwner").modal();
});

$(".submitLogin").on("click", function (event) {
  event.preventDefault();

  var login = {
    user_name: $("#user").val().trim(),
    pass: $("#passWord").val().trim()
  }

  $.post("/api/login", login, function (data) {
    if (data) {
      console.log("loged in");
      Redirect("/profile")
    }

    else {
      alert("Invalid Login");
    }

    $("#user_name").val("");
    $("#pass").val("");

  });

});

$(".homeyLogin").on("click", function (event) {
  event.preventDefault();
  var login = {
    name: $("#homeyName").val().trim(),
    pass: $("#homeyPass").val().trim()
  }

  $.post("/api/provider/login", login, function (data) {
    if (data) {
      console.log("loged in");
      Redirect("/provider-profile")
    }
    else {
      Redirect("/oops")
    }

  });

});

function Redirect(where) {
  window.location = where;
}