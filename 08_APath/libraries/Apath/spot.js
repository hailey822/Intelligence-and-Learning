//f(n)=g(n)+h(n)
function Spot(i, j){
  this.i =  i;
  this.j = j;

  this.f = 0;
  this.g = 0;
  this.h = 0;

  this.neighbors = [];
  this.previous = undefined;

  this.wall = false;
  if (random(1)< 0.4 ){
    this.wall = true;
  }

  this.show = function(color){
    fill(color);
    if (this.wall){
      fill(200, 200);
    }
    noStroke();
    rect(this.i * w, this.j * h, w, h);
  }

  this.addNeighbors = function(grid){
    var i= this.i;
    var j = this.j;

    // left, right, bottom, right
    if (i < cols - 1) { this.neighbors.push(grid[i + 1][j]); }
    if (i > 0) { this.neighbors.push(grid[i - 1][j]); }
    if (j < rows - 1) { this.neighbors.push(grid[i][j + 1]); }
    if (j > 0) { this.neighbors.push(grid[i][j - 1]);}

    // diagonal
    if (i > 0 && j > 0) { this.neighbors.push(grid[i - 1][j - 1]);  }
    if (i < cols - 1 && j > 0) { this.neighbors.push(grid[i + 1][j - 1]);}
    if (i > 0 && j < rows - 1) { this.neighbors.push(grid[i - 1][j + 1]); }
    if (i < cols - 1 && j < rows - 1) { this.neighbors.push(grid[i + 1][j + 1]);}

  }
}
