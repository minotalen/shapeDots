function Dots() {
  this.gridOff = 10;
  this.r;
  this.maxSize = 77;
  this.var = 0;
  this.timeInc = 0;

  this.update = function() {
    timeCount += this.timeInc;
    if (shaapes[2].state) {
      opaque = map(shaapes[2].x, 0, width, 0, 255);
      console.log(opaque);
      this.colorCorrection()
    }
  }

  this.colorCorrection = function() {
    blue = color(0, 250, 250, transparent);
    blueP = color(0, 250, 250, opaque);
    darkBlue = color(150, 210, 210, transparent);
    red = color(255, 90, 90, transparent);
    redP = color(255, 90, 90, opaque);
    yellow = color(155, 250, 150, transparent);
    grey = color(100, 100, 100, transparent);
    purple = color(245, 45, 285, transparent);
    purpleP = color(245, 45, 285, opaque);
  }

  this.draw = function() {
    this.x = 15;
    this.y = 10;
    if (shaapes[0].state) { //shaape 0 influences grid number
      this.x += shaapes[0].gridX;
      this.y += shaapes[0].gridY;
    } //shaape 4 influences grid number
    if (shaapes[4].state) {
      this.x *= shaapes[4].gridX;
      this.y *= shaapes[4].gridY;
    }
    if(shaapes[3].state) {
      this.r = this.maxSize*(shaapes[3].gridX+1 + shaapes[3].gridY*grid.x)/(grid.x*grid.y);
    } else {
      this.r = 12;
    }

    this.W = (width - this.r*2 - this.gridOff*2)  / (this.x-1); //calculates the width of a single grid element
    this.H = (height - this.r*2 - this.gridOff*2) / (this.y-1);

    fill(blue);
    noStroke();
    for(i = 0; i < this.x; i++) {
      for(j = 0; j < this.y; j++) {
        //check shape one (the OR shape)
        if(shaapes[1].state) {
          if(shaapes[5].state) {
            shaapeX = shaapes[1].gridX * (shaapes[5].gridX);
            shaapeY = shaapes[1].gridY * (shaapes[5].gridY);
          } else {
            shaapeX = shaapes[1].gridX;
            shaapeY = shaapes[1].gridY;
          }
          if ((timeCount + j + i*this.x) % shaapeX == 0
            || (j + i*(this.x+timeCount)) % shaapeY == 0) {
            fill(blueP);
            ellipse (this.gridOff + this.r + this.W*i, this.gridOff + this.r + this.H*j, this.r*2, this.r*2);
          }
        }
      }
    }

    for(i = 0; i < this.x; i++) {
      for(j = 0; j < this.y; j++) {
        if (shaapes[2].state
          && (timeCount + j + (i+timeCount)*this.x) % shaapeX == 0
          && (j + (i+timeCount)*this.x) % shaapeY == 0 ) {
          fill(purpleP);
          ellipse (this.gridOff + this.r + this.W*i, this.gridOff + this.r + this.H*j, this.r*2, this.r*2);
        }
      }
    }
  }

  this.timeShift = function(t) {
    this.timeInc += t;
    console.log("time steps increased by", t, ", steps are now", this.timeInc, ", current timestamp:", timeCount);
  }

  this.debug = function(shapeNum) {
  }
}
