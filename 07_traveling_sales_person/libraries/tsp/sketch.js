var cities = [];
var totalCities = 7;

// lexical order in array
var order = [];

// recording the best(shortest path)
var bestEver;  // array
var bestDistance = 0; // total distance

var totalPermutations;
var count = 0;


function setup(){
  createCanvas(600, 600);
  background(0);

  for (var i=0; i<totalCities; i++){
    var vector = createVector(random(10, width-10), random(10, height-10));
    cities[i] = vector;
    // initialize in increasing order
    order[i] = i;
  }

  bestDistance = calcDistance(cities, order);
  bestEver = order.slice();

  totalPermutations = factorial(totalCities);
  console.log(totalPermutations);
}

function draw(){
  background(0);
  //frameRate(5);

  // drawing cities(circles)
  noStroke();
  fill(255, 0, 255);
  for (var i=0; i<cities.length; i++){
    ellipse(cities[i].x, cities[i].y, 8, 8);
  }

  // draw the order currently checking
  stroke(255, 100);
  strokeWeight(1);
  noFill();
  beginShape();
  for (var i=0; i<order.length; i++){
    // drawing conenctions according to lexical order
    var n = order[i];
    vertex(cities[n].x, cities[n].y);
  }
  endShape();

  stroke(255);
  strokeWeight(2);
  noFill();
  beginShape();
  for (var i=0; i<order.length; i++){
    var n = bestEver[i];
    vertex(cities[n].x, cities[n].y);
  }
  endShape();


  var d = calcDistance(cities, order);
  if (d < bestDistance) {
    bestDistance = d;
    bestEver = order.slice();
  }


  // drawing lexical order
  textSize(16);
  strokeWeight(1);
  var percent = 100 * (count / totalPermutations);
  var current   = 'current : ';
  var bestOrder = 'best     : ';
  for (var i=0; i<order.length; i++){
    current += order[i];
  }
  for (var i=0; i<bestEver.length; i++){
    bestOrder += bestEver[i];
  }
  fill(255);
  text(bestOrder, 20, height-40);
  text(current, 20, height-20);
    text(nf(percent, 0, 2) + "% completed", 20, 30);

  nextOrder();
}




function swap(a, i, j){
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

function calcDistance(points, order){
  var sum = 0;
  for (var i=0; i<points.length-1 ; i++){
    var cityAIndex = order[i];
    var cityA = points[cityAIndex];
    var cityBIndex = order[i+1];
    var cityB = points[cityBIndex];
    var d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
    sum += d;
  }
  return sum;
}


function factorial(n) {
  if (n == 1) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}
