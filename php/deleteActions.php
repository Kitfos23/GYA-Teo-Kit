<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Delete Actions</title>
</head>

<body>
<?php
include ('../dbconnection.php');
try {

    // sql to delete table
    $sql = "DROP TABLE IF EXISTS actions";
    //use exec() because no results are returned
    $dbconn->exec($sql);
    echo "Table deleted successfully";
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