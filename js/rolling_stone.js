function loadR_s(level) {
  // Töm alla gamla lådor
  r_s.length = 0;

  // Loopa igenom världen och skapa lådor där det finns "4"
  for (let y = 0; y < world[level].length; y++) {
    for (let x = 0; x < world[level][y].length; x++) {
      if (world[level][y][x] === "r") {
        r_s.push({
          x: x * tile_size * 1.2,
          y: y * tile_size * 1.2,
          width: tile_size * 1.6,
          height: tile_size * 1.6,
          color: "purple",
          speed: 1,
          is_moving: false
        });
      }
    }
  }
}

function r_s_animation() {
  
}

// Ritar lådan på spelplanen
function drawR_s() {
  for (i = 0; i < r_s.length; i++) {
    make_base(r_sTextures[1], r_s[i].x, r_s[i].y, r_s[i].width, r_s[i].height);
  }
}

function moveR_s() {
  for (let i = 0; i < r_s.length; i++) {
    if (player.x > tile_size * 6) {
      r_s[i].is_moving = true;

      if (r_s[i].x >= canvas.canvas.width - tile_size * 1.75) {
        r_s[i].is_moving = false;
        r_s[i].speed = 0;
      }
    }

    // Flyttar stenen mot väggen
    if (r_s[i].is_moving) {
      r_s[i].x += r_s[i].speed;
      r_s[i].color = "red";
      // Resettar spelaren vid kollision
      if (player.x < (r_s[i].x + r_s[i].width) && player.x + player.width > (r_s[i].x) && player.y < (r_s[i].y + r_s[i].height) && player.y + player.height > (r_s[i].y) && r_s[i].is_moving) {
        player.x = tile_size * 3;
        player.y = tile_size * 5;
        load();
      }
      // Spelaren kan kollidera med den rullande stenen utan fara
    } else {
      r_s[i].color = "purple";
      if (player.x < (r_s[i].x + r_s[i].width) && player.x + player.width > (r_s[i].x) && (player.y < (r_s[i].y + r_s[i].height) && player.y + player.height > (r_s[i].y)) && !r_s[i].is_moving) {
        player.x -= player.dx * player.speed;
        player.y -= player.dy * player.speed;
      };
    };
  }
}