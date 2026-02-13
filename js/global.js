// Globala variabler
const canvas = document.getElementById("canvas").getContext("2d");
let tile_size = 40;
let fullScreen = false;
let gameloop = true;
let levelChanger = document.getElementById("levelChanger");

// level 1 är standard
let level = 2;

let transitionScreen = false;
let transitionDiameter = 0;

// Blocktyper som skapar kollision med spelaren
let blockedTypes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, "b"];

const stones = [];
const bushes = [];
const doors = [];
const boxes = [];
const r_s = [];
const p_p = [];
const gate = [];


