<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>GYA Teo och Kit</title>
  <link href="../css/main.css" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
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

  <menu>
    <p>GYA Teo och Kit</p>
    <br><br>
  </menu>
  <main id="main">
    <!-- Spelplan -->
    <canvas id="canvas" width="640" height="400" style="z-index: 1;"></canvas>
    <img src="../bilder/logo/intuition.png" id="logo">
    <button id="startGameButton" onClick="startGame()">Start Game</button>
    <button id="pauseGameButton" onClick="startGame()">Pause Game</button>
  </main>
  <right>
  </right>


  <form method="POST" action="">
    <input type="hidden" id="time" name="time">
    <input type="hidden" id="actions" name="actions">
    <input type="submit" id="send_button" value="Skicka">
  </form>

  <script src="../js/saveInputs.js"></script>

  <script src="../js/global.js"></script>

  <script src="../js/imagesNSound_handler.js"></script>

  <script src="../js/world.js"></script>

  <!-- <script src="../js/main.js"></script> -->
  <script src="../js/main.js"></script>
  <!-- <script src="../js/branch_main_2.js"></script> -->

  <script src="../js/player.js"></script>
  <!-- <script src="../js/branch_player_1.js"></script> -->

  <script src="../js/box.js"></script>

  <script src="../js/door.js"></script>

  <script src="../js/rolling_stone.js"></script>

  <script src="../js/pressure_plate.js"></script>

  <script src="../js/gate.js"></script>

</body>
</html>