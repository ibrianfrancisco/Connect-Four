// VARIABLES //
var player_one = {
  locationX: 0,
  locationY: 0,
  bgColor: 'red',
  gameChipX: [],
  gameChipY: []
}

var player_two = {
  locationX: 0,
  locationY: 0,
  bgColor: 'yellow',
  gameChipX: [],
  gameChipY: []
}

var playerA = new Object(player_one);
var playerB = new Object(player_two);

var player = 1;
var $reset = $('#reset');
var $undo = $('#undo');
var $board = $('#board');
var $column = $('#column1');
var $block = $('div.block');
var winner = null;
var board = [[0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0],
             [0,0,0,0,0,0,0]];

var columnCount = [6,6,6,6,6,6];
var rows = board.length;
var columns = board[0].length;

// EVENT LISTENERS //
function eventListeners() {
  $board.on('click', 'div.block', handleClick)
}


// FUNCTIONS //
function createBoard() {
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      var block = document.createElement('div');
      block.setAttribute('class', 'block');
      block.setAttribute('row', i);
      block.setAttribute('column', j);
      $board.append(block);
      if(board[i][j]===1) {
        block.style.backgroundColor = playerA.bgColor;
      }
      if(board[i][j]===2) {
        block.style.backgroundColor = playerB.bgColor;
      }
    }
  }

  // var $blocks = $('.block');

  // for (var i=0; i < $blocks.length; i++) {
  //   $blocks.eq(i).attr('data-value', i);
  // }

  eventListeners();
}


function makeMove() {
}

function positionIsTaken(x_pos, y_pos) {
  var value = board[y_pos][x_pos];

  return value === 0 ? false : true;
};

function init() {
  createBoard();
}


function render() {
}


function checkWinner(){
}

function dropItLikeItsHot(x_pos, y_pos) {
  for (var y = 5; y > y_pos; y--) {
    if (board[y][x_pos] === 0) {
      return y;
    }
  }

  return y_pos;
}

function addValueToBoard(color, x_pos, y_pos) {
    board[y_pos][x_pos] = color;
};

// function playTurn(y, turn) {
//   var coinLocation = columnCount(y);

//   if (coinLocation > 0) {

//   }
// }

// function eventHandler(evt) {
//   var tempX;
//   var tempY;
//   var tempTurn = player;

//   if(player===0) {
//     tempY = playerA.locationY;
//   }
// }


function handleClick() {
  var y_pos = $(this).attr('row');
  var x_pos = $(this).attr('column');

  // console.log(x_pos, y_pos);
  y_pos = dropItLikeItsHot(x_pos, y_pos);
  // console.log(y_pos);

  if (positionIsTaken(x_pos, y_pos)) {
    return;
  }


  addValueToBoard(player, x_pos, y_pos);
  // createBoard();
  render();

  player = (player === 1) ? 2 : 1;
  checkWinner();
}

createBoard();


// var y_pos = $('#board .column').index($(this).closest('.block'));
// var x_pos = $(this).closest('.block').find('.block').index($(this).closest('.block'));
