function Gene(x, y){
  this.pos = createVector(x,y);
  this.red = floor(random(100));
  // this.green = geneColor.green;
  // this.blue = geneColor.blue;
  this.difference = 0;

  this.show = function(){
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(0, this.red, 0);
    rect(0, 0, cellSize, cellSize);
    pop();
  }

  this.calcDiff = function(x, y){
      this.difference = Math.abs(target.dna.genes[x][y].red - this.red);
      this.difference = map(this.difference, 0, 100, 0, 1);
  }
}


function DNA(genes){

  if (genes){
    this.genes = genes;
  }
  else {
    this.genes = new Array(resolution);
    for (var i=0; i<resolution; i++){
      this.genes[i] = new Array(resolution);
    }
  }
  this.fitness = 0;
  this.tolerance = 1;
  this.average = 0;

  for (var x=0; x < resolution ; x++){
    for (var y=0; y < resolution; y++){
      this.genes[x][y] = new Gene(x*cellSize, y*cellSize);
    }
  }

  this.calcDiff = function(){
    var total = 0;
    for (var x=0; x < resolution ; x++){
      for (var y=0; y < resolution; y++){
        this.genes[x][y].calcDiff(x, y);
        total += this.genes[x][y].difference;
      }
    }
    this.average = total/ (resolution*resolution);
  }

  this.calcFitness = function(){
    for (var x=0; x < resolution ; x++){
      for (var y=0; y < resolution; y++){
        this.genes[x][y].calcDiff(x, y);
      }
    }

    var score = 0;
    tolerance = 20*(1 - population.getAverage());

    for (var x=0; x < resolution ; x++){
      for (var y=0; y < resolution; y++){
        var multiplier;
        if ( this.genes[x][y].difference < population.getAverage() ){
          multiplier = 1;
        }
        else {
          multiplier = pow(( this.genes[x][y].difference - population.getAverage())/(resolution*resolution), 2);
        }
        score += multiplier;
      }
    }
    this.fitness = score/(resolution*resolution);
  }


  this.crossover = function(partner){

    var newgenes = new Array(resolution);
    for (var i=0; i<resolution; i++){
      newgenes[i] = new Array(resolution);
    }

    var similarity = 0;
    for (var x=0; x < resolution ; x++){
      for (var y=0; y < resolution; y++){
        if ( this.genes[x][y] == partner.genes[x][y]){
          similarity ++;
        }
      }
    }

    for (var x=0; x < resolution ; x++){
      for (var y=0; y < resolution; y++){

        if ( this.genes[x][y].fitness > partner.genes[x][y].fitness){
          newgenes[x][y] = this.genes[x][y];
        } else {
          newgenes[x][y] = partner.genes[x][y];
        }

        if (random(1)< mutationRate*pow((similarity/(resolution*resolution)),2)){
          newgenes[x][y].red =  floor(random(int(255)/int(tolerance))*tolerance);
        }

      }
    }

    return new DNA(newgenes);
  }



}
