var date = new Date();
$$(window).on("load", function(){
//   cordova.plugins.notification.local.schedule({
//     title: 'Perhatian!',
//     text: 'Aplikasi ini membutuhkan koneksi GPS, Pastikan anda telah menyalakan GPS di Ponsel Anda',
//     icon: 'file://img/hdpi.png',
//     smallIcon: 'file://img/hdpi.png',
// });
//
// JANGAN LUPA NYALAIN

  // if (date.getHours() >= 17) {
  //   app.dialog.alert("Sepertinya anda lupa Absen?", "Anda Dianggap Pulang Oleh Sistem");
  //   AbsenLembur();
  // }

  // if (date.getHours()<=6 && date.getHours() >= 17 ) {
  //   $$("#loginButton").attr("disabled", "true");
  //   $$("#getPosition").attr("disabled", "true");
  //   $$("#AbsenKeluar").attr("disabled", "true");
  //   $$("#AbsenPulang").attr("disabled", "true");
  //
  // }
  if (window.localStorage.getItem("employee_id") != null) {
    //$$(".google-sign-in").addClass("hidden"); // do something useful instead of alerting
    $$(".google-regist").addClass("hidden");
    $$("#logout").removeClass("hidden");
    $$(".logout").removeClass("hidden");
    $$("#user").html(window.localStorage.getItem("name"));
    $$("#email").html(window.localStorage.getItem("email"));
    $$("#avatar").attr("src", window.localStorage.getItem("imageUrl"))
    if (window.localStorage.getItem("testObject") != null ) {
      $$("#getPosition").addClass("hidden");
      if (date.getHours() >= 17) {
        app.dialog.alert("Sudah Jam Pulang", "Sudah Waktu Pulang");
        $$("#AbsenPulang").removeClass("hidden");
        $$("#AbsenKeluar").addClass("hidden");
        cordova.plugins.notification.local.schedule({
          title: 'Sudah Absen Belum??',
          text: 'Sudah Waktu Pulang ayo absen!',
          attachments: ['file://../img/QB.png'],
        });

      }else{
        $$("#AbsenKeluar").removeClass("hidden");
      };
    }else {
      $$("#getPosition").removeClass("hidden");
    }

  }else {
    $$(".google-sign-in").removeClass("hidden");
    $$("#getPosition").addClass("hidden");
    $$("#user").html("");
    $$("#avatar").attr("src","img/icon.png");
    $$("#AbsenKeluar").addClass("hidden");
    $$("#AbsenPulang").addClass("hidden");
  }

})

var calendarDefault = app.calendar.create({
  inputEl: '#demo-calendar-default',
  on: {
    closed: function () {
      calendarDefault.setValue(0000-00-00)
    }
  },
});

$$('#demo-calendar-default').on('change', function(){
    console.log($$(this).val());
    app.request.json('http://192.168.100.77:8888/phpAjax/getDate.php', {date: $$(this).val(), emp_id : window.localStorage.getItem('employee_id'), },
    function (data) {

        app.dialog.alert(
        "Tanggal/Jam Masuk : "+"<br>"+data.punch_in+
        "<br>"+"Tanggal/Jam Keluar : "+"<br>"+data.punch_out+
        "<br>"+"Keterangan Masuk : "+"<br>"+data.punch_in_note+
        "<br>"+"Keterangan Keluar : "+"<br>"+data.punch_out_note, "Data Absensi!")

        $$('#demo-calendar-default').val('');

    },function(error){
    console.log(error);
  });


});
