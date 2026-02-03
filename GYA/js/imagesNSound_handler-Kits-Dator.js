// Laddar alla bilder när spelet startar
const loadImages = {};

// Mapping för väggtyper (1-14) till textur-filer
const wallTextures = {
  1: "../bilder/wall_tile-set1.png",
  2: "../bilder/wall_tile-set2.png",
  3: "../bilder/wall_tile-set3.png",
  4: "../bilder/wall_tile-set4.png",
  5: "../bilder/wall_tile-set5.png",
  6: "../bilder/wall_tile-set6.png",
  7: "../bilder/wall_tile-set7.png",
  8: "../bilder/wall_tile-set8.png",
  9: "../bilder/wall_tile-set9.png",
  10: "../bilder/wall_tile-set10.png",
  11: "../bilder/wall_tile-set11.png",
  12: "../bilder/wall_tile-set12.png",
  13: "../bilder/wall_tile-set13.png",
  14: "../bilder/wall_tile-set14.png",
  "b": "../bilder/bookshelf.png"
};

function preloadImage(src) {
  // Om filen inte finns i arrayen, skapa ny och lägg i arrayen
  if (!loadImages[src]) {
    let img = new Image();
    img.src = src;
    loadImages[src] = img;
  }
  return loadImages[src];
}

// Ritar bilderna på objekten
function make_base(src, x, y, width, height){
  let base_image = preloadImage(src);
  canvas.drawImage(base_image, x, y, width, height);
}
