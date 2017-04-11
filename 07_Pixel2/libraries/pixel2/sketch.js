var mutationRate = 0.01;
var totalPopulation = 712;
var count = 0; // generation count
var row = 40; var col = 18;

var test; // dna
var population = new Array(totalPopulation);

var highestFitnessObtained = 0;

var imageW = 16; // num of pixels
var tileW = 2; // pixels per tile
var sizeOfEachImage = imageW * tileW;

var targetImg;
var target = new Array(imageW*imageW);

function preload(){
  targetImg = loadImage('libraries/garfield.png');
}

function setup() {
  createCanvas(2000, 1000);
  background(255);

  target = getPixelValues(targetImg, imageW, imageW);
  test = new DNA(target);

  for (var i = 0; i < population.length; i++) {
    population[i] = new DNA();
  }
}

function draw() {
  background(255);
  fill(0);
  //frameRate(5);
  text("target : ", 310, 30);
  text("best : ", 310, sizeOfEachImage+30);
  image(targetImg, 350, 10, sizeOfEachImage, sizeOfEachImage);
  test.displayImage(350, 45, 2);

  var temp = new Array(col);
  for (var i=0; i<col; i++){
    temp[i] = new Array(row);
  }

  var i= 0;
  for (var c=0; c<col; c++){
    for (var r=0; r<row; r++){
      if (i>=totalPopulation) break;
      population[i].calcFitness();
      population[i].displayImage(10+r*35, 170+c*35, tileW);
      i++;
    }
  }

  var matingPool = [];

  for (var i = 0; i < population.length; i++) {
    var n = population[i].fitness*10;
    for (var j = 0; j < n; j++) {
      matingPool.push(population[i]);
    }
  }

  //println("Generation = " + count);
  //println("total pool size = " + matingPool.size());
  //println("average fitness = " + averageFitness());
  fill(0, 150);
  rect(0, 0, 300, 160);
  fill(255);
  text("Poputation = " + totalPopulation, 20, 20);
  text("Mutation Rate = " + mutationRate, 20, 40);
  text("Generation = " + count, 20, 60);
  text("total pool size = " + matingPool.length, 20, 80);
  text("average fitness = " + averageFitness(), 20, 100);
  text("highest fitness seen = " + highestFitnessObtained, 20, 120);
  text("Time in seconds = " + millis()/1000, 20, 140);
  // println(int(random(int(255)/int(20)))*20);

  for (var i = 0; i < population.length; i++) {
    var a = floor(random(matingPool.length));
    var b = floor(random(matingPool.length));
    var partnerA = matingPool[a];
    var partnerB = matingPool[b];
    var child = partnerA.crossover(partnerB);
    population[i] = child;
  }
  count++;
}


// this is still buggy but low priority (it's good enough)
function getPixelValues(image, numOfPixelsAlongX, numOfPixelsAlongY) {
  var values = new Array(numOfPixelsAlongX*numOfPixelsAlongY);
  for (var i = 0; i < numOfPixelsAlongX; i ++) {
    for (var j = 0; j < numOfPixelsAlongY; j ++) {
      var c = image.get(floor((i+0.25)*(image.width/numOfPixelsAlongX)), floor((j+0.25)*(image.height/numOfPixelsAlongY)));
      values[(j*numOfPixelsAlongX)+i] = c[0];
    }
  }
  return values;
}

function averageFitness() {
  var sum = 0;
  for (var i = 0; i < population.length; i++) {
    sum += population[i].fitness;
    if (highestFitnessObtained < population[i].fitness) {
      highestFitnessObtained = population[i].fitness;
      test = population[i];
    }
  }
  return (sum/population.length);
}
