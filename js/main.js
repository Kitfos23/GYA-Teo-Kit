// Offscreen-buffer för scenen
let bufferCanvas = document.createElement("canvas");
let buffer = bufferCanvas.getContext("2d");
bufferCanvas.width = canvas.canvas.width;
bufferCanvas.height = canvas.canvas.height;

// Stäng av bildutjämning för skarp pixelart i början av spelet
buffer.imageSmoothingEnabled = false;
canvas.imageSmoothingEnabled = false;

// Tangenthantering
document.addEventListener("keydown", function(e) {
  keysDown[e.key.toLowerCase()] = true;
  updateDirection();

  if (e.keyCode == 32 || e.keyCode == 69 || e.keyCode == 70) {
    playerAtGate();
  }
});
document.addEventListener("keyup", function(e) {
  delete keysDown[e.key.toLowerCase()];
  updateDirection();
  console.log(e.key.toLowerCase());
});

for (let y = 0; y < world[level].length; y++) {
  for (let x = 0; x < world[level][y].length; x++) {
    if (world[level][y][x] == 1) {
      stones.push({
        // Stenens atribut
        x : tile_size * x,
        y : tile_size * y,
        width : tile_size,
        height : tile_size,
        color : "gray"
      })
    }
    else if (world[level][y][x] == 2) {
      bushes.push({
        // Buskens atribut
        x : tile_size * x,
        y : tile_size * y,
        width : tile_size,
        height : tile_size,
        color : "green"
      })
    }
  }
}

// För att temporärt avaktivera ett objekt, gör det här
function load() {
  loadBoxes(level);
  loadR_s(level);
  loadP_p(level);
  loadGate(level);
}

function loadItems() {
  // Byt till level vid kollision med världskanten
    // Level 1, går till vänster (level 0)
  if (level === 1 && player.x <= 0 && (player.y > tile_size * 3 && player.y < tile_size * 6)) {
    level = 0;
    player.x = canvas.canvas.width - (tile_size * 2);
    load();
    // Level 0, går till höger (level 1)
  } else if (level === 0 && player.x >= canvas.canvas.width - tile_size && (player.y > tile_size * 3 && player.y < tile_size * 6)) {
    level = 1;
    player.x = tile_size / 4;
    load();
    // Level 1, går till höger (level 2)
  } else if (level === 1 && player.x >= canvas.canvas.width - tile_size && (player.y > tile_size * 2 && player.y < tile_size * 6)) {
    level = 2;
    player.x = tile_size / 4;
    player.y = player.y + tile_size * 2;
    load();
    // Level 2, går till vänster (level 1)
  } else if (level === 2 && player.x <= 0 && (player.y > tile_size * 5 && player.y < tile_size * 8)) {
    level = 1;
    player.x = canvas.canvas.width - (tile_size * 2);
    player.y -= tile_size * 2;
    load();
    // Level 2, går till vänster (level 3)
  } else if (level === 2 && (player.x <= tile_size * 9 && player.x > tile_size * 8) && (player.y > tile_size * 5 && player.y < tile_size * 8)) {
    level = 3;
    player.x -= tile_size * 2;
    load();
    // Level 3, går till höger (level 2)
  } else if (level === 3 && (player.x <= tile_size * 8 && player.x > tile_size * 7) && (player.y > tile_size * 5 && player.y < tile_size * 8)) {
    level = 2;
    player.x += tile_size * 2;
    load();
    // Level 3, går upp (level 4)
  } else if (level === 3 && player.y <= 0) {
    level = 4;
    player.x -= tile_size;
    player.y = tile_size * 8.5;
    load();
    // Level 4, går ner (level 3)
  } else if (level === 4 && player.y > tile_size * 9) {
    level = 3;
    player.x += tile_size;
    player.y = tile_size * 0.5;
    load();
    // Level 3, går ner (level 5)
  } else if (level === 3 && player.y > tile_size * 9) {
    level = 5;
    player.y = tile_size * 0.5;
    load();
    // Level 5, går upp (level 3)
  } else if (level === 5 && player.y <= 0) {
    level = 3;
    player.y = tile_size * 8;
    load();
    // Level 5 går till vänster (level 6)
  } else if (level === 5 && player.x <= 0) {
    level = 6;
    player.x = canvas.canvas.width - tile_size;
    load();
    // Level 6 går till höger (level 5)
  } else if (level === 6 && player.x > canvas.canvas.width - tile_size) {
    level = 5;
    player.x = tile_size * 0.1;
    load();
    // Level 6 går upp (level 7)
  } else if (level === 6 && player.y <= 0) {
    level = 7;
    player.y = tile_size * 9;
    load();
    // Level 7 går ner (level 6)
  } else if (level === 7 && player.y > tile_size * 9 && (player.x > tile_size && player.x <= tile_size * 4)) {
    level = 6;
    player.y = tile_size * 0.6;
    load();
  };
}

