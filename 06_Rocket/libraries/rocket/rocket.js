

function Rocket(dna){
  this.pos = createVector(width/2, height);
  this.vel = createVector();
  this.acc = createVector();
  this.completed = false;
  this.crashed = false;

  if (dna){
    this.dna = dna;
  } else{
    this.dna = new DNA();
  }
  this.fitness = 0;


  this.applyForce = function(force){
    this.acc.add(force);
  };

  this.calcFitness = function(){
    var d = dist(this.pos.x, this.pos.y, target.x, target.y);
    this.fitness = map(d, 0, width, width, 0);
    if (this.completed) {
      this.fitness *= 2;
    }
    if (this.crahsed){
      this.fitness *=0.1;
    }
  };

  this.update = function(){

    var d = dist(this.pos.x, this.pos.y, target.x, target.y);
    if (d<10){
      this.completed = true;
      this.pos = target.copy();
    }

    // if (this.pos.x > rx && this.pos.x < rx + rw && this.pos.y > ry && this.pos.y <ry + rh){
    //   this.crashed = true;
    // }

    if (this.pos.x < 0 || this.pos.x > width){
      this.crashed = true;
    }

    if ( this.pos.y <0 ){
      this.crashed = true;
    }

    this.applyForce(this.dna.genes[count]);
    if (!this.completed && !this.crashed){
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);
      this.vel.limit(4);
    }
  };

  this.show = function(){
    push();
    stroke(0);
    fill(255, 150);
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading() + PI/2);
    beginShape(TRIANGLES);
    vertex(0, 0);
    vertex(-6, 18);
    vertex(6, 18);
    endShape(CLOSE);
    pop();
  };

}
