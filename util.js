function checkResult() {
  winner = checkWinner();
  tie = checkTie();
  if (winner) {
    won();

    noLoop();
  } else if (tie) {
    for (let i = 0; i < 3; i++)
      for (let j = 0; j < 3; j++)
        cells[i][j].tie();
    tied();
    noLoop();
  }
}

function checkWithin() {
  var w = width / 3;
  var h = height / 3;
  ind[0] = floor(mouseX / w);
  ind[1] = floor(mouseY / h);
}

function drawBoard() {
  let w = width / 3;
  let h = height / 3;
  for (let i = 1; i < 3; i++) {
    stroke(150);
    strokeWeight(2);
    line(i * w, 0, i * w, height);
    line(0, i * w, width, i * w);
  }
}

function checkWinner() {
  for (let i = 0; i < 3; i++) {
    if (cells[i][0].item == cells[i][1].item &&
      cells[i][2].item == cells[i][1].item &&
      cells[i][0].item != -1) {
      ind[0] = i;
      ind[1] = 0;
      winCells=[[i,0],[i,1],[i,2]];
      return true;
    }
  }
  for (let i = 0; i < 3; i++) {
    if (cells[0][i].item == cells[1][i].item &&
      cells[2][i].item == cells[1][i].item &&
      cells[0][i].item != -1) {
      winCells=[[0,i],[1,i],[2,i]];
      ind[0] = 0;
      ind[1] = i;
      return true;
    }
  }
  if (cells[0][0].item == cells[1][1].item &&
    cells[1][1].item == cells[2][2].item &&
    cells[0][0].item != -1) {
    winCells=[[0,0],[1,1],[2,2]];
    ind[0] = 0;
    ind[1] = 0;
    return true;
  }
  if (cells[2][0].item == cells[1][1].item &&
    cells[1][1].item == cells[0][2].item &&
    cells[2][0].item != -1) {
    winCells=[[0,2],[1,1],[2,0]];
    ind[0] = 0;
    ind[1] = 2;
    return true;
  }
  return false;
}

function checkTie() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (cells[i][j].item == -1)
        return false;
    }
  }
  return true;
}

function won() {
  cells[winCells[0][0]][winCells[0][1]].won();
  cells[winCells[1][0]][winCells[1][1]].won();
  cells[winCells[2][0]][winCells[2][1]].won();
  banner.html("Winner is " + cells[ind[0]][ind[1]].item);
  banner.style('text-align', 'center');
  p2.style('font-size', '35');
  banner.style('color', '#413EF9');
  banner.style('margin-bottom', '15px');
  winner=true;
}

function tied() {
  for(let i=0;i<3;i++)
    for(let j=0;j<3;j++)
      cells[i][j].tie();
  p2.html("Its a Tie");
  p2.style('text-align', 'center');
  p2.style('font-size', '35');
  p2.style('color', '#DB3434');
  p2.style('margin-bottom', '25px');
  winner=true;
}
