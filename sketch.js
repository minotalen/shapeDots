/*
  controls
  Space on Shape: toggle on/off
  Drag on Shape: move Shape
  Tabulator: stop drawing
  num 1: add Shaape
  v: toggle Shaape visibility
  g: toggle grid visibility

  shape 5 is not functional yet
*/
let shaapes = [];

let grid;
let gridgrid;
let dotmatrix;

//colors
let blue;
let darkBlue;
let red;
let yellow;
let grey;
const transparent = 220;
let opaque = 170;

//visibility toggle
let shapeVis;
let gridVis;

let thisPress;
let lastPress;
let timeCount;

function setup() {
  frameRate(6);
  createCanvas(window.innerWidth-0, window.innerHeight-4 );

  blue = color(0, 250, 250, transparent);
  blueP = color(0, 250, 250, opaque);
  darkBlue = color(150, 210, 210, transparent);
  red = color(255, 90, 90, transparent);
  redP = color(255, 90, 90, opaque);
  yellow = color(155, 250, 150, transparent);
  grey = color(100, 100, 100, transparent);
  purple = color(245, 45, 285, transparent);
  purpleP = color(245, 45, 285, opaque);

  shapeVis = true;
  gridVis = true;

  lastPress = millis();
  timeCount = 1;

  shaapes.push(new Shaape(width*.5/9, height*.5/9, blue, false)); // Shaape 0
  shaapes.push(new Shaape(width*2.5/9, height*2.5/9, red, true));
  shaapes.push(new Shaape(width*8.5/9, height*8.5/9, yellow, false));
  shaapes.push(new Shaape(width*4.5/9, height*2.5/9, grey, false));
  shaapes.push(new Shaape(width*6.5/9, height*6.5/9, darkBlue, false));
  shaapes.push(new Shaape(width*4.5/9, height*6.5/9, purple, false)); // Shaape 5


  grid = new Grid(9, 9, grey, false);
  gridgrid = new Grid(5, 5, purple, true)
  dotmatrix = new Dots(blue);
}

function draw() {
  background(0);

  //draw and update grid
  if (gridVis) {
    grid.draw();
    // gridgrid.draw();
    gridgrid.update();
  }
  // grid.debug();
  // gridgrid.debug();

  //draw and update dots
  dotmatrix.draw();
  dotmatrix.update();
  dotmatrix.debug();

  //draw and update shaapes
  for (i = 0; i < shaapes.length; i++) {
    shaapes[i].update();
    if (mouseIsPressed && shaapes[i].dragging) {
      shaapes[i].follow(mouseX, mouseY);
      // console.log("dragging ", i);
    }
    if (shapeVis) {
      shaapes[i].draw();
    }
    //shaapes[i].debug(i);
  }
}

function mousePressed() {
  thisPress = millis();

  for (i = 0; i < shaapes.length; i++) {
    if (shaapes[i].collision(mouseX, mouseY)) {
      shaapes[i].dragging = true;
      console.log("click! ", lastPress, thisPress);
      if (thisPress - lastPress < 200 ) {
          console.log("toggled ", i, "    doubleclick")
          shaapes[i].toggle();
          lastPress = thisPress;
      }
    }
  }
  lastPress = thisPress;
}

function keyPressed() {
  if (key == ' ') {
    for (i = 0; i < shaapes.length; i++) {
      if (shaapes[i].collision(mouseX, mouseY)) {
        console.log("toggled ", i, "    spacebar")
        shaapes[i].toggle();
      }
    }
  }

  if (key == "TAB") {
    noLoop();
  }

  // if (key == "1") {
  //   shaapes.push(new Shaape(mouseX, mouseY, red));
  // }

  if (key == "v") {
    if (shapeVis) {
      shapeVis = false;
    } else {
      shapeVis = true;
    }
  }

  if (key == "g") {
    if (gridVis) {
      gridVis = false;
    } else {
      gridVis = true;
    }
  }

  if (key == "q") {
    timeCount -= 1;
  }

  if (key == "w") {
    dotmatrix.timeShift(-1);
  }


  if (key == "e") {
    dotmatrix.timeShift(1);
  }

  if (key == "r") {
    timeCount += 1;
  }
}

function mouseReleased() {
  for (i = 0; i < shaapes.length; i++) {
    shaapes[i].dragging = false;
  }
}
