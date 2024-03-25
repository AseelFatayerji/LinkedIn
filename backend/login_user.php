<?php
include 'connection.php';

$email = $_POST['email'];
$password = $_POST['password'];

$query = $mysqli->prepare('SELECT * FROM users WHERE user_email=? or user_name =?');
$query->bind_param('ss', $email, $email);
$query->execute();
$query->store_result();
$query->bind_result($id,$email, $name,$lastname,$address, $hashed_password);
$query->fetch();
$num_rows = $query->num_rows();


if ($num_rows == 0) {
    $response['status'] = "user not found";
} else {
    if ($password == $hashed_password) {
        $response['status'] = "logged in";
        $response['type'] = "user";
        $response['user_id'] = $id;
        $response['name'] = $name;
        $response['email'] = $email;
        $response['lastname'] = $lastname;
        $response['address'] = $address;
        $response['password'] = $hashed_password;
    } else {
        $response['status'] = "incorrect credentials $email";

    }
}

echo json_encode($response);