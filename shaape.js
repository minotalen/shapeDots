function Shaape(x, y, col, state) {
  this.r = 35;
  this.x = x;
  this.y = y;

  this.gridX;
  this.gridY;

  this.state = state;
  this.dragging = false;
  this.factor = 0.35;

  this.color = col;
  this.shade = color(0, 0, 0, 0);


  this.draw = function() {
    stroke(255);
    if (this.state) {
      strokeWeight(3);
      fill(this.color);
    } else {
      strokeWeight(1);
      fill(lerpColor(this.color, this.shade, 0.5));
    }
    ellipse(this.x, this.y, this.r*2, this.r*2);
  }

  this.update = function() {
    this.x == constrain(this.x + random(-2, 2), 0+this.r, width-this.r*2);
    this.y == constrain(this.x + random(-2, 2), 0+this.r, height-this.r*2);
    this.gridX = grid.getPos(this.x, grid.W);
    this.gridY = grid.getPos(this.y, grid.H);
  }

  this.toggle = function() {
    if (this.state) {
      this.state = false;
    } else {
      this.state = true;
    }
  }

  this.collision = function(x, y) {
    let d = dist(x, y, this.x, this.y);
    if (d <= this.r) {
      return true;
    } else {
      return false;
    }
  }

  this.follow = function(x, y) {
    this.x = constrain(lerp(this.x, x, this.factor), 0+this.r, width-this.r);
    this.y = constrain(lerp(this.y, y, this.factor), 0+this.r, height-this.r);
  }

  this.debug = function(shapeNum) {
    //console.log(shapeNum, shaapes.x, shaapes.y);
    console.log(shapeNum, this.dragging, this.gridX, this.gridY);
  }
}
