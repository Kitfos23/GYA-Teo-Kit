// Laddar alla bilder när spelet startar
const loadImages = {};

// Mapping för väggtyper (1-14) till textur-filer
const wallTextures = {
  "b": "../bilder/bookshelf.png"
};

// Laddar in vägg texturerna
for(let i = 1; i < 19; i++) {
  wallTextures[i] = "../bilder/wall_tile-set/wall_tile-set"+i+".png";
}

const gateTextures = [
  "../bilder/gate1.png",
  "../bilder/gate2.png"
]

// Laddar in spelarmodellen
const playerTextures = {};
for(let i = 1; i < 10; i++) {
  playerTextures[i] = "../bilder/playerFront/playerFront"+i+".png";
}

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
