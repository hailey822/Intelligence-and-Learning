function DNA(tiles){
  // we're using 16x16 pixel images = 256 pixels stored in a one-dimensional array
  // the "genotype" here would be color information of each tile

  this.fitness = 0;
  this.tolerance = 1;

  if (tiles){
    this.tiles = tiles;
  } else{
    this.tiles = new Array(256);
    for ( var i=0; i<this.tiles.length; i++){
      this.tiles[i] = floor(random( 255 / this.tolerance )) * this.tolerance;
    }
  }

  this.calcFitness = function(){
    this.tolerance = floor( 1*(1 - averageFitness()) );
    var score = 0;

    //comparing only red for now
    for ( var i=0; i<this.tiles.length; i++){
      var difference = Math.abs(target[i] - this.tiles[i]);
      var multiplier;
      if (difference < this.tolerance) { // arbitrary tolerance to increase the odds
        multiplier = 1;
      } else {
        multiplier = 1 - pow( (difference-this.tolerance)/256, 3); // made the curve exponential
      }
      score += multiplier;
    }
    this.fitness = score/target.length;
  }

  // go thru all tiles ("genes")
  // "flip a coin" to decide which parent's tile ("gene") should be replicated
  this.crossover = function(partner) {
    var child = new DNA();
    var parentsSimilarityScore = 0; // how related are the parents?
    for ( var i=0; i<this.tiles.length; i++) {
      if(this.tiles[i] == partner.tiles[i]){
        parentsSimilarityScore++;
      }
    }
    for ( var i=0; i<this.tiles.length; i++){
      if (Math.abs(target[i] - this.tiles[i]) < Math.abs(target[i].partner.tiles[i]))
        child.tiles[i] = this.tiles[i];
      else
        child.tiles[i] = partner.tiles[i];
      //mutate here to avoid extra loop
      if (random(1)< mutationRate*pow((parentsSimilarityScore/this.tiles.length),2)) // if parents are similar, then mutate more
        this.tiles[i] = floor(random( 255 / this.tolerance )) * this.tolerance;
    }
    // return dna
    return child;
  }


  // converts 1 dimensional pixel array into 2D square of tiles (Phenotype)
  this.displayImage = function(x, y, size) {
    noStroke();
    for ( var i=0; i<this.tiles.length; i++) {
      fill(this.tiles[i]);
      rect(x+(i%Math.sqrt(this.tiles.length))*size, y+(floor(i/Math.sqrt(this.tiles.length)))*size, size, size);
    }
  }
}
