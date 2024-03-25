<?php
include 'connection.php';

$id = $_POST['id'];
$name = $_POST['name'];
$email = $_POST['email'];
$password = $_POST['password'];

$query = $mysqli->prepare('UPDATE companies SET company_name = ?,company_password=?,company_email = ? WHERE company_id = ?;');
$query->bind_param('sssi',$name, $password, $email,$id);
$query->execute();
$response['status'] = "success";
$response['message'] = "$name was successfully updated";
echo json_encode($response);