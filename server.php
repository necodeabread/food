<?php
$_POST = json_decode(file_get_contents("php://input"), true); //all incoming from user will be decoded
echo var_dump($_POST);
