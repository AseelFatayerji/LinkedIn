<?php
include 'connection.php';

$id = $_POST['id'];
$name = $_POST['name'];
$lastname = $_POST['lastname'];
$email = $_POST['email'];
$address = $_POST['address'];
$password = $_POST['password'];

$query = $mysqli->prepare('UPDATE users SET user_name = ?,user_password=?,user_lastname=?,address=?,user_email = ? WHERE user_id = ?;');
$query->bind_param('sssssi',$name, $password, $lastname,$address, $email,$id);
$query->execute();
$response['status'] = "success";
$response['message'] = "$name was successfully updated";
echo json_encode($response);