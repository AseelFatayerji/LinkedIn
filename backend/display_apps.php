<?php
include ('connection.php');


$user_id = $_POST['user_id'];

$query = $mysqli->prepare('SELECT * FROM job_applications AS JS JOIN jobs AS J WHERE user_id = ? and JS.job_id = J.job_id;');
$query->bind_param('i', $user_id);
$query->execute();
$result=$query->get_result();
$post = [];
while ($row = $result->fetch_assoc()) {
    $post[] = $row;
}

echo json_encode($post);
