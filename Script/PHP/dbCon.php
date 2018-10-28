<?php
    $serverName = "localhost";
    $dbUserName = "paled629_user";
    $dbPassWord = "Onl!neUs3";
    $dbName = "paled629_Calendar";

    $conn = mysqli_connect($serverName, $dbUserName, $dbPassWord, $dbName);

    if (!$conn){
        die("Connection failed: ".mysqli_connect_error());
    }
