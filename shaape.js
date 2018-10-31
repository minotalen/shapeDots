function Shaape(x, y, col, toggle) {
  this.r = 35;
  this.x = x;
  this.y = y;

  this.gridX = 3;
  this.gridY =3;

  this.toggle = toggle;
  this.dragging = false;
  this.factor = 0.05;

  this.color = col;
  this.shade = color(0, 0, 0, 100);


  this.draw = function() {
    stroke(255);
    strokeWeight(3);
    if (this.toggle) {
      this.color[3] = 0.2;
      fill(this.color);
    } else {
      // this.color[3] = 0.3;
      fill(lerpColor(this.color, this.shade, 0.5));
    }
    ellipse(this.x, this.y, this.r*2, this.r*2);
  }

  this.update = function() {
    this.x += random(-2, 2);
    this.y += random(-2, 2);
    this.gridX = grid.getPos(this.x, grid.W);
    this.gridY = grid.getPos(this.y, grid.H);
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
    this.x = constrain(lerp(this.x, x, this.factor), 0, width-this.r);
    this.y = constrain(lerp(this.y, y, this.factor), 0, height-this.r);
  }

  this.debug = function(shapeNum) {
    //console.log(shapeNum, shaapes.x, shaapes.y);
    console.log(shapeNum, this.dragging, this.gridX, this.gridY);
  }
}
