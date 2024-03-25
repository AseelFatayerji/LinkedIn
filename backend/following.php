<?php
include ('connection.php');

$id = $_POST['id'];
$user = $_POST['user'];

$query2 = $mysqli->prepare('INSERT INTO followers (following_id,user_id) VALUES (?,?);');
$query2->bind_param('ii', $id, $user);
$query2->execute();
$response['status'] = "success";
$response['message'] = "company post was created successfully";

echo json_encode($response);
