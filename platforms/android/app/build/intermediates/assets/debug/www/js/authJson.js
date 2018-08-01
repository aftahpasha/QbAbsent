

var auth = firebase.auth();

$$('.open-register').once('click', function () {
  app.dialog.login('Enter your Email and password', function (username, password) {
    app.dialog.alert('Thank you!<br>Email:' + username + '<br>Password:' + password);


  });
});
$$('.open-signin').once('click', function () {
  app.dialog.login('Enter your Email and password', function (username, password) {


    auth.signInWithEmailAndPassword(username, password).then(function(data){
      app.dialog.alert('Anda Telah Login');
      console.log("--Signed In--")
      console.log(data.user.email)
      window.localStorage.setItem("data", data)
    }).catch(function(error){
      console.log(error)
      app.dialog.alert("Anda Belum Melakukan Registrasi Email " + ": " + error.code,"Error!");
    })
  });
});



firebase.auth().onceAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var emailDB = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
  } else {
    // User is signed out.
    // ...
  }
});

$$("#logout").once("click",function () {
  var auth = firebase.auth();
  auth.signOut().then(function() {
    console.log("anda telah Logout");
    window.localStorage.clear();
    app.dialog.alert("Anda Berhasil Logout", "Logout");
    $$("#logout").addClass("hidden");
    $$(".logout").addClass("hidden");
    $$("#user").html("");
    $$("#getPosition").addClass("hidden");
    $$("#avatar").attr("src","img/icon.png");
    $$("#email").html("");
    $$("#AbsenKeluar").addClass("hidden");
    $$("#AbsenPulang").addClass("hidden");
    $$(".google-sign-in").removeClass("hidden");



  }).catch(function(error) {
    console.log(error);

  });

  var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });

})



var provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({
  'login_hint': 'user@example.com'
});

$$(".google-sign-in").once("click", signIn)

function signIn(){
  window.plugins.googleplus.isAvailable(
    function (available) {
      if (available) {
        window.plugins.googleplus.login(
      {
         // optional space-separated list of scopes, the default is sufficient for login and basic profile info
        // there is no API key for Android; you app is wired to the Google+ API by listing your package name in the google dev console and signing your apk (which you have done in chapter 4)
      },
      function (obj) {

        auth.signInWithEmailAndPassword(obj.email, "qb_international")
        .then(function(data){
          app.dialog.alert("Halo! " + obj.displayName + " Anda berhasil Login", "Berhasil Login!");
          window.localStorage.setItem("userId", obj.userId);
          window.localStorage.setItem("name", obj.displayName);
          window.localStorage.setItem("email", obj.email);
          window.localStorage.setItem("imageUrl", obj.imageUrl);
          console.log(window.localStorage.getItem("imageUrl"))
          $$("#getPosition").removeClass("hidden");
          $$(".google-sign-in").addClass("hidden"); // do something useful instead of alerting
          $$(".google-regist").addClass("hidden");
          $$("#logout").removeClass("hidden");
          $$(".logout").removeClass("hidden");
          $$("#user").html(obj.displayName);
          $$("#avatar").attr("src", window.localStorage.getItem("imageUrl"));
          $$("#email").html(obj.email);


        }).catch(function(error){
          console.log(error)
          app.dialog.alert("Login Gagal Anda Belum Registrasi " + "Error :" + error.code);
        })



      },
      function (msg) {
        alert('error: ' + msg);
      }
  );
      }
    }
  );
}

$$(".google-regist").once("click", function(){
  window.plugins.googleplus.isAvailable(
    function (available) {
      if (available) {
        window.plugins.googleplus.login(
      {
         // optional space-separated list of scopes, the default is sufficient for login and basic profile info
        // there is no API key for Android; you app is wired to the Google+ API by listing your package name in the google dev console and signing your apk (which you have done in chapter 4)
      },
      function (obj) {
        window.localStorage.setItem("email", obj.email);
        auth.createUserWithEmailAndPassword(obj.email, obj.userId)
        .then(function(data){
          console.log("--Terdaftar--");
          console.log(data.email);
          app.dialog.alert("Email : " +obj.email + " Terdaftar!", "Terdaftar!");
        }).catch(function(error){
          app.dialog.alert(error.message, "error!");
        }) // do something useful instead of alerting
      },
      function (msg) {
        alert('error: ' + msg);
      }
  );
      }
    }
  );
})
