<?php

include 'connection.php';

$id = $_POST['user_id'];
$query = $mysqli->prepare('SELECT post_info,post_img FROM user_posts WHERE user_id = ?;');
$query->bind_param('i', $id);
$query->execute();
$result=$query->get_result();
$post = [];
while ($row = $result->fetch_assoc()) {
    $post[] = $row;
}

echo json_encode($post);