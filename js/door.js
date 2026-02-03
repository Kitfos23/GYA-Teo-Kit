// Dörrkoll
function door(x, y) {
  let gridX = Math.floor(x / tile_size);
  let gridY = Math.floor(y / tile_size);
  if (gridY >= 0 && gridY < world[level].length && gridX >= 0 && gridX < world[level][gridY].length) {
    return world[level][gridY][gridX] == 3;
  }
  return false;
}