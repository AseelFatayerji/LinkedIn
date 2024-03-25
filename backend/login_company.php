<?php
include 'connection.php';

$email = $_POST['email'];
$password = $_POST['password'];

$query2 = $mysqli->prepare('SELECT * FROM companies WHERE company_email=? or company_name =?');
$query2->bind_param('ss', $email, $email);
$query2->execute();
$query2->store_result();
$query2->bind_result($company_id,$company_email, $company_name, $company_hashed_password);
$query2->fetch();
$num_rows2 = $query2->num_rows();


if ($num_rows2 == 0) {
    $response['status'] = "user not found";
} else {
    if ($password == $company_hashed_password) {
        $response['status'] = "logged in";
        $response['type'] = "company";
        $response['comapny_id'] = $company_id;
        $response['company_name'] = $company_name;
        $response['comapny_email'] = $company_email;
        $response['password'] = $company_hashed_password;
    } else {
        $response['status'] = "incorrect credentials $company_email";

    }
}
echo json_encode($response);