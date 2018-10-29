<?php
    if(isset($_POST['submit'])){
        require 'dbCon.php';
        
        $email = $_POST['email'];
        $passWord = $_POST['passWord'];

        if (empty($email) || empty($passWord)){
            header("Location: ../../loginForm.php?error=emptyfields&email=".$email);
            exit();
        }
        else if (!filter_var($email, FILTER_VALIDATE_EMAIL)){
            header("Location: ../../loginForm.php?error=invalidemail");
            exit();
        }
        else{
            $hash = password_hash($passWord, PASSWORD_BCRYPT);
            $sql = "SELECT `idEmp`,`password` FROM `user` where `email` = ?";
            $stmt = mysqli_stmt_init($conn);
            if(!mysqli_stmt_prepare($stmt, $sql)){
                header("Location: ../../loginForm.php?error=sqlerror");
                exit();
            }
            else{
                mysqli_stmt_bind_param($stmt, "s", $email);
                mysqli_stmt_execute($stmt);
                mysqli_stmt_store_result($stmt);
                mysqli_stmt_bind_result($stmt, $idEmp, $userPassword);
                while (mysqli_stmt_fetch($stmt)) {
                    if (password_verify($passWord, $userPassword)) {
                        session_start();
                        $_SESSION['idEmp'] = $idEmp;
                        header("Location: ../../calendar.php");
                        exit();
                    }
                    else{
                        header("Location: ../../loginForm.php?error=invalidpassword");
                        exit();
                    }
                }  
            }
        }
        mysqli_stmt_close($stmt);
        mysqli_close($conn);
    }else{
        header("Location: ../../loginForm.php");
        exit(); 
    }
?>