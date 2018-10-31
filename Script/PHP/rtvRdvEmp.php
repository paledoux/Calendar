<?php
    session_start();
    require 'dbCon.php';
    $premierJour = "1";
    $dernierJour = $_POST['lastDay'];
    $mois = $_POST['month'];
    $year = $_POST['year'];
    $dateDebut = $year."-".$mois."-".$premierJour;
    $dateFin = $year."-".$mois."-".$dernierJour;
    $output['data'] = array();
    $sql = "SELECT rdv.dateRdv, rdv.heureDebut, rdv.heureFin, clientt.prenom, clientt.nom, endroit.ville, endroit.abreviation, endroit.localisation from rdv rdv join client clientt on rdv.idClient = clientt.idClient join endroit endroit on rdv.idEndroit = endroit.idEndroit where rdv.idEmp = ? and rdv.dateRdv BETWEEN ? AND ? order by rdv.dateRdv";
    $stmt = mysqli_stmt_init($conn);
    if(mysqli_stmt_prepare($stmt, $sql)){
        mysqli_stmt_bind_param($stmt, "iss", $_SESSION['idEmp'], $dateDebut, $dateFin);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_bind_result($stmt, $dateRdv, $heureDebut, $heureFin, $prenom, $nom, $ville, $abreviation, $localisation);
        while (mysqli_stmt_fetch($stmt)) {
            $output['data'][$dateRdv][] = array( 
                "dateRdv" => $dateRdv,
                "heureDebut" => $heureDebut,
                "heureFin" => $heureFin,
                "prenom" => $prenom,
                "nom" => $nom,
                "ville" => $ville,
                "abreviation" => $abreviation,
                "localisation" => $localisation
            );       
        }
        echo json_encode( $output['data'] );
    } 
    mysqli_stmt_close($stmt);
    mysqli_close($conn);
?>