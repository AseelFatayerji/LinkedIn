<?php

include 'connection.php';

$id = $_POST['company_id'];
$query = $mysqli->prepare('SELECT * FROM jobs WHERE company_id = ?;');
$query->bind_param('i', $id);
$query->execute();
$result=$query->get_result();
$post = [];
while ($row = $result->fetch_assoc()) {
    $post[] = $row;
}

echo json_encode($post);