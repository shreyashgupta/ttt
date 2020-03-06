let Players = ['X', 'O'];
let turn;
let cells = [
  [],
  [],
  []
];
let winCells=[[],[],[]];
let ind = [];
let btn;
let p2;
var winner = false,
  tie = false;
let banner;
let head;

function setup() {
  rectMode(CENTER);
  let cnv = createCanvas(300, 300);
  cnv.position(window.innerWidth / 2 - width / 2, window.height / 2);
  background(0);
  drawBoard();
  btn = createButton("RESET");
  btn.mousePressed(reset);
  btn.position(windowWidth / 2 - 25, window.height / 2 + width + 50);
  for (let i = 1; i <= 3; i++)
    for (let j = 1; j <= 3; j++) {
      cells[i - 1][j - 1] = new Cell(i, j);
    }
  turn = floor(random(2));
  head = createElement('h1', "TIC TAC TOE");
  head.style("text-align", 'center');
  head.style("font-size", '55px');
  head.style("margin", '10px');
  p2 = createElement('h1', "");
  banner = createElement('h1', "");
  if(turn)
  {
    ai();
  }
}

function draw() {

}

function mousePressed() {
  if (!winner) {
    if (!turn) {
      //human turn
      checkWithin();
      if (ind[0] >= 3 || ind[1] >= 3 || ind[0] < 0 || ind[1] < 0)
        return;
      if (cells[ind[0]][ind[1]].item == -1)
        cells[ind[0]][ind[1]].takeTurn();
      checkResult();
      ai();
    }
  checkResult();
  }
}

function reset() {
  cells = [
    [],
    [],
    []
  ];
  for (let i = 1; i <= 3; i++)
    for (let j = 1; j <= 3; j++) {
      cells[i - 1][j - 1] = new Cell(i, j);
    }
   turn =floor(random(2));

  background(0);
  drawBoard();
  banner.html("");
  p2.html("");
 
  winner = false;
  tie=false;
   if(turn)
    ai();
  loop();
}
