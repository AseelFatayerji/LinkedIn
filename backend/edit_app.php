<?php
include 'connection.php';

$id = $_POST['id'];
$stat = $_POST['stat'];

$query = $mysqli->prepare('UPDATE job_applications SET status = ? WHERE app_id = ?;');
$query->bind_param('ii',$stat,$id);
$query->execute();
$response['status'] = "success";
$response['message'] = "$stat was successfully updated";
echo json_encode($response);