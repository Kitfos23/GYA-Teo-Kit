function loadGate(level) {
  // Töm alla gamla grindar
  gate.length = 0;

  gateIsOpen = false;

  // Loopa igenom världen och skapa en grind där det finns "g"
  for (let y = 0; y < world[level].length; y++) {
    for (let x = 0; x < world[level][y].length; x++) {
      if (world[level][y][x] === "g") {
        gate.push({
          x: x * tile_size,
          y: y * tile_size,
          width: tile_size,
          height: tile_size * 3,
          color: "white",
          speed: 1,
          offset: 0,
          isLocked: false,
          isOpened: false,
          shake_x: 0
        });

        // På level 5 och 6 är grindarna låsta
        for (i = 0; i < gate.length; i++) {
          if ([5, 6].includes(level)) {
            gate[i].isLocked = true;
        }
        }
      }
    }
  }
}

// Ritar grindens två halvor på spelplanen
function drawGate(canvas) {
  for (let i = 0; i < gate.length; i++) {
    canvas.fillStyle = gate[i].color;
    
    // Ritar övre grind halvan
    let cutoff = 0;
    let height = 0;
    // Om grinden har öppnats halvvägs...
    if (gate[i].offset >= tile_size * 0.75) {
      // Rita grinden f.o.m. pixel 6 av bilden
      cutoff = 6;
      // Rita ut bilden en fjärdedel av grindens höjd längre ned
      height = gate[i].height / 4;
    }
    
    let base_image = preloadImage(gateTextures[1]);
    // Ritar ut bilden baserat på förändringen
    canvas.drawImage(base_image,
      0, cutoff,
      8, 12,
      gate[i].x + gate[i].shake_x, gate[i].y - gate[i].offset + height,
      gate[i].width, gate[i].height / 2);

    // Ritar undre grind halvan
    cutoff = 12;
    height = gate[i].height / 2;
    // Om grinden har öppnats halvvägs...
    if (gate[i].offset >= tile_size * 0.75) {
      // Rita bilden t.o.m. pixel 6 på bilden
      cutoff = 6;
      // Rita om grinden med halva originalhöjden(en fjärdedel av totalen)
      height = gate[i].height / 4
    }
    
    base_image = preloadImage(gateTextures[0]);
    // Ritar ut bilden baserat på förändringen
    canvas.drawImage(base_image,
      0, 0,
      8, cutoff,
      gate[i].x + gate[i].shake_x, gate[i].y + gate[i].offset + gate[i].height / 2,
      gate[i].width, height);
    
    // Öppnar dörren
    if (gate[i].isOpened) {
      openGate();
    }
  }
}

function gateCollision() {
  // Endast kollision om grinden är stängd eller håller på att öppnas
  if (!gateIsOpen) {
    for (let i = 0; i < gate.length; i++) {

      // Övre halvan
      const topGate = {
        x: gate[i].x,
        y: gate[i].y - gate[i].offset,
        width: gate[i].width,
        height: gate[i].height / 2
      };

      // Nedre halvan
      const bottomGate = {
        x: gate[i].x,
        y: gate[i].y + gate[i].offset + gate[i].height / 2,
        width: gate[i].width,
        height: gate[i].height / 2
      };

      // Kollision med övre halvan
      if (
        player.x < topGate.x + topGate.width &&
        player.x + player.width > topGate.x &&
        player.y < topGate.y + topGate.height &&
        player.y + player.height > topGate.y
      ) {
        player.x -= player.dx * player.speed;
        player.y -= player.dy * player.speed;
      }

      // Kollision med nedre halvan
      if (
        player.x < bottomGate.x + bottomGate.width &&
        player.x + player.width > bottomGate.x &&
        player.y < bottomGate.y + bottomGate.height &&
        player.y + player.height > bottomGate.y
      ) {
        player.x -= player.dx * player.speed;
        player.y -= player.dy * player.speed;
      }
    }
  }
}

gateCanBeShaken = true;
function playerAtGate() {
  // Returnerar true eller false om spelaren är i en 3x3 ruta av dörren
  for (i = 0; i < gate.length; i++) {
    if (Math.abs(player.x - gate[i].x) <= tile_size * 2 && player.y - gate[i].y <= tile_size * 3 && player.y - gate[i].y >= 0) {
      if (gate[i].isLocked) {
        if (gateCanBeShaken) {
          gateCanBeShaken = false;
          gate[i].shake_x -= tile_size / 4;
          setTimeout(function() {gate[i].shake_x -= tile_size / 4;} , 100);
          setTimeout(function() {gate[i].shake_x += tile_size / 4;} , 200);
          setTimeout(function() {gate[i].shake_x += tile_size / 4;} , 300);
          setTimeout(function() {gate[i].shake_x += tile_size / 4;} , 400);
          setTimeout(function() {gate[i].shake_x -= tile_size / 4;} , 500);
          setTimeout(function() {gate[i].shake_x -= tile_size / 4;} , 600);
          setTimeout(function() {gate[i].shake_x = 0; gateCanBeShaken = true;} , 700);
        }
      } else {
        gate[i].isOpened = true;
        openGate();
      }
    }
  }
}

let timeout = null;
let openInterval;
let closeInterval;
let gateIsOpen = false;

// Öppnar grinden
function openGate() {
  if (gate[0].offset < 1 && !gateIsOpen) {
    for (let i = 0; i < gate.length; i++) {
      gate[i].offset = 1;
    }

    clearInterval(closeInterval);
    openInterval = setInterval(function() {
      if (gate[0].offset >= gate[0].height / 2) {
        clearInterval(openInterval);
        gateIsOpen = true;
      }

      for (let i = 0; i < gate.length; i++) {
        gate[i].offset++
      }
    }, 4);
  }
}

// Stänger grinden
function closeGate() {
  if (gate[0].offset > gate[0].height / 2) {
    gateIsOpen = false;
    for (let i = 0; i < gate.length; i++) {
      gate[i].offset = (gate[0].height / 2) - 1;
    }

    clearInterval(openInterval);
    closeInterval = setInterval(function() {
      for (let i = 0; i < gate.length; i++) {
        if (gate[i].offset <= 0) {
          clearInterval(closeInterval);
        }

        gate[i].offset--
      }
    }, 4)
  }
}

load();
