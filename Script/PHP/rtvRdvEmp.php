<?php
    session_start();
    require 'dbCon.php';
    $dateRdv = $_POST['dateRdv'];
    $output['data'] = array();
    $sql = "SELECT rdv.heureDebut, rdv.heureFin, clientt.prenom, clientt.nom, endroit.ville, endroit.abreviation, endroit.localisation from rdv rdv join client clientt on rdv.idClient = clientt.idClient join endroit endroit on rdv.idEndroit = endroit.idEndroit where rdv.idEmp = ? and rdv.dateRdv = ?";
    $stmt = mysqli_stmt_init($conn);
    if(mysqli_stmt_prepare($stmt, $sql)){
        mysqli_stmt_bind_param($stmt, "is", $_SESSION['idEmp'],$dateRdv);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_bind_result($stmt, $heureDebut, $heureFin, $prenom, $nom, $ville, $abreviation, $localisation);

        while (mysqli_stmt_fetch($stmt)) {
            
            /*$myObj->heureDebut = $heureDebut;
            $myObj->heureFin = $heureFin;
            $myObj->prenom = $prenom;
            $myObj->nom = $nom;
            $myObj->ville = $ville;
            $myObj->abreviation = $abreviation;
            $myObj->localisation = $localisation;
            
            $myJSON = json_encode($myObj);
            echo $myJSON;*/

            //$output['data'][] creates a new entry in the array
            $output['data'][] = array(
                "heureDebut" => $heureDebut,
                "heureFin" => $heureFin,
                "prenom" => $prenom,
                "nom" => $nom,
                "ville" => $ville,
                "abreviation" => $abreviation,
                "localisation" => $localisation
            );
            
        }
        echo json_encode( $output );
    }
    
    
    mysqli_stmt_close($stmt);
    mysqli_close($conn);
?>