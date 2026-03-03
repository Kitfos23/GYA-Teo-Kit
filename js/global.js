// Globala variabler
const canvas = document.getElementById("canvas").getContext("2d");
let tile_size = 40;
let fullScreen = false;
let levelChanger = document.getElementById("levelChanger");

// level 1 är standard
let level = 4;

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

// Första bilden för r_s
let current_img = 1
let animation_cooldown = 0;

// Sätter standard skärmupplösningen
document.getElementById("screenSwitcher").innerHTML = "pc";
screenType = "pc";
// document.getElementById("screenSwitcher").innerHTML = "laptop";
// screenType = "laptop";

// Gör skärmen ljusare när spelaren närmar sig skärmens kant på sista nivån
const fadeDistance = tile_size * 6;


