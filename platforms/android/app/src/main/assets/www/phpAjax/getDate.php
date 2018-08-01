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

$date = $_GET['date'];
$emp_id = $_GET['emp_id'];
$sql = "SELECT * FROM `ohrm_attendance_record` WHERE DATE(punch_in_utc_time) = '$date' && employee_id = $emp_id  ORDER BY id DESC LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
      $myObj->punch_in = $row['punch_in_user_time'];
      $myObj->punch_in_note = $row['punch_in_note'];
      $myObj->punch_out = $row['punch_out_user_time'];
      $myObj->punch_out_note = $row['punch_out_note'];


      $log = json_encode($myObj);

      echo $log;

    }
} else {
    echo "0 results";
}

$conn->close();
?>
