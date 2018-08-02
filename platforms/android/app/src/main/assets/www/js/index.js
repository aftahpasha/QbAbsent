var date = new Date();
$$(window).on("load", function(){
    var n = date.getDay();
    var month = date.getMonth()+1;
    var date_now = month+"-"+date.getDate();
    var sun = 0;
    var sat = 6;

    var day_work = n != sat &&  n != sun && date_now != 8+"-"+ 17 && date_now != 12+"-"+ 25 && date_now != 5+"-"+ 1 && date_now != 1+"-"+ 1 && date_now != 6+"-"+ 5;

function notify(){
    cordova.plugins.notification.local.schedule({
      title: 'Perhatian!',
      text: 'Aplikasi ini membutuhkan koneksi GPS, Pastikan anda telah menyalakan GPS di Ponsel Anda',
      icon: 'file://img/hdpi.png',
      smallIcon: 'file://img/hdpi.png',
  });
}

    if (day_work) {
      notify();
    }else {

    }

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
    if (!window.localStorage.getItem('waktu_masuk')) {
      $$("#ind_jam_datang").addClass("hidden");
    }else {
      $$("#ind_jam_datang").html("Jam Masuk: "+window.localStorage.getItem('waktu_masuk'));
    }
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
  app.dialog.preloader();
    console.log($$(this).val());
    app.request.json('http://192.168.100.77:8888/phpAjax/getDate.php', {date: $$(this).val(), emp_id : window.localStorage.getItem('employee_id'), },
    function (data) {
        app.dialog.alert(
        "Tanggal/Jam Masuk : "+"<br>"+data.punch_in+
        "<br>"+"Tanggal/Jam Keluar : "+"<br>"+data.punch_out+
        "<br>"+"Keterangan Masuk : "+"<br>"+data.punch_in_note+
        "<br>"+"Keterangan Keluar : "+"<br>"+data.punch_out_note, "Data Absensi!")

        $$('#demo-calendar-default').val('');
        app.dialog.close();

    },function(error){
    app.dialog.alert("Riwayat tidak ditemukan!"," ");
    app.dialog.close();

  });


});
