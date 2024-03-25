<?php

include 'connection.php';

$user_email = $_POST['email'];

$query = $mysqli->prepare('SELECT * FROM users WHERE user_email = ?;');
$query->bind_param('s', $user_email);
$query->execute();
$query->store_result();
$query->bind_result($id, $email, $name, $lastname, $address, $hashed_password);
$query->fetch();
$response['type'] = "user";
$response['user_id'] = $id;
$response['name'] = $name;
$response['email'] = $email;
$response['lastname'] = $lastname;
$response['address'] = $address;
$response['password'] = $hashed_password;
echo json_encode($response);