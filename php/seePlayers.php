<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Delete</title>
</head>

<body>

<?php
include ('../dbconnection.php');
$message = null;
$id = null;

if (isset($_POST['id']) && !empty($_POST['id'])) {
  $id = $_POST['id'];
      
  try {    
    $sql = "SELECT * FROM actions where playerId=?";
    $stmt = $dbconn->prepare($sql);
    // fetch width column names, create a table
    $data = array($id);  
    $stmt->execute($data);
    $output = "<table><tr>
    <td>ID</td>
    <td>Starttid</td>
    <td>Speltid</td>
    </tr>";
    while ($res = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $id = htmlentities($res['id']);
      $timeStamp = htmlentities($res['timeStamp']);
      $action = htmlentities($res['action']);
      $direction = htmlentities($res['direction']);
      
      $output .= "<tr>".
          "<td>$id</td>".
          "<td>$timeStamp</td>".
          "<td>$action</td>".
          "<td>$direction</td>".
      "</tr>";
    }
    $output .= "</table>";
    echo "$output";
  }
  catch(PDOException $e)
    {
    $message .= $sql . "<br>" . $e->getMessage();
  }
} else {
    $message .= "<br />";
}

echo $message;

    
// Ouput table with all posts
/*** The SQL SELECT statement ***/
$sql = "SELECT * FROM players";
$stmt = $dbconn->prepare($sql);
// fetch width column names, create a table
$data = array();  
$stmt->execute($data);
$output = "<table><tr>
<td>ID</td>
<td>Starttid</td>
<td>Speltid</td>
</tr>";
while ($res = $stmt->fetch(PDO::FETCH_ASSOC)) {
    $id = htmlentities($res['id']);
    $start = htmlentities($res['startTime']);
    $play = htmlentities($res['playTime']);
    
    $output .= "<tr>".
        "<td>$id</td>".
        "<td>$start</td>".
        "<td>$play</td>".
        "<td><form method='post' action=''>".
        "<input type='hidden' name='id' value='$id'>".
        "<button type='submit'>Välj</button></form></td>".
    "</tr>";
    
}
$output .= "</table>";
echo "$output";

$dbconn = null;
?>

</body>
</html>