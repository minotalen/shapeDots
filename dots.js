function Dots() {
  this.offset = 10;
  this.r;
  this.maxSize = 77;
  this.var = 0;

  this.draw = function() {
    this.x = 10;
    this.y = 10;
    if (shaapes[0].toggle) { //shaape 0 influences grid number
      if (shaapes[4].toggle) {
        this.x += shaapes[0].gridX + shaapes[4].gridX*2;
        this.y += shaapes[0].gridY + shaapes[4].gridY*2;
      } else {
        this.x += shaapes[0].gridX;
        this.y += shaapes[0].gridY;
      }
    }

    if(shaapes[3].toggle) {
        this.r = this.maxSize*(shaapes[3].gridX+1 + shaapes[3].gridY*grid.x)/(grid.x*grid.y);
    } else {
      this.r = 12;
    }

    this.W = (width - this.r*2 - this.offset*2)  / (this.x-1); //calculates the width of a single grid element
    this.H = (height - this.r*2 - this.offset*2) / (this.y-1);

    fill(blue);
    noStroke();
    for(i = 0; i < this.x; i++) {
      for(j = 0; j < this.y; j++) {
        //check shape one (the OR shape)
        if(shaapes[1].toggle) {
          if ( (j+1 + i*this.y) % (shaapes[1].gridX +1) == 0
            || (j+1 + i*this.y) % shaapes[1].gridY == 0) {
            if ((j+1 + i*this.y) % (shaapes[1].gridX +1) == 0
                && (j+1 + i*this.y) % shaapes[1].gridY == 0 ) {
                  fill(red);
                } else {
                  fill(blue);
                }
            ellipse (this.offset + this.r + this.W*i, this.offset + this.r + this.H*j, this.r*2, this.r*2);
          }
        } else {
          fill(blue);
          ellipse (this.offset + this.r + this.W*i, this.offset + this.r + this.H*j, this.r*2, this.r*2);
        }

        //check shape two (the AND shape)
        if(shaapes[2].toggle
          && (j+1 + i*this.y) % (shaapes[2].gridX +1) == 0
          && (j+1 + i*this.y) % shaapes[2].gridY == 0) {
            fill(yellow);
            rect (this.offset + this.W*i, this.offset + this.H*j, this.r*2, this.r*2);
        }
      }
    }

  }

  this.debug = function(shapeNum) {
  }
}
