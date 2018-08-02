var db = firebase.database();
var app = new Framework7();
var $$ = Dom7;

  // $$('.open-preloader').on('click', function () {
  // app.dialog.preloader();
  // setTimeout(function () {
  //   app.dialog.close();
  // }, 1700);
  // });
  $$('#getNetwork').on('click', function(){

    var WifiManager = window.cordova.plugins.WifiManager;
if ( WifiManager.isWifiEnabled()){
  WifiManager.getConnectionInfo(callback(function(err){
      console.log('gagal!')
    }, function(wifiInfo){
      console.log(wifiInfo.macAddress)
    }))
}


})

    $$("#getPosition").click(verify);

    function clicked(){
      alert("ready!");
    }

      var Latitude = undefined;
var Longitude = undefined;


function verify(){
  if (window.localStorage.getItem("userId")) {
    getMapLocation();
  }else {
    app.dialog.alert("Login Dulu!", "Error");
  }
}

// Get geo coordnates
function getMapLocation(){
  app.dialog.preloader();




function distance(lon1, lat1, lon2, lat2) {
  var R = 6371; // Radius of the earth in km
  var dLat = (lat2-lat1).toRad();  // Javascript functions in radians
  var dLon = (lon2-lon1).toRad();
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
          Math.sin(dLon/2) * Math.sin(dLon/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km
  return d;
}

/** Converts numeric degrees to radians */
if (typeof(Number.prototype.toRad) === "undefined") {
  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
  }
}



window.navigator.geolocation.getCurrentPosition(function(pos) {

  console.log(pos);
  console.log(distance(pos.coords.longitude, pos.coords.latitude,106.829174, -6.266092));

  if (distance(pos.coords.longitude, pos.coords.latitude,106.829174, -6.266092) <= 0.04) {
    app.dialog.close();
    var date = new Date();
    if (date.getHours() >=9 ) {
      app.dialog.prompt('Tuliskan Keterangan','Anda Datang Terlambat?', function (alasanTelat) {
        app.dialog.confirm('Yakin?, Keterangan adalah : ' + alasanTelat + '?','Confirm', function () {
          window.localStorage.setItem("alasanTelat",alasanTelat);

          //Data Absen!
            var testObject = {
             'email' : window.localStorage.getItem("email"),
             'name' : window.localStorage.getItem("name"),
             'alasanTelat' : window.localStorage.getItem("alasanTelat"),
             'tanggal': date.getDate(),
             'bulan': date.getMonth(),
             'tahun': date.getFullYear(),
             'jam_datang':date.getHours() ,
             'menit':date.getMinutes()
           };

            // Put the object into storage
            window.localStorage.setItem('testObject', JSON.stringify(testObject));
            // Retrieve the object from storage

          app.dialog.alert(window.localStorage.getItem("name")+" Absen Pada Tanggal: " + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes(), "Berhasil Absen Masuk!");
          console.log(window.localStorage.getItem("name")+" Absen Pada Tanggal: " + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() );
          $$("#ind_jam_datang").html("Jam Masuk: "+date.getHours()+":"+date.getMinutes());
          $$("#ind_jam_datang").removeClass("hidden");

          window.localStorage.setItem('waktu_masuk', date.getHours()+":"+date.getMinutes());



          $$("#getPosition").addClass("hidden");
          if (date.getHours() < 17) {
            $$("#AbsenKeluar").removeClass("hidden");
          }else {
            $$("#AbsenPulang").removeClass("hidden");
            $$("#AbsenKeluar").addClass("hidden");

          }
      })
    })
  }else {
    window.localStorage.setItem("alasanTelat","TEPAT WAKTU");
    //Data Absen!
      var testObject = {
       'email' : window.localStorage.getItem("email"),
       'name' : window.localStorage.getItem("name"),
       'alasanTelat' : window.localStorage.getItem("alasanTelat"),
       'tanggal': date.getDate(),
       'bulan': date.getMonth(),
       'tahun': date.getFullYear(),
       'jam_datang':date.getHours() ,
       'menit':date.getMinutes()
     };

      // Put the object into storage
      window.localStorage.setItem('testObject', JSON.stringify(testObject));
      // Retrieve the object from storage

  }



}
  else {
    app.dialog.alert("anda Tidak dalam lokasi QB!","Gagal!");
  }
}, onMapError, {maximumAge:360, timeout:5000});
function onMapError(error) {
    app.dialog.close();
    app.dialog.alert("Pastikan Anda Menyalakan GPS dan Berada dalam Lokasi QB", " ");
   }
 }





 $$(".izinTrigger").on("click", AbsenKeluar);


 function AbsenKeluar(){
   app.dialog.preloader();

   var date = new Date();

   function distance(lon1, lat1, lon2, lat2) {
     var R = 6371; // Radius of the earth in km
     var dLat = (lat2-lat1).toRad();  // Javascript functions in radians
     var dLon = (lon2-lon1).toRad();
     var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
             Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
             Math.sin(dLon/2) * Math.sin(dLon/2);
     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
     var d = R * c; // Distance in km
     return d;
   }

   /** Converts numeric degrees to radians */
   if (typeof(Number.prototype.toRad) === "undefined") {
     Number.prototype.toRad = function() {
       return this * Math.PI / 180;
     }
   }



 if (window.localStorage.getItem("email") != null) {
   window.navigator.geolocation.getCurrentPosition(function(pos) {
     console.log(distance(pos.coords.longitude, pos.coords.latitude,106.829174, -6.266092));
     if (distance(pos.coords.longitude, pos.coords.latitude,106.829174, -6.266092) <= 0.04) {

      app.dialog.close();

      app.dialog.prompt('Tuliskan Keterangan','Keluar Lebih Awal?', function (alasan) {
          if (alasan == null) {
            window.localStorage.setItem("alasan","TANPA KETERANGAN");
          }else {
            window.localStorage.setItem("alasan",alasan);
          }
          $$("#AbsenKeluar").addClass("hidden");
          $$("#AbsenPulang").addClass("hidden");
          $$("#getPosition").removeClass("hidden");
          app.dialog.alert('Ok, Anda Keluar Lebih awal dengan alasan : ' + alasan, 'Pulang Lebih Awal', function(alasan){
            window.localStorage.setItem("jam_pulang", date.getHours());
            window.localStorage.setItem("menit_pulang", date.getMinutes());
            var retrievedObject = window.localStorage.getItem('testObject');
            var db = firebase.database();
            var Absen = db.ref('Absen');
            Absen.on('child_added', function(data){console.log(data)});
            var data_absen = JSON.parse(retrievedObject);
            var app = new Framework7();
            var bulan = data_absen.bulan + 1;
            app.request.json('https://itservicesqb.com/absensi/upload.php', {

            email: data_absen.email,
            name: data_absen.name,
            tanggal: data_absen.tanggal,
            bulan: bulan,
            tahun: data_absen.tahun,
            jam_datang: data_absen.jam_datang,
            menit_datang: data_absen.menit,
            jam_pulang: window.localStorage.getItem("jam_pulang"),
            employee_id: window.localStorage.getItem("employee_id"),
            menit_pulang: window.localStorage.getItem("menit_pulang"),
            keterangan: window.localStorage.getItem("alasan"),
            alasanTelat: window.localStorage.getItem("alasanTelat"),},

            function (data) {
              console.log(data.jam_datang);
              console.log('data');
            }, function(error){
            console.log(error);
            });
            var userId = window.localStorage.getItem("userId");
            var name = window.localStorage.getItem("name");
            var email = window.localStorage.getItem("email");
            var imageUrl = window.localStorage.getItem("imageUrl");
            var employee_id = window.localStorage.getItem("employee_id");
            window.localStorage.clear();
            window.localStorage.setItem("userId", userId);
            window.localStorage.setItem("name", name);
            window.localStorage.setItem("email", email);
            window.localStorage.setItem("imageUrl", imageUrl);
            window.localStorage.setItem("employee_id", employee_id);


            $$("#getPosition").removeClass("hidden");
            $$("#absenKeluar").addClass("hidden");
            $$("#absenPulang").addClass("hidden");
            window.location.reload();
          });
      });

    }else {
      app.dialog.alert("Anda Tidak Dalam Lokasi QB", "Tidak Bisa Absen");
    }
  }, onMapError, {maximumAge:360, timeout:5000});

  function onMapError(error) {
      app.dialog.close();
      app.dialog.alert("Pastikan Anda Menyalakan GPS dan Berada dalam Lokasi QB", " ");
    }


 }else {
   app.dialog.close();
   app.dialog.alert("User Tidak Ditemukan Silahkan Login", " ");
 }

}

 $$("#AbsenPulang").on("click", AbsenPulang);


 function AbsenPulang() {
  app.dialog.preloader();
   var date = new Date();

  function distance(lon1, lat1, lon2, lat2) {
    var R = 6371; // Radius of the earth in km
    var dLat = (lat2-lat1).toRad();  // Javascript functions in radians
    var dLon = (lon2-lon1).toRad();
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d;
  }

  /** Converts numeric degrees to radians */
  if (typeof(Number.prototype.toRad) === "undefined") {
    Number.prototype.toRad = function() {
      return this * Math.PI / 180;
    }
  }

   if (window.localStorage.getItem("email") != null) {


   window.navigator.geolocation.getCurrentPosition(function(pos) {
     console.log(distance(pos.coords.longitude, pos.coords.latitude,106.829174, -6.266092));
     if (distance(pos.coords.longitude, pos.coords.latitude,106.829174, -6.266092) <= 0.04) {

     app.dialog.close();

     app.dialog.alert('Silahkan Pulang...','Pulang',function(){
     window.localStorage.setItem("jam_pulang", date.getHours());
     window.localStorage.setItem("menit_pulang", date.getMinutes());
     var retrievedObject = window.localStorage.getItem('testObject');
     var db = firebase.database();
     var Absen = db.ref('Absen');
     Absen.on('child_added', function(data){console.log(data)});
     var data_absen = JSON.parse(retrievedObject);

     var bulan = data_absen.bulan + 1;

     app.request.json('https://itservicesqb.com/absensi/upload_ontime.php', {
     email: data_absen.email,
     name: data_absen.name,
     tanggal: data_absen.tanggal,
     bulan: bulan,
     tahun: data_absen.tahun,
     jam_datang: data_absen.jam_datang,
     menit_datang: data_absen.menit,
     jam_pulang: window.localStorage.getItem("jam_pulang"),
     menit_pulang: window.localStorage.getItem("menit_pulang"),
     employee_id: window.localStorage.getItem("employee_id"),
     alasanTelat: window.localStorage.getItem("alasanTelat"),},

     function (data) {
       console.log(data);

 }, function(error){
   console.log(error);
 });
 var userId = window.localStorage.getItem("userId");
 var name = window.localStorage.getItem("name");
 var email = window.localStorage.getItem("email");
 var imageUrl = window.localStorage.getItem("imageUrl");
 var employee_id = window.localStorage.getItem("employee_id");
 window.localStorage.clear();
 window.localStorage.setItem("userId", userId);
 window.localStorage.setItem("name", name);
 window.localStorage.setItem("email", email);
 window.localStorage.setItem("imageUrl", imageUrl);
 window.localStorage.setItem("employee_id", employee_id);

 $$("#getPosition").removeClass("hidden");
 $$("#absenKeluar").addClass("hidden");
 $$("#absenPulang").addClass("hidden");
 window.location.reload();
   });
 }else {
   app.dialog.alert("Anda Tidak Berada Dalam Lokasi QB!", "Gagal!")
 }
}, onMapError, {maximumAge:360, timeout:2000});

 function onMapError(error) {
     app.dialog.close();
     app.dialog.alert("Pastikan Anda Menyalakan GPS dan Berada dalam Lokasi QB", " ");
   };
 }else {
   app.dialog.alert("User Tidak Ditemukan Silahkan Login", " ");
 }
}


 function AbsenLembur() {
   var date = new Date();
     app.dialog.alert('Silahkan Pulang...','Pulang',function(){
     window.localStorage.setItem("jam_pulang", date.getHours());
     window.localStorage.setItem("menit_pulang", date.getMinutes());
     var retrievedObject = window.localStorage.getItem('testObject');
     var db = firebase.database();
     var Absen = db.ref('Absen');
     Absen.on('child_added', function(data){console.log(data)});
     var data_absen = JSON.parse(retrievedObject);



     app.request.json('http://192.168.100.77:8888/phpAjax/upload.php', {
     email: data_absen.email,
     name: data_absen.name,
     tanggal: data_absen.tanggal,
     bulan: data_absen.bulan,
     tahun: data_absen.tahun,
     jam_datang: data_absen.jam_datang,
     menit_datang: data_absen.menit,
     jam_pulang: window.localStorage.getItem("jam_pulang"),
     menit_pulang: window.localStorage.getItem("menit_pulang"),
     keterangan: "LUPA ABSEN",},

     function (data) {
       console.log('data');

 }, function(error){
   console.log(error);
 });
     window.localStorage.clear();
     $$("#AbsenPulang").addClass("hidden");
     $$("#getPosition").addClass("hidden");
     $$("#AbsenKeluar").addClass("hidden");
     $$("#loginButton").removeClass("hidden");
   });
 }
