function pathFinding(){
  // Am I still searching?
  if (openSet.length > 0) {

    // Best next option
    var winner = 0;
    for (var i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }

    var current = openSet[winner];

    // Did I finish?
    if (current === end) {
      noLoop();
      console.log("DONE!");
    }

    // Best option moves from openSet to closedSet
    removeFromArray(openSet, current);
    closedSet.push(current);

    // Check all the neighbors
    var neighbors = current.neighbors;
    for (var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];

      // Valid next spot?
      if (!closedSet.includes(neighbor)) {
        var tempG = current.g + 1;
        var newPath = false;
        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
            //better
            newPath  = true;
          }
        } else {
          neighbor.g = tempG;
          // newly found
          newPath = true;
          openSet.push(neighbor);
        }

        if (newPath){
          neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
        }

      }
    }
  } else { // no solution
    console.log('no solution');
    noLoop();
    return;

  }

  // Draw current state of everything
  background(51);

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].wall();
    }
  }

  // for (var i = 0; i < closedSet.length; i++) {
  //   closedSet[i].show(color(255, 0, 0, 50));
  // }
  //
  // for (var i = 0; i < openSet.length; i++) {
  //   openSet[i].show(color(0, 255, 0, 50));
  // }


  path = [];
  var temp = current;
  path.push(temp);
  while (temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  }


  for (var i = 0; i < path.length; i++) {
    path[i].show(color(255, 0, 255, 50));
  }

  noFill();
  stroke(255, 255, 0, 50);
  beginShape();
  for (var i=0; i<path.length; i++){
    vertex(path[i].i*w + w/2, path[i].j *h + h/2)
  }
  endShape();

}
