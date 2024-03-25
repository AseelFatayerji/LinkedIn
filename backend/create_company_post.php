<?php
include ('connection.php');

$id = $_POST['id'];
$info = $_POST['info'];
$img = $_POST['img'];

$query = $mysqli->prepare('INSERT INTO company_posts (company_id,post_info,post_img) VALUES (?,?,?);');
$query->bind_param('iss', $id, $info, $img);
$query->execute();
$response['status'] = "success";
$response['message'] = "company post was created successfully";

echo json_encode($response);
