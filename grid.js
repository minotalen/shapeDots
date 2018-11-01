function Grid(x, y, col, draw) {
  this.x = x;
  this.y = y;
  this.W = width / this.x; //calculates the width of a single grid element
  this.H = height / this.y;
  this.color = col;

  this.update = function() {
    // if (shaapes[5].state) {
    //   grid.x == grid.x + shaapes[5].gridX;
    //   grid.y == grid.y + shaapes[5].gridY;
    // }
  }

  this.getPos = function(coordinate, amount) {
    return (coordinate - coordinate%amount) / amount +1;
  }

  this.draw = function() {
    if (this.draw) {
      for(i = 0; i <= this.x; i++) {
        stroke(this.color);
        strokeWeight(1);
        line(0, this.H*i, width, this.H*i);
      }
      for(i = 0; i <= this.y; i++) {
        stroke(this.color);
        strokeWeight(3);
        line(this.W*i, 0, this.W*i, height);
      }
    }
  }

  this.debug = function(shapeNum) {
    console.log("gridW: ", grid.W, " gridH: ", grid.H ," x: ", this.x," y: ", this.y);
  }
}