function resetPlayer() {
  if (level == 0) {
    player.x = tile_size * 14.6;
    player.y = tile_size * 4.6;
  } else if (level == 1) {
    player.x = tile_size * 2.6;
    player.y = tile_size * 4.6;
  } else if (level == 2) {
    player.x = tile_size * 0.6;
    player.y = tile_size * 6.6;
  } else if (level == 3) {
    player.x = tile_size * 6.6;
    player.y = tile_size * 6.6;
  } else if (level == 4) {
    player.x = tile_size * 11.1;
    player.y = tile_size * 8.1;
  } else if (level == 5) {
    player.x = tile_size * 12.1;
    player.y = tile_size * 0.1;
  } else if (level == 6) {
    player.x = tile_size * 14.1;
    player.y = tile_size * 3.1;
  } else if (level == 7) {
    player.x = tile_size * 2.6;
    player.y = tile_size * 8.6;
  }
}

function draw() {
  // Synka buffer
  if (bufferCanvas.width !== canvas.canvas.width || bufferCanvas.height !== canvas.canvas.height) {
    bufferCanvas.width = canvas.canvas.width;
    bufferCanvas.height = canvas.canvas.height;
  }

  if (!transitionScreen) {
    movePlayer();
  }

  // Flyttar på lådan
  moveBox();

  // Flyttar på stenen
  moveR_s();

  // Aktiverar tryck knappen
  activateP_p();

  // Kallar på grindens kollison
  gateCollision();

  // Låser spelarens rörelser till kanten av spelplanen
  clampPlayer(canvas);

  loadItems();

  // Stannar spelaren vid kollision
  if (playerBlocked(world[level], tile_size, blockedTypes)) {
    player.x -= player.dx * player.speed;
    player.y -= player.dy * player.speed;
  }

  // Starta transition vid dörrkollision
  if (!transitionScreen && (door(player.x, player.y) || door(player.x + player.width - 1, player.y) || door(player.x, player.y + player.height - 1) || door(player.x + player.width - 1, player.y + player.height - 1))) {
    transitionDiameter = 0;
    player.dx = 0;
    player.dy = 0;
    transitionScreen = true;
  }

  // Rita världen på buffer
  let ctxTarget = transitionScreen ? buffer : canvas;

  // Ritar bakgrunden
  // for (let y = 0; y < world[level].length; y++) {
  //   for (let x = 0; x < world[level][y].length; x++) {
  //       ctxTarget.fillStyle = ((x + y) % 2 == 0) ? 
  //       "rgba(154, 153, 153, 1)" : "rgba(142, 141, 141, 1)"; // Bakgrund
  //      ctxTarget.fillRect(x * tile_size, y * tile_size, tile_size, tile_size);
  //   }
  // }
  make_base(bgTextures[level + 1], 0, 0, tile_size * 16, tile_size * 10);

  // Ritar grinden på spelplanen
  drawGate(ctxTarget);

  // Ritar världen
  for (let y = 0; y < world[level].length; y++) {
    for (let x = 0; x < world[level][y].length; x++) {
      const w = world[level][y][x];
      if (world[level][y][x] == "b") {
        make_base(wallTextures["b"], x * tile_size, y *tile_size, tile_size, tile_size, ctxTarget);
      } else if(w > 0 && w < 19) {
        make_base(wallTextures[w], x * tile_size, y * tile_size, tile_size, tile_size, ctxTarget);
      }
    }
  }

  // Ritar tryck knappen på spelplan
  drawP_p(ctxTarget);

  // Ritar spelaren på spelplanen
  drawPlayer(ctxTarget);

  // Ritar lådan på spelplanen
  drawBox(ctxTarget);

  // Ritar lådan på spelplanen
  drawR_s(ctxTarget);


  // Om transition: rita svart och cirkel som växer
  // if (transitionScreen) {
  //   canvas.save();

  //   // Svart bakgrund
  //   canvas.fillStyle = "black";
  //   canvas.fillRect(0, 0, canvas.canvas.width, canvas.canvas.height);

  //   // Rita buffern i en cirkel som växer
  //   canvas.beginPath();
  //   canvas.arc(canvas.canvas.width / 2, canvas.canvas.height / 2, transitionDiameter / 2, 0, Math.PI * 2);
  //   canvas.closePath();
  //   canvas.clip();

  //   canvas.drawImage(bufferCanvas, 0, 0);

  //   canvas.restore();

  //   // Öka cirkelns storlek
  //   transitionDiameter += 10;

  //   // När den täcker hela skärmen -> avsluta
  //   if (transitionDiameter >= Math.max(canvas.canvas.width, canvas.canvas.height) * 1.5) {
  //     transitionScreen = false;

  //     level = 1;
  //     player.y = player.y - tile_size * 2;

  //     load();
  //   }
  // }
}

