<?php
    $serverName = "localhost";
    $dbUserName = "";
    $dbPassWord = "";
    $dbName = "paled629_Calendar";

    $conn = mysqli_connect($serverName, $dbUserName, $dbPassWord, $dbName);

    if (!$conn){
        die("Connection failed: ".mysqli_connect_error());
    }
