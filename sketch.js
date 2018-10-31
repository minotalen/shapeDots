/*
  controls
  Space on Shape: toggle on/off
  Drag on Shape: move Shape
  Tabulator: stop drawing
  num 1: add Shaape
  v: toggle Shaape visibility
  g: toggle grid visibility
*/
let shaapes = [];
let dotgrid;
let grid;

let blue;
let darkBlue;
let red;
let yellow;
let grey;

let shapeVis;
let gridVis;

function setup() {
  createCanvas(window.innerWidth-60, window.innerHeight-60);

  blue = color(0, 200, 200, 250);
  darkBlue = color(30, 130, 130, 250);
  red = color(255, 50, 50, 250);
  yellow = color(55, 250, 50, 250);
  grey = color(100, 100, 100);
  purple = color(145, 45, 185);

  shapeVis = true;
  gridVis = true;

  shaapes.push(new Shaape(width/2, height/2, blue, true)); // Shaape 0
  shaapes.push(new Shaape(width/3, height/3, red, true));
  shaapes.push(new Shaape(width*2/3, height*2/3, yellow, false));
  shaapes.push(new Shaape(width*1/3, height*2/3, grey, false));
  shaapes.push(new Shaape(width*3/4, height*3/4, darkBlue, false));
  shaapes.push(new Shaape(width*3/4, height*1/4, purple, false)); // Shaape 5


  grid = new Grid(9, 9, grey, false);
  gridgrid = new Grid(5, 5, purple, true)
  dotgrid = new Dots(blue);
}

function draw() {
  background(0);

  if (gridVis) {
    grid.draw();
    gridgrid.draw();
  }
  //grid.debug();

  dotgrid.draw();

  for (i = 0; i < shaapes.length; i++) {
    if (mouseIsPressed && shaapes[i].dragging) {
      shaapes[i].follow(mouseX, mouseY);
      // console.log("dragging ", i);
    }
    if (shapeVis) {
      shaapes[i].draw();
    }
    shaapes[i].update();
    shaapes[i].debug(i);
  }
}

function mousePressed() {
  for (i = 0; i < shaapes.length; i++) {
    if (shaapes[i].collision(mouseX, mouseY)) {
      shaapes[i].dragging = true;
    }
  }
}

function keyPressed() {
  if (key == ' ') {
    for (i = 0; i < shaapes.length; i++) {
      if (shaapes[i].collision(mouseX, mouseY)) {
        console.log("hit ", i)
        if (shaapes[i].toggle) {
          shaapes[i].toggle = false;
        } else {
          shaapes[i].toggle = true;
        }
      }
    }
  }
  if (key == "TAB") {
    noLoop();
  }
  if (key == "1") {
    shaapes.push(new Shaape(mouseX, mouseY, red));
  }

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
}

function mouseReleased() {
  for (i = 0; i < shaapes.length; i++) {
    shaapes[i].dragging = false;
  }
}
