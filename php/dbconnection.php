<!-- dbconnection.php -->
<?php
$local = false;
if ($local) {
  $dbname = 'mindatabas';
  $hostname = 'localhost';
  $DB_USER = 'root';
  $DB_PASSWORD = '';
} else {
  $dbname = 'kitfos23';
  $hostname = 'localhost';
  $DB_USER = 'kitfos23';
  $DB_PASSWORD = 'vhzaBhjJ';
}

$options  = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'UTF8'");

try {
    $dbconn = new PDO("mysql:host=$hostname;dbname=$dbname;", $DB_USER, $DB_PASSWORD, $options);
    $dbconn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(PDOException $e){
    // For debug purpose, shows all connection details
    echo 'Connection failed: '.$e->getMessage()."<br />";
      // Hide connection details.
    //echo 'Could not connect to database.<br />'); 
}