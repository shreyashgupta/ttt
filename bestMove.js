function ai() {
  let move = [];
  let bestScore = -Infinity;
  let score;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (cells[i][j].item == -1) {
        cells[i][j].item = 'O';
        score = minimax(cells, 1, false);
        cells[i][j].item = -1;
        if (score > bestScore) {
          bestScore = score;
          move[0] = i;
          move[1] = j;
          //print(ind[0],ind[1]);
        }

      }
    }
  }
  if (cells[move[0]][move[1]].item == -1)
    cells[move[0]][move[1]].takeTurn();
  else
    return;

  //print(cells);
}

function minimax(board, depth, isMaximizing) {
  let w = checkWinner();
  let t = checkTie();
  if (w) {
    if (board[ind[0]][ind[1]].item == 'O')
      return 15 - depth;
    else
      return -15 + depth;
  } else if (t) {
    return 0;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j].item == -1) {
          board[i][j].item = '0';
          let score = minimax(board, depth + 1, false);
          board[i][j].item = -1;
          //winner=false;
          //tie=false;
          bestScore = max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j].item == -1) {
          board[i][j].item = 'X';
          let score = minimax(board, depth + 1, true);
          board[i][j].item = -1;
          //winner=false;
          //tie=false;
          bestScore = min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}