function Panel(x, y, rectSize, dna){

  this.pos = createVector(x, y);
  if (dna){
    this.dna = dna;
  } else {
    this.dna = new DNA();
  }
  this.fitness = 0;

  this.show = function(check){
    this.calcFitness();
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    noFill();
    rect(0, 0, rectSize, rectSize);
    for (var x=0; x < resolution ; x++){
      for (var y=0; y < resolution; y++){
        this.dna.genes[x][y].show();
      }
    }
    // Display fitness value
    textAlign(CENTER);
    if (check != 1){
      fill(80);
      text(this.dna.fitness.toFixed( 3), rectSize/2, 90);
    }

    pop();
  }

  this.calcFitness = function(){
    this.dna.calcFitness();
    this.fitness = this.dna.fitness;
    //println(this.fitness);
  }


}
