<?php

include 'connection.php';

$query = $mysqli->prepare('SELECT * FROM jobs ;');
$query->execute();
$result=$query->get_result();
$post = [];
while ($row = $result->fetch_assoc()) {
    $post[] = $row;
}

echo json_encode($post);