<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Intuition</title>
  <link rel="icon" type="image/png" href="../bilder/playerFront/playerFront2.png">
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
  <header>
    <div id="header_div">
      <h2>- Intuition - </h2>
      <h4>Ett gymnasiearbete av : Kit F & Teo R 23Te</h4>
    </div>
  </header>
  <middle>
    <!-- Skärmtypsbytare -->
    <menu>
      <button id="screenSwitcher" class="button_class" onclick="toggleScreenSize()">Laptop</button>
      <div id="menu_div">
        <h4>Skärmtyp:</h4>
      </div>
    </menu>

    <!-- Spelplan -->
    <main id="main">
      <canvas id="canvas" width="320" height="200" style="z-index: 1;"></canvas>
      <img src="../bilder/logo/intuition.png" id="logo" alt="Bild på spelets logga med text. Titel : Intuition Av Teo & Kit 23Te. Bakgrund : Gråskalad tegelvägg.">
      <button id="pauseGameButton" class="button_class" onClick="startGame()">Pausa</button>

      <!-- Formulär -->
      <form method="POST" action="">
        <input type="hidden" id="time" name="time">
        <input type="hidden" id="actions" name="actions">
        <input type="submit" id="send_button" class="button_class" value="Avsluta spel">
      </form>
    </main>
    <!-- Startknapp -->
    <right>
      <button id="startGameButton" class="button_class" onClick="startGame()">Start</button>
      <div id="right_div">
        <h4>Starta Spelet:</h4>
      </div>
    </right>
  </middle>
  <!-- Kontaktlista och Copyright -->
  <footer>
    <ul>
      <li>INSERT STUDIO NAME HERE© 2026. Alla rättigheter förbehållna.</li>
      <li>Värmdö Gymnaisum : Simlångsvägen 26, 120 39 Årsta</li>
      <li>Kontakt : kitfos23@varmdogymnasium.se</li>
    </ul>
  </footer>
  
  <!-- Javascript -->
  <script src="../js/saveInputs.js"></script>

  <script src="../js/global.js"></script>

  <script src="../js/imagesNSound_handler.js"></script>

  <script src="../js/world.js"></script>

  <script src="../js/main.js"></script>

  <script src="../js/player.js"></script>

  <script src="../js/box.js"></script>

  <script src="../js/door.js"></script>

  <script src="../js/rolling_stone.js"></script>

  <script src="../js/pressure_plate.js"></script>

  <script src="../js/gate.js"></script>
</body>
</html>