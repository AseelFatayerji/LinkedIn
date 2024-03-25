<?php

include 'connection.php';

$user_id = $_POST['id'];

$query = $mysqli->prepare('SELECT * FROM users WHERE user_id = ?;');
$query->bind_param('s', $user_id);
$query->execute();
$query->store_result();
$query->bind_result($id, $email, $name, $lastname, $address, $hashed_password);
$query->fetch();
$response['type'] = "user";
$response['name'] = $name;
$response['email'] = $email;
$response['lastname'] = $lastname;
$response['address'] = $address;
echo json_encode($response);