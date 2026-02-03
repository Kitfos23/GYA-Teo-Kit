function loadP_p(level) {
  // Töm alla gamla lådor
  p_p.length = 0;

  // Loopa igenom världen och skapa lådor där det finns "4"
  for (let y = 0; y < world[level].length; y++) {
    for (let x = 0; x < world[level][y].length; x++) {
      if (world[level][y][x] === "p") {
        p_p.push({
          x: x * tile_size - tile_size * 0.5,
          y: y * tile_size - tile_size * 0.5,
          width: tile_size * 2,
          height: tile_size * 2,
          color: "green",
          active: false
        });
      }
    }
  }
}

// Ritar lådan på spelplanen
function drawP_p(canvas) {
  for (i = 0; i < p_p.length; i++) {
    if (p_p[i].active) {
      make_base("../bilder/pressure_plate2.png", p_p[i].x, p_p[i].y, p_p[i].width, p_p[i].height);
    } else {
      make_base("../bilder/pressure_plate1.png", p_p[i].x, p_p[i].y, p_p[i].width, p_p[i].height);
    }
  }
}

function activateP_p() {
  // Spelaren står på tryck knappen
	for (i = 0; i < p_p.length; i++) {
    let changeColor = false;
    if (player.x < p_p[i].x + p_p[i].width && player.x + player.width > p_p[i].x && player.y < p_p[i].y + p_p[i].height && player.y + player.height > p_p[i].y) {
      changeColor = true;
    }

    // En låda ligger på tryck knappen
    for (j = 0; j < boxes.length; j++) {
      if (boxes[j].x < p_p[i].x + p_p[i].width && boxes[j].x + boxes[j].width > p_p[i].x && boxes[j].y < p_p[i].y + p_p[i].height && boxes[j].y + boxes[j].height > p_p[i].y) {
        changeColor = true;
      }
    }

    if (changeColor) {
      p_p[i].color = "lightgreen";
      p_p[i].active = true;
      openGate();
    } else {
      p_p[i].color = "green";
      p_p[i].active = false;
      closeGate();
    }
	}
}