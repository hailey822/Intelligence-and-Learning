var cols = 20;
var rows = 20;
var w, h;
var grid = new Array(cols);

var current;
var mazing =true;
var stack = [];


var openSet = [];
var closedSet = [];
var start;
var end;
var path = [];

function removeFromArray(arr, elt) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == elt) {
      arr.splice(i, 1);
    }
  }
}


function heuristic(a, b) {
  var d = dist(a.i, a.j, b.i, b.j);
  return d;
}


function setup() {
  createCanvas(500, 500);
  w = width / cols;
  h = height / rows;

  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j);
    }
  }

  current = grid[0][0];

    // Start and end
  start = grid[0][0];
  end = grid[cols - 1][rows - 1];
  // openSet starts with beginning only
  openSet.push(start);
}


function draw(){
  background(51);

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].wall();
    }
  }

  current.highlight();
  if (mazing){
    mazeGeneration();
  } else {
    pathFinding();
  }



}
