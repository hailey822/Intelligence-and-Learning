function mazeGeneration(){

  current.visited = true;

  // STEP 1
  var next = current.checkNeighbors();

  if (next){
    next.visited = true;
    //STEP 2
    stack.push(current);

    //STEP 3
    removeWalls(current, next);
    current = next;
  } else if (stack.length > 0) {
    current = stack.pop();
  }

  // finished generating maze
  if (current == grid[0][0]){
    mazing = false;
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        grid[i][j].addNeighbors();
      }
    }
  }

}
