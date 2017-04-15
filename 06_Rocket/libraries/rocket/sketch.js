var population;
var lifespan = 200;
var lifeP;
var count = 0;
var target;
var maxforce = 0.5;

// var rx = 200;
// var ry = 200;
// var rw = 200;
// var rh = 10;

function setup(){
  createCanvas(600, 400);
  population = new Population();
  lifeP = createP();
  target = createVector(width/2, 40);
}

function draw(){
  background(51);
  population.run();
  lifeP.html(count);
  count++;
  if (count == lifespan){
    population.evaluation();
    population.selection();
    count = 0;
  }

  fill(255);
  //rect(rx, ry, rw, rh);

  fill(255, 0, 0, 100);

  ellipse(target.x, target.y, 16, 16);

}

function mousePressed(){
  target.x = mouseX;
  target.y = mouseY;
}
