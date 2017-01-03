// VARIABLES //
var player = 1;
var $reset = $('#reset');
var $board = $('#board');
var $block = $('div.block');
var $msg = $('#message');
var board = [[0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0]];
var rows = board.length;
var columns = board[0].length;


// EVENT LISTENERS //
function eventListeners() {
  $board.on('click', 'div.block', makeMove)
  $reset.click(function() {
    location.reload();
  })
}


// FUNCTIONS //
function createBoard() {
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      var block = document.createElement('div');
      block.id = "loc" + String(i) + String(j);
      block.setAttribute('class', 'block');
      block.setAttribute('row', i);
      block.setAttribute('column', j);
      $board.append(block);
    }
  }
}


function dropPiece(x_pos, y_pos) {
  for (var y = 5; y > y_pos; y--) {
    if (board[y][x_pos] === 0) {
      return y;
    }
  }
  return y_pos;
}


function positionIsTaken(x_pos, y_pos) {
  var value = board[y_pos][x_pos];
  return value === 0 ? false : true;
}


function addValueToBoard(color, x_pos, y_pos) {
  board[y_pos][x_pos] = color;
}


function renderLocation(row, column) {
  var id = "#loc" + String(row) + String(column);
  var loc = $(id);
  if(board[row][column]===1) {
    loc.css('background-color', 'red');
  }
  if(board[row][column]===2) {
    loc.css('background-color', 'yellow');
  }
}


function checkVertWin() {
  for (var y = 0; y <= 2; y++) {
    for (var x = 0; x <= 6; x++) {
      if (board[y][x] != 0 && board[y][x] == board[y+1][x] && board[y][x] == board[y+2][x] && board[y][x] == board[y+3][x]) {
        return (player);
      }
   }
  }
}


function checkHorizWin() {
  for (var y = 0; y <= 5; y++) {
    for (var x = 0; x <= 3; x++) {
      if (board[y][x] != 0 && board[y][x] == board[y][x+1] && board[y][x] == board[y][x+2] && board[y][x] == board[y][x+3]) {
        return (player);
      }
    }
  }
}


function checkDiagDownWin() {
  for (var y = 0; y <= 2; y++) {
    for (var x = 0; x <= 3; x++) {
      if (board[y][x] != 0 && board[y][x] == board[y+1][x+1] && board[y][x] == board[y+2][x+2] && board[y][x] == board[y+3][x+3]) {
        return (player);
      }
    }
  }
}


function checkDiagUpWin() {
  for (var y = 3; y <= 5; y++) {
    for (var x = 0; x <= 3; x++) {
      if (board[y][x] != 0 && board[y][x] == board[y-1][x+1] && board[y][x] == board[y-2][x+2] && board[y][x] == board[y-3][x+3]) {
        return (player);
      }
    }
  }
}


// function gameIsDraw() {
//   for (var y = 0; y < rows; y++) {
//     for (var x = 0; x < columns; x++) {
//       return (board[y][x] > 0) ? true : false;
//     }
//   }
// }


function winner(play) {
  var declarePlayer = (play === 1) ? "Player 1 Wins!" : "Player 2 Wins!";
  $msg.html(declarePlayer);
  $board.unbind('click');
  return
}


function updateMsg(currentPlayer) {
  $msg.html("It is player " + currentPlayer + "'s turn");
}


function makeMove() {
  var y_pos = $(this).attr('row');
  var x_pos = $(this).attr('column');
  y_pos = dropPiece(x_pos, y_pos);
  if (positionIsTaken(x_pos, y_pos)) {
    return;
  }
  addValueToBoard(player, x_pos, y_pos);
  renderLocation(y_pos, x_pos);
  if (checkHorizWin() || checkVertWin() || checkDiagUpWin() || checkDiagDownWin()) {
    winner(player);
    return;
  }
  player = (player === 1) ? 2 : 1;
  updateMsg(player);
  // gameIsDraw();
  // if (gameIsDraw === true) {
  //   $msg.html('Tie Game!');
  // }
}

function init() {
  createBoard();
  eventListeners();
}

init();
