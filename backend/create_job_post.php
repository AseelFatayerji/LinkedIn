<?php
include ('connection.php');

$id = $_POST['id'];
$desc = $_POST['desc'];
$pose = $_POST['pose'];
$salary = $_POST['salary'];

$query = $mysqli->prepare('INSERT INTO jobs (company_id,position,requirements,salary) VALUES (?,?,?,?);');
$query->bind_param('issi', $id, $pose, $desc, $salary);
$query->execute();
$response['status'] = "success";
$response['message'] = "company post was created successfully";

echo json_encode($response);
