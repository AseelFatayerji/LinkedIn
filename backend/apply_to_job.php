<?php
include ('connection.php');

$id = $_POST['id'];
$user = $_POST['user'];
$stat = 0;

$query2 = $mysqli->prepare('INSERT INTO job_applications (job_id,user_id,status) VALUES (?,?,?);');
$query2->bind_param('iii', $id, $use, $stat);
$query2->execute();
$response['status'] = "success";
$response['message'] = "company post was created successfully";

echo json_encode($response);
