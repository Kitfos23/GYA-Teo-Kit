<!DOCTYPE html>
<html lang="sv">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport">
    <title>Första sidan</title>
  </head>

  <body>
    <?php 
      if (isset($_POST["actions"]) && isset($_POST["time"])) {
        $actions = explode(",", $_POST["actions"]);

        array_pop($actions);

        foreach ($actions as $i => $action) {
          $actions[$i] = explode(" ", $action);
        }

        $startTime = $_POST["time"];

        $lastIndex = count($actions) - 1;
        $playTime = (int)$actions[$lastIndex][0];

        /** @var PDO $dbconn */
        include ('dbconnection.php');
        try {    
          # prepare
          $sql = "INSERT INTO players (startTime, playTime) 
            VALUES (?, ?)";
          $stmt = $dbconn->prepare($sql);
          # the data we want to insert
          $data = array($startTime, $playTime);
          # execute width array-parameter
          $stmt->execute($data);
              
          echo "New record created successfully";
          $lastId = $dbconn->lastInsertId();

          foreach ($actions as $action) {
            try {    
              # prepare
              $sql = "INSERT INTO actions (timeStamp, action, direction, playerId) 
                VALUES (?, ?, ?, ?)";
              $stmt = $dbconn->prepare($sql);
              # the data we want to insert
              $data = array($action[0], $action[1], $action[2], $lastId);
              # execute width array-parameter
              $stmt->execute($data);
            }
            catch(PDOException $e)
                {
                echo $sql . "<br>" . $e->getMessage();
            }
          }
        }
        catch(PDOException $e)
            {
            echo $sql . "<br>" . $e->getMessage();
        }
        
        $dbconn = null;
      }
    ?>

    <form method="POST" action="">
      <input type="hidden" id="time" name="time">
      <input type="hidden" id="actions" name="actions">
      <input type="submit" value="Skicka">
    </form>

    <script src="../js/saveInputs.js"></script>
  </body>
</html>