// Startar/Pausar spelet
let draw_interval = null;
function startGame() {

  // Spara grid-positioner innan ändring
  let playerCol = player.x / tile_size;
  let playerRow = player.y / tile_size;
  let boxCols = boxes.map(b => b.x / tile_size);
  let boxRows = boxes.map(b => b.y / tile_size);
  let r_sCols = r_s.map(b => b.x / (tile_size * 0.2));
  let r_sRows = r_s.map(b => b.y / (tile_size * 1.2));
  let p_pCols = p_p.map(b => b.x / (tile_size * 0.2));
  let p_pRows = p_p.map(b => b.y / (tile_size * 1.2));
  let gateCols = gate.map(b => b.x / (tile_size));
  let gateRows = gate.map(b => b.y / (tile_size));

  // Lokal variabel för main
  const main = document.getElementById("main");

  if (fullScreen) {
    // smallscreen
    document.exitFullscreen();
    canvas.canvas.width = 640;
    canvas.canvas.height = 400;
    bufferCanvas.width = 640;
    bufferCanvas.height = 400;
    tile_size = 40;
    canvas.imageSmoothingEnabled = false;
    buffer.imageSmoothingEnabled = false;
    document.body.style.paddingTop = "5%";
    document.getElementById("startGameButton").style.display = "inline";
    document.getElementById("startGameButton").disabled = "";
    document.getElementById("pauseGameButton").style.display = "none";
    document.getElementById("pauseGameButton").disabled = "disabled";

    clearInterval(draw_interval);
    draw_interval = null;
  } else {
    // Fullscreen
    main.requestFullscreen();
    navigator.keyboard.lock();
    canvas.canvas.width = 960;
    canvas.canvas.height = 600;
    bufferCanvas.width = 960;
    bufferCanvas.height = 600;
    tile_size = 60;
    canvas.imageSmoothingEnabled = false;
    buffer.imageSmoothingEnabled = false;
    document.body.style.paddingTop = "0";
    // document.getElementById("fullScreenBtn").style.top = "92.6vh";
    // document.getElementById("fullScreenBtn").style.left = "94.7vw";
    document.getElementById("startGameButton").style.display = "none";
    document.getElementById("startGameButton").disabled = "disabled";
    document.getElementById("pauseGameButton").style.display = "inline";
    document.getElementById("pauseGameButton").disabled = "";
    
    // Startar spelet
    draw_interval = setInterval(draw, 4);
    load();
    console.log("Game started");
  }

  // Återställ spelaren till samma grid-position
  player.width = tile_size * 0.8;
  player.height = tile_size * 0.8;
  player.x = playerCol * tile_size;
  player.y = playerRow * tile_size;

  // Återställ alla boxar till samma grid-positioner
  for (let i = 0; i < boxes.length; i ++) {
    boxes[i].width = tile_size;
    boxes[i].height = tile_size;
    boxes[i].x = boxCols[i] * tile_size;
    boxes[i].y = boxRows[i] * tile_size;
  }

  // Återställ alla rullande stenar till samma grid-positioner
  for (let i = 0; i < r_s.length; i ++) {
    r_s[i].width = tile_size * 1.6;
    r_s[i].height = tile_size * 1.6;
    r_s[i].x = r_sCols[i] * tile_size * 0.2;
    r_s[i].y = r_sRows[i] * tile_size * 1.2;
  }

  // Återställ alla tryck knappar till samma grid-positioner
  for (let i = 0; i < p_p.length; i ++) {
    p_p[i].width = tile_size * 2;
    p_p[i].height = tile_size * 2;
    p_p[i].x = p_pCols[i] * tile_size * 0.2;
    p_p[i].y = p_pRows[i] * tile_size * 1.2;
  }

  // Återställ alla grindar till samma grid-positioner
  for (let i = 0; i < gate.length; i ++) {
    gate[i].width = tile_size * 1;
    gate[i].height = tile_size * 3;
    gate[i].x = gateCols[i] * tile_size;
    gate[i].y = gateRows[i] * tile_size;
  }

  bufferCanvas.width = canvas.canvas.width;
  bufferCanvas.height = canvas.canvas.height;
  fullScreen = !fullScreen;
}