function Cell(i,j) {
  this.i = i;
  this.j = j;
  // top, right, bottom, left
  this.walls = [true, true, true, true];
  this.visited = false;

  this.neighbors = [];
  this.previous = undefined;

  this.highlight = function(){
    noStroke();
    fill(255, 255, 0, 100);
    rect(this.i * w, this.j * h, w, h);
  }

  this.wall = function(){
    var x = this.i * w;
    var y = this.j * w;
    stroke(255);
    if (this.walls[0]){ line(x  , y  , x+w, y  ); }
    if (this.walls[1]){ line(x+w, y  , x+w, y+w); }
    if (this.walls[2]){ line(x+w, y+w, x  , y+w); }
    if (this.walls[3]){ line(x  , y+w , x  , y  ); }
  }

  this.show = function(color){
    fill(color);
    noStroke();
    rect(this.i * w, this.j * h, w, h);
  }


  this.checkNeighbors = function(){
    var temp = [];
    var i= this.i; var j = this.j;
    if (j > 0) {
      var top = grid[i][j - 1];
      if (!top.visited)  {temp.push(top); }
    }
    if (i < cols - 1) {
      var right = grid[i + 1][j];
      if (!right.visited) {temp.push(right); }
    }
    if (j < rows - 1) {
      var bottom = grid[i][j + 1];
      if (!bottom.visited) { temp.push(bottom); }
    }
    if (i > 0) {
      var left = grid[i - 1][j];
      if (!left.visited) { temp.push(left); }
    }


    if (temp.length>0){
      var r = floor(random(0, temp.length));
      return temp[r];
    }
    else {
      return undefined;
    }

  }


  this.addNeighbors = function(){
      var i = this.i;
      var j = this.j;
      if (!this.walls[0]) { this.neighbors.push(grid[i][j-1]); }
      if (!this.walls[1]) { this.neighbors.push(grid[i+1][j]); }
      if (!this.walls[2]) { this.neighbors.push(grid[i][j+1]); }
      if (!this.walls[3]) { this.neighbors.push(grid[i-1][j]); }
  }

}



//removing walls between two cells
function removeWalls(current, next){
  //walls[top, right, bottom, left]
  var x = current.i - next.i;
  if (  x == 1) {
    current.walls[3] = false;
    next.walls[1] = false;
  }
  else if ( x == -1) {
    current.walls[1] = false;
    next.walls[3] = false;
  }

  var y = current.j - next.j;
  if (  y == 1) {
    current.walls[0] = false;
    next.walls[2] = false;
  }
  else if ( y == -1) {
    current.walls[2] = false;
    next.walls[0] = false;
  }

}
