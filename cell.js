class Cell {
  constructor(i, j) {
    this.col = color(0);
    this.x = width / 3 * (i - 1 / 2);
    this.y = height / 3 * (j - 1 / 2);
    this.item = -1;
  }
  display() {
    ellipse(this.x, this.y, 20, 20);
  }
  takeTurn() {
    var w = width / 3;
    var h = height / 3;
    if (turn == 0) {
      stroke(255);
      strokeWeight(4);
      line(this.x - w / 4, this.y - w / 4, this.x + w / 4, this.y + w / 4);
      line(this.x + w / 4, this.y - w / 4, this.x - w / 4, this.y + w / 4);
    } else {
      stroke(255);
      strokeWeight(4);
      noFill();
      ellipse(this.x, this.y, w / 2, w / 2);
    }
    this.item = Players[turn];
    turn = (turn + 1) % 2;
  }
  won() {
    fill('rgba(0,255,0,0.5)');
    noStroke();
    rect(this.x,this.y,width/3,height/3);
  }
  tie() {
    fill('rgba(255,0,0,.4)');
    noStroke();
    rect(this.x,this.y,width/3,height/3);
  }
}
