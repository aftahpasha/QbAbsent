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
$email = $_GET['email'];
$sql = "SELECT * FROM hs_hr_employee WHERE emp_work_email = '$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
      $myObj->employee_id = $row['emp_number'];
      $myObj->email = $row['emp_work_email'];

      $credentials = json_encode($myObj);

      echo $credentials;

    }
} else {
    echo "0 results";
}

$conn->close();
?>
