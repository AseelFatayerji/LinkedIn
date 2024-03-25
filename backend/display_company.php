<?php

include 'connection.php';

$email = $_POST['email'];

$query = $mysqli->prepare('SELECT * FROM companies WHERE company_name = ?;');
$query->bind_param('s', $email);
$query->execute();
$query->store_result();
$query->bind_result($id, $email, $name,$hashed_password);
$query->fetch();
$response['type'] = "company";
$response['company_id'] = $id;
$response['company_name'] = $name;
$response['company_email'] = $email;
$response['company_password'] = $hashed_password;
echo json_encode($response);