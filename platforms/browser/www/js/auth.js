var app = new Framework7();
var host = "http://192.168.100.77:8888/phpAjax/"

$$(".google-sign-in").on("click", signIn);

function signIn(){
  app.dialog.preloader();
  window.plugins.googleplus.isAvailable(
    function (available) {
      if (available) {
        window.plugins.googleplus.login(
      {
         // optional space-separated list of scopes, the default is sufficient for login and basic profile info
        // there is no API key for Android; you app is wired to the Google+ API by listing your package name in the google dev console and signing your apk (which you have done in chapter 4)
      },function (obj) {
        app.request.json(host+'login.php'/*'https://itservicesqb.com/absensi/login.php'*/,{'email':obj.email},onSuccess,onError);


        function onSuccess(data){

          if (data.email == obj.email) {

            if (window.localStorage.getItem("testObject") != null ) {
              $$("#getPosition").addClass("hidden");
              if (date.getHours() >= 17) {
                app.dialog.alert("Sudah Jam Pulang", "Sudah Waktu Pulang");
                $$("#AbsenPulang").removeClass("hidden");
                $$("#AbsenKeluar").addClass("hidden");
              //   cordova.plugins.notification.local.schedule({
              //     title: 'Sudah Absen Belum??',
              //     text: 'Sudah Waktu Pulang ayo absen!',
              //     attachments: ['file://../img/QB.png'],
              //
              // });
              }else{
                $$("#AbsenKeluar").removeClass("hidden");
              };
            }else {
              $$("#getPosition").removeClass("hidden");

            }
            app.dialog.close();
            app.dialog.alert("Halo! " + obj.displayName + " Anda berhasil Login", "Berhasil Login!");
            window.localStorage.setItem("employee_id", data.employee_id);
            window.localStorage.setItem("userId", obj.userId);
            window.localStorage.setItem("name", obj.displayName);
            window.localStorage.setItem("email", obj.email);
            window.localStorage.setItem("imageUrl", obj.imageUrl);
            console.log(window.localStorage.getItem("imageUrl"))

            $$(".google-sign-in").addClass("hidden"); // do something useful instead of alerting
            $$("#logout").removeClass("hidden");
            $$(".logout").removeClass("hidden");
            $$("#user").html(obj.displayName);
            $$("#avatar").attr("src", window.localStorage.getItem("imageUrl"));
            if (!window.localStorage.getItem('waktu_masuk')) {
              $$("#ind_jam_datang").addClass("hidden");
            }else {
              $$("#ind_jam_datang").html("Jam Masuk: "+window.localStorage.getItem('waktu_masuk'));
            }

          }else {
            app.dialog.close
            app.dialog.alert("anda Belum Terdaftar","Gagal");
            $$("#logout").addClass("hidden");
          }

        }

        function onError(Error){
          app.dialog.close
          window.plugins.googleplus.logout(
            function (msg) {
              app.dialog.alert("Anda Kendala di Server", "Gagal");
            })
        }

      })
}
})
}

$$("#logout").on("click",Logout);

function Logout(){
      window.plugins.googleplus.logout();
      console.log("anda telah Logout");
      window.localStorage.removeItem("userId");
      window.localStorage.removeItem("name");
      window.localStorage.removeItem("imageUrl");
      window.localStorage.removeItem("employee_id");
      app.dialog.alert("Anda Telah Logout!", "Logout");
      $$("#logout").addClass("hidden");
      $$(".logout").addClass("hidden");
      $$("#user").html("");
      $$("#getPosition").addClass("hidden");
      $$("#avatar").attr("src","img/icon.png");
      $$("#email").html("");
      $$("#AbsenKeluar").addClass("hidden");
      $$("#AbsenPulang").addClass("hidden");
      $$(".google-sign-in").removeClass("hidden");
 // do something useful instead of alerting
  }
