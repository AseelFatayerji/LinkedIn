<?php

include 'connection.php';

$id = $_POST['id'];
$type = $_POST['type'];
$query = $mysqli->prepare('SELECT * FROM followers WHERE user_id = ? user_type=?;');
$query->bind_param('is', $id,$type);
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