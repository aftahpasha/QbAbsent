<?php

// myqli_connect('127.0.0.1:3306', 'root','','AbAbsent');



$mysqli = mysqli_connect("localhost", "aftahpasha", "", "QbAbsen");

$query = "INSERT INTO test VALUES ('$_GET[email]','$_GET[name]','$_GET[tanggal]','$_GET[bulan]','$_GET[tahun]','$_GET[jam_datang]','$_GET[menit_datang]','$_GET[jam_pulang]','$_GET[menit_pulang]','$_GET[keterangan]')";
$exec = mysqli_query($mysqli,$query);



if (!$exec) {
  $myObj->error = "GAGAL";
}

$myObj->jam_datang = $_GET['jam_datang'];
$myObj->email = $_GET['email'];
$myObj->name = $_GET['name'];
$myObj->tanggal = $_GET['tanggal'];
$myObj->bulan = $_GET['bulan'];
$myObj->menit_datang = $_GET['menit_datang'];
$myObj->jam_pulang = $_GET['jam_pulang'];
$myObj->menit_pulang = $_GET['menit_pulang'];
$myObj->keterangan = $_GET['keterangan'];
$myObj->age = 30;
$myObj->city = "New York";

$myJSON = json_encode($myObj);

echo $myJSON;




 ?>
