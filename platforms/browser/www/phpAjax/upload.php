<?php

header('Access-Control-Allow-Origin: *');
$servername = "localhost";
$username = "aftahpasha";
$password = "";
$dbname = "QbAbsen";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$jam_datang = $_GET['jam_datang'] - 7;
$employee_id = $_GET['employee_id'];
$punch_in_utc_time = $_GET['tahun']."-".$_GET['bulan']."-".$_GET['tanggal']." ".$jam_datang.":".$_GET['menit_datang'].":00";
$punch_in_note = $_GET['alasanTelat'];
$punch_in_time_offset = 7;
$punch_in_user_time = $_GET['tahun']."-".$_GET['bulan']."-".$_GET['tanggal']." ".$_GET['jam_datang'].":".$_GET['menit_datang'].":00";
$jam_pulang = $_GET['jam_pulang'] - 7;
$punch_out_utc_time = $_GET['tahun']."-".$_GET['bulan']."-".$_GET['tanggal']." ".$jam_pulang.":".$_GET['menit_pulang'].":00";
$punch_out_note = $_GET['keterangan'];
$punch_out_time_offset = 7;
$punch_out_user_time = $_GET['tahun']."-".$_GET['bulan']."-".$_GET['tanggal']." ".$_GET['jam_pulang'].":".$_GET['menit_pulang'].":00";
$state = "PUNCHED OUT";



$punch_in = date_create($punch_in_utc_time,date_interval_create_from_date_string("-7 HOUR"));
$punch_out = date_add($punch_out_utc_time,date_interval_create_from_date_string("-7 HOUR"));

$sql = "INSERT INTO ohrm_attendance_record (`id`, `employee_id`, `punch_in_utc_time`, `punch_in_note`,`punch_in_time_offset`,`punch_in_user_time`,
`punch_out_utc_time`,`punch_out_note`,`punch_out_time_offset`, `punch_out_user_time`, `state`)
VALUES (NULL, '".$employee_id."','".$punch_in_utc_time."','".$punch_in_note."','".$punch_in_time_offset."','".$punch_in_user_time."','".$punch_out_utc_time."','".$punch_out_note."','".$punch_out_time_offset."','".$punch_out_user_time."','".$state."')";

echo $sql;

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
