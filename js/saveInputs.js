document.addEventListener("keydown", down);
document.addEventListener("keyup", up);
let actions = {};
let startTime = Date.now();


document.getElementById("actions").value = "";
document.getElementById("time").value = startTime;

function down(key) {
  if (draw_interval != null) {
    actions[Date.now() - startTime] = key.key;
    document.getElementById("actions").value += Date.now() - startTime + " " + key.keyCode + " keydown" + ",";
    console.log(document.getElementById("actions").value);
  }
}

function up(key) {
  if (draw_interval != null) {
    actions[Date.now() - startTime] = key.key;
    document.getElementById("actions").value += Date.now() - startTime + " " + key.keyCode + " keyup" + ",";
    console.log(document.getElementById("actions").value);
  }
}