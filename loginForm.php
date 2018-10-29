<?php
    session_start();

    if(!empty($_SESSION['idEmp'])){
        header("Location: /calendar.php");
        exit();
    }
?>

<!DOCTYPE html>
<html>
    <head>

        <title>Login</title>
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
                        <li><a href="index.php">Home</a></li>
                        <li><a href="index.php">Home</a></li>-->
                    </ul>
                </nav>    
            </header>

            <main>
                <form action="Script/PHP/login.php" method="post">
                    <input type="text" name="email" placeholder="Email"></br>
                    <input type="password" name="passWord" placeholder="Password"></br>
                    <input type="submit" name="submit" value="Connexion">
                </form>
            </main>
        </div>
    </body>
</html>

