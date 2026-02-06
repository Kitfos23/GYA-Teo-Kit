<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Create</title>
</head>

<body>
<?php
/** @var PDO $dbconn */
include ('dbconnection.php');
try {

    // sql to create table
    $sql = "CREATE TABLE players (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    startTime VARCHAR(32),
    playTime INT(16)
    )";

    // use exec() because no results are returned
    $dbconn->exec($sql);
    echo "Table created successfully";
}
catch(PDOException $e)
    {
    echo $sql . "<br>" . $e->getMessage();
}

echo "<br> <br>";

try {
    // sql to create table
    $sql = "CREATE TABLE actions (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    timeStamp INT(16),
    action VARCHAR(10),
    direction VARCHAR(7),
    playerId INT(10)
    )";

    // use exec() because no results are returned
    $dbconn->exec($sql);
    echo "Table created successfully";
}
catch(PDOException $e)
    {
    echo $sql . "<br>" . $e->getMessage();
}

//Rensa kopplingen till databasen
$dbconn = null;

?>
</body>
</html>