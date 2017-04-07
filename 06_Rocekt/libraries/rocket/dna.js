function DNA(genes){

  if (genes){
    this.genes = genes;
  } else {
    this.genes = [];
    for (var i=0; i<lifespan; i++){
      this.genes[i] = p5.Vector.random2D();
      this.genes[i].setMag(maxforce);
    }
  }

  this.crossover = function(partner){
    var childgenes = [];
    var mid = floor(random(this.genes.length));
    for (var i=0; i<this.genes.length; i++){
      if ( i > mid ) childgenes[i] = this.genes[i];
      else           childgenes[i] = partner.genes[i];
    }
    var newgenes = new DNA(childgenes);
    return newgenes;
  }

  this.mutation = function(){
    for (var i=0; i<this.genes.length; i++){
      if (random(1) < 0.01 ){
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(maxforce);
      }
    }
  }

}
