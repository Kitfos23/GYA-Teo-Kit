function loadBoxes(level) {
  // Töm alla gamla lådor
  boxes.length = 0;

  // Loopa igenom världen och skapa lådor där det finns "c"
  for (let y = 0; y < world[level].length; y++) {
    for (let x = 0; x < world[level][y].length; x++) {
      if (world[level][y][x] === "c") {
        boxes.push({
          x: x * tile_size,
          y: y * tile_size,
          width: tile_size,
          height: tile_size,
          color: "yellow",
          dx: 0,
          dy: 0,
          speed: 2.5
        });
      }
    }
  }
}

function moveBox() {
  for (let i = 0; i < boxes.length; i++) {
    // Spara lådans gamla position
    let oldBoxX = boxes[i].x;
    let oldBoxY = boxes[i].y;

    // Putta lådan om spelaren är intill och rör sig mot lådan
    let pushed = false;
    // Vänster
    if (player.x + player.width > boxes[i].x && player.x < boxes[i].x && player.y + player.height > boxes[i].y && player.y < boxes[i].y + boxes[i].height && player.dx > 0) {
      boxes[i].x += player.dx * player.speed;
      pushed = true;
    }
    // Höger
    else if (player.x < boxes[i].x + boxes[i].width && player.x + player.width > boxes[i].x + boxes[i].width && player.y + player.height > boxes[i].y && player.y < boxes[i].y + boxes[i].height && player.dx < 0) {
      boxes[i].x += player.dx * player.speed;
      pushed = true;
    }
    // Ovan
    else if (player.y + player.height > boxes[i].y && player.y < boxes[i].y && player.x + player.width > boxes[i].x && player.x < boxes[i].x + boxes[i].width && player.dy > 0) {
      boxes[i].y += player.dy * player.speed;
      pushed = true;
    }
    // Under
    else if (player.y < boxes[i].y + boxes[i].height && player.y + player.height > boxes[i].y + boxes[i].height && player.x + player.width > boxes[i].x && player.x < boxes[i].x + boxes[i].width && player.dy < 0) {
      boxes[i].y += player.dy * player.speed;
      pushed = true;
    }

    // Kollision med världskanten
    if (boxes[i].x < 0 || boxes[i].x > canvas.canvas.width - boxes[i].width || boxes[i].y < 0 || boxes[i].y > canvas.canvas.height - boxes[i].height) {
      boxes[i].x = oldBoxX;
      boxes[i].y = oldBoxY;
      if (pushed) {
        if (player.dx > 0) player.x = boxes[i].x - player.width;
        if (player.dx < 0) player.x = boxes[i].x + boxes[i].width;
        if (player.dy > 0) player.y = boxes[i].y - player.height;
        if (player.dy < 0) player.y = boxes[i].y + boxes[i].height;
      }
    }

    // Kollision med blockerande block (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, "b")
    let corners = [
      [boxes[i].x, boxes[i].y],
      [boxes[i].x + boxes[i].width - 1, boxes[i].y],
      [boxes[i].x, boxes[i].y + boxes[i].height - 1],
      [boxes[i].x + boxes[i].width - 1, boxes[i].y + boxes[i].height - 1]
    ];
    let blocked = false;
    for (let c = 0; c < corners.length; c++) {
      let gridX = Math.floor(corners[c][0] / tile_size);
      let gridY = Math.floor(corners[c][1] / tile_size);
      if (
        gridY >= 0 && gridY < world[level].length &&
        gridX >= 0 && gridX < world[level][gridY].length
      ) {
        if ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, "b", "r"].includes(world[level][gridY][gridX])) {
          blocked = true;
          break;
        }
        // Kollision för grindens dubbla hitbox
        if (["g"].includes(world[level][gridY][gridX]) || ["g"].includes(world[level][gridY - 1][gridX]) || ["g"].includes(world[level][gridY - 2][gridX])) {
          blocked = true;
          break;
        }
      }
    }
    if (blocked) {
      boxes[i].x = oldBoxX;
      boxes[i].y = oldBoxY;
      if (pushed) {
        if (player.dx > 0) player.x = boxes[i].x - player.width;
        if (player.dx < 0) player.x = boxes[i].x + boxes[i].width;
        if (player.dy > 0) player.y = boxes[i].y - player.height;
        if (player.dy < 0) player.y = boxes[i].y + boxes[i].height;
      }
    }

    // Stanna lådan om den knuffas mot en annan låda
    for (let j = 0; j < boxes.length; j++) {
      if (i === j) continue;
      let b = boxes[j];
      let overlapX = boxes[i].x < b.x + b.width && boxes[i].x + boxes[i].width > b.x;
      let overlapY = boxes[i].y < b.y + b.height && boxes[i].y + boxes[i].height > b.y;
      if (overlapX && overlapY) {
        boxes[i].x = oldBoxX;
        boxes[i].y = oldBoxY;
        if (pushed) {
          if (player.dx > 0) player.x = boxes[i].x - player.width;
          if (player.dx < 0) player.x = boxes[i].x + boxes[i].width;
          if (player.dy > 0) player.y = boxes[i].y - player.height;
          if (player.dy < 0) player.y = boxes[i].y + boxes[i].height;
        }
        break;
      }
    }

    // Hindra spelaren från att gå igenom lådan
    let overlapX = player.x < boxes[i].x + boxes[i].width && player.x + player.width > boxes[i].x;
    let overlapY = player.y < boxes[i].y + boxes[i].height && player.y + player.height > boxes[i].y;
    if (overlapX && overlapY && !pushed) {
      let dxLeft = Math.abs((player.x + player.width) - boxes[i].x);
      let dxRight = Math.abs(player.x - (boxes[i].x + boxes[i].width));
      let dyTop = Math.abs((player.y + player.height) - boxes[i].y);
      let dyBottom = Math.abs(player.y - (boxes[i].y + boxes[i].height));
      let minDist = Math.min(dxLeft, dxRight, dyTop, dyBottom);

      if (minDist === dxLeft) {
        player.x = boxes[i].x - player.width;
      } else if (minDist === dxRight) {
        player.x = boxes[i].x + boxes[i].width;
      } else if (minDist === dyTop) {
        player.y = boxes[i].y - player.height;
      } else if (minDist === dyBottom) {
        player.y = boxes[i].y + boxes[i].height;
      }
    }
  }
}

// Ritar lådan på spelplanen
function drawBox() {
  for (let i = 0; i < boxes.length; i++) {
    canvas.fillStyle = boxes[i].color;
    make_base("../bilder/box.png", boxes[i].x, boxes[i].y, boxes[i].width, boxes[i].height);
  }
}