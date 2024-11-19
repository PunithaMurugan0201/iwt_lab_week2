<?php
// Configuration
$db_host = 'localhost';
$db_username = 'root';
$db_password = '';
$db_name = 'registration';

// Create connection
$conn = new mysqli($db_host, $db_username, $db_password, $db_name);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$sex = $_POST['sex'];
$dob_day = $_POST['dob-day'];
$dob_month = $_POST['dob-month'];
$dob_year = $_POST['dob-year'];
if (isset($_POST['languages'])) {
    // If it's not already an array, convert it to an array
    $languages = (array)$_POST['languages'];
    // Then use implode to join the array into a string
    $languages = implode(',', $languages);
} else {
    // Handle the case where no languages are selected
    $languages = '';
}
$address = $_POST['address'];
$password = password_hash($_POST['password'],PASSWORD_BCRYPT);

// Insert data into database
$sql = "INSERT INTO users (name, email, phone, sex, dob, languages, address, password)
        VALUES ('$name', '$email', '$phone', '$sex', '$dob_day-$dob_month-$dob_year', '$languages', '$address','$password')";

if ($conn->query($sql) === TRUE) {
    echo "Registration successful!";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close connection
$conn->close();
?>