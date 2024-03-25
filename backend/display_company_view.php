<?php

include 'connection.php';

$id = $_POST['id'];

$query = $mysqli->prepare('SELECT * FROM companies WHERE company_id = ?;');
$query->bind_param('s', $id);
$query->execute();
$query->store_result();
$query->bind_result($id, $email, $name,$hashed_password);
$query->fetch();
$response['type'] = "company";
$response['company_name'] = $name;
$response['company_email'] = $email;
echo json_encode($response);