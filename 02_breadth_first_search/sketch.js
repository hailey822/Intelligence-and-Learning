var data;
var graph;
var dropdown;
var pos;

function preload(){
  data = loadJSON('bacon.json');
}

function setup(){
  pos = 100;
  graph = new Graph();

  dropdown = createSelect();
  dropdown.position(60, 50);
  dropdown.changed(bfs)
  createCanvas(windowWidth, windowHeight);
  background(51);


  var movies = data.movies;

  for (var i=0; i< movies.length; i++){
    var movie = movies[i].title;
    var cast = movies[i].cast;
    var movieNode = new Node(movie);
    graph.addNode(movieNode);

    for (var j=0; j<cast.length; j++) {
      var actor = cast[j];
      // check redundant actor
      var actorNode = graph.getNode(actor);
      if (actorNode == undefined){
        actorNode = new Node(actor);
        dropdown.option(actor);
      }
      graph.addNode(actorNode);
      movieNode.addEdge(actorNode);
    }

  }

}

function bfs(){
  graph.reset();
  var start = graph.setStart(dropdown.value());
  //var start = graph.setStart("Kevin Bacon");
  var end = graph.setEnd("Kevin Bacon");

  //console.log(graph);

  var queue = [];

  start.searched = true;
  queue.push(start);

  while (queue.length > 0) {
    var current = queue.shift();
    console.log(current.value);

    if (current == end){
      console.log("Found : " + current.value);
      break;
    }

    var edges = current.edges;

    for (var i=0; i<edges.length; i++){
      var neighbor = edges[i];
      if (!neighbor.searched) {
        neighbor.searched = true;
        neighbor.parent = current;
        queue.push(neighbor);
      }
    }
  }

  var path = [];

  path.push(end);
  var next = end.parent;
  while (next != null){
    path.push(next);
    next = next.parent;
  }

  var txt = '';
  for (var i=path.length-1; i>=0; i--){
    var n = path[i];
    txt += n.value
    if ( i != 0) {
      txt +=  ' --> ';
    }
  }

  fill(255);
  textSize(20);
  //textAligh(CENTER);
  text(txt, 50, pos);
  pos += 50;

}
