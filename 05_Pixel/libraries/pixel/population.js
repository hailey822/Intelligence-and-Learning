function Population(p){
  this.panels = [];
  this.popsize = p;
  this.matingPool = [];

  for (var i=0; i<this.popsize; i++){
    if ( i <8 ){
      this.panels[i] = new Panel(40 + (rectSize + 10)*i, 300, rectSize);
    }
    else {
      this.panels[i] = new Panel(40 + (rectSize + 10)*(i-8), 600, rectSize);
    }
  }

  this.run = function(){
    for (var i=0; i<this.popsize; i++){
      this.panels[i].show();
    }
  }

  this.evaluate = function(){
    var maxfit = 0;
    for (var i=0; i<this.popsize; i++){
      this.panels[i].calcFitness();
      if (this.panels[i].fitness > maxfit){
        maxfit = this.panels[i].fitness;
        if ( maxfit > best.fitness){
          best.dna = this.panels[i].dna;
        }
      }
    }

    for (var i=0; i<this.popsize; i++){
      this.panels[i].fitness /= maxfit;
    }


    this.matingPool = [];
    for (var i=0; i<this.popsize; i++){
      var n = this.panels[i].fitness * 100;
      for (var j=0; j<n; j++){
        this.matingPool.push(this.panels[i]);
      }
    }
    // println(this.matingPool.length);
  }

  this.selection = function(){
    var newpopulation = [];
    for (var i=0; i<this.popsize; i++){
      var parentA = random(this.matingPool).dna;
      var parentB = random(this.matingPool).dna;
      var child = parentA.crossover(parentB);
      if ( i <8 ){
        newpopulation[i] = new Panel(40 + (rectSize + 10)*i, 300, rectSize, child);
      }
      else {
        newpopulation[i]= new Panel(40 + (rectSize + 10)*(i-8), 420, rectSize, child);
      }

    }
    this.panels = newpopulation;
  }

  this.getAverage = function(){
    var total = 0;
    for (var i=0; i<this.popsize; i++){
      this.panels[i].dna.calcDiff();
      total += this.panels[i].dna.average;
    }
    return total/this.popsize;
  }

}
