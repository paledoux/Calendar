<?php
    session_start();

    if(empty($_SESSION['idEmp'])){
        header("Location: /loginForm.php");
        exit();
    }
    else{
        header("Location: /calendar.php");
        exit();
    }
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Calendar</title>
        <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="viewport" content="width=device-width">
        <meta name="author" content="Philippe-Antoine Ledoux">
        <link rel="stylesheet" href="CSS/style.css" />
        
    </head>
    <body>
        <div class="container">
            <header>
                <nav>
                    <ul>
                        <!--<li><a href="index.php">Home</a></li>
                        <li><a href="loginForm.php">Login</a></li>
                        <li><a href="index.php">Home</a></li>-->
                    </ul>
                </nav>    
            </header>
        </div>
    </body>
    <script src="/Script/JS/calendar.js"></script>
    <script src="/Script/JS/script.js"></script>
</html>

