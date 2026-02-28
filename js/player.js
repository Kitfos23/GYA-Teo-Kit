// Spelarens atribut
const player = {
  width : tile_size * 0.8,
  height : tile_size * 0.8,
  color : "rgb(218, 103, 9)",
  speed : 1.5,
  dx : 0,
  dy : 0,
  currentTexture : 2,
  walkAnimationDelay : 0,
  walkAnimationDelayMax : 21,
  blinkDelay : 0,
  blinkDelayMax : 12,
  facing : "right"
};

// Spelarens spawnpoint för varje bana
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

// Bytter riktning hos spelaren
let keysDown = {};
function updateDirection() {
  // WASD och piltangenterna
  if (keysDown["w"] || keysDown["arrowup"]) {
    player.dx = 0; 
    player.dy = -1;
  } else if (keysDown["s"] || keysDown["arrowdown"]) {
    player.dx = 0; 
    player.dy = 1;
  } else if (keysDown["a"] || keysDown["arrowleft"]) {
    player.dx = -1; 
    player.dy = 0;
    player.facing = "left";
  } else if (keysDown["d"] || keysDown["arrowright"]) {
    player.dx = 1; 
    player.dy = 0;
    player.facing = "right";
  } else if (keysDown["escape"]) {
    if (draw_interval) {
      startGame();
    }
  } else if (keysDown["r"]) {
    resetPlayer();
    load();
  } else {
    player.dx = 0; 
    player.dy = 0;
  }
}

// Flyttar spelaren
function movePlayer() {
  player.x += player.dx * player.speed;
  player.y += player.dy * player.speed;
}

// Spelarens kollision med världskanten
function clampPlayer(canvas) {
  player.x = Math.max(0, Math.min(player.x, canvas.canvas.width - player.width));
  player.y = Math.max(0, Math.min(player.y, canvas.canvas.height - player.height));
}

// Spelarens kollision med blocken
function playerBlocked(world, tile_size, blockedTypes) {
  function isBlocked(x, y) {
    let gridX = Math.floor(x / tile_size);
    let gridY = Math.floor(y / tile_size);
    if (gridY >= 0 && gridY < world.length && gridX >= 0 && gridX < world[0].length) {
      return blockedTypes.includes(world[gridY][gridX]);
    }
    return false;
  }
  return (isBlocked(player.x, player.y) || isBlocked(player.x + player.width, player.y) || isBlocked(player.x, player.y + player.height) || isBlocked(player.x + player.width, player.y + player.height));
}

// Ritar spelaren på spelplanen
function drawPlayer(ctxTarget) {
  // Ritar spelarens animation
  // Spelaren går åt höger
  if (player.dx != 0) {
    player.walkAnimationDelay++;
    if (player.walkAnimationDelay >= player.walkAnimationDelayMax) {
      player.walkAnimationDelay = 0;
      if (player.currentTexture < 8) {
        player.currentTexture++;
      } else {
        player.currentTexture = 3;
      }
    }
  } else {
    // Får spelaren att blinka när hon står stilla
    player.blinkDelay++;
    if (Math.random() <= 0.05 && player.blinkDelay >= player.blinkDelayMax) {
      player.currentTexture = 1;
      player.blinkDelay = 0;
    } else if (player.blinkDelay >= player.blinkDelayMax) {
      player.currentTexture = 2;
      player.blinkDelay = 0;
    }
  }

  if (player.facing == "left") {
    canvas.scale(-1,1);
    make_base(playerTextures[player.currentTexture], player.x*-1, player.y, player.width*-1, player.height, canvas);
    canvas.scale(-1,1);
    // canvas.setTransform(1,0,0,1,0,0);
  } else {
    make_base(playerTextures[player.currentTexture], player.x, player.y, player.width, player.height, canvas);
  }
}