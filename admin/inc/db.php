<?php
    $servername = "localhost:3306";
    $username = "kinlewwu_theronclintwilliam";
    $password = "Lightnsound1";
    $dbname = "kinlewwu_kinleys_blinds";

    try {
      $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password,array(
                PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8',
            ));
      // set the PDO error mode to exception
      $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch(PDOException $e) {
      echo "DB Connection failed: " . $e->getMessage();
      console.log("DB Connection failed: " . $e->getMessage());
    }
?>
