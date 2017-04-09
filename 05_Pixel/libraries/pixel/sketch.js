var target;
var best;

var population;
var popsize = 16;
var mutationRate = 0.01;
var generation = 0;

var rectSize = 80;
var resolution = 4;
var cellSize = rectSize/resolution;

var info;

function setup(){
  createCanvas(800, 600);
  target = new Panel(width/2 - 120, 100, rectSize);
  best = new Panel(width/2  + 30, 100, rectSize);
  population = new Population(popsize);
  colorMode(RGB, 100, 100, 100);
  info = createDiv('');
  info.position(0, 620);
  frameRate(5);
}

function draw(){
  background(51);

  fill(0);
  push();
  translate(0, 0);
  text("population size :  " + popsize,  10, 30);
  text("mutation rate    :  " + mutationRate, 10, 45);
  text("generation        :  " + generation, 10, 60);
  text("average fitness :  " + (1-population.getAverage()), 10, 75);
  pop();


  fill(255);
  text("target", width/2 - 90, 95);
  text("best", width/2  +60, 95);
  target.show(1);
  best.show(1);
  population.run();
  population.evaluate();
  population.selection();
  generation++;
}

function mousePressed(){
}
