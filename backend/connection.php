<?php
header('Access-Control-Allow-Origin: *');
$host = "localhost";
$user = "root";
$pass = "";
$db_name = "linkedin";
$port = "3308";

$mysqli = new mysqli($host, $user, $pass, $db_name, $port);
if ($mysqli->connect_error) {
    die ("" . $mysqli->connect_error);
}



