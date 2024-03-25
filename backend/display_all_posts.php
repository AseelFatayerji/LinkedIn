<?php

include 'connection.php';


$query = $mysqli->prepare('SELECT user_id,post_info,post_img FROM user_posts ;');
$query->execute();
$result=$query->get_result();
$post = [];
while ($row = $result->fetch_assoc()) {
    $post[] = $row;
}
$query2 = $mysqli->prepare('SELECT company_id,post_info,post_img FROM company_posts;');
$query2->execute();
$result2=$query2->get_result();
while ($row = $result2->fetch_assoc()) {
    $post[] = $row;
}

echo json_encode($post);