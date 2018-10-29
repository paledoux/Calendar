<?php
    if(isset($_POST['submit'])){
        session_start();
        $_SESSION = array();
        session_destroy();
        header('Location: login.php');
        exit;
    }
?>