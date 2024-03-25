<?php
include('connection.php');


$name = $_POST['name'];
$lastname = $_POST['$lastname'];
$address = $_POST['$address'];
$email = $_POST['email'];
$password = $_POST['password'];

$check_email = $mysqli->prepare('SELECT user_email FROM users WHERE user_email=?');
$check_email->bind_param('s', $email);
$check_email->execute();
$check_email->store_result();
$email_exists = $check_email->num_rows();

if ($email_exists == 0) {
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);
    $query = $mysqli->prepare('INSERT INTO users (user_email,user_name,user_lastname,address,user_password) VALUES(?,?,?,?,?);');
    $query->bind_param('sssss', $email, $name,$lastname,$address, $password);
    $query->execute();
    $response['status'] = "success";
    $response['message'] = "user $name was created successfully";
} else {
    $response["status"] = "user already exists";
    $response["message"] = "user $name wasn't created";
}
echo json_encode($response);
