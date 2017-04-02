function Particle(){
  this.x = 100;
  this.y = 99;
}

Particle.prototype.show = function(){
  point(this.x, this.y);
}

p5.Vector.prototype.double = function(){
  this.x *= 2;
  this.y *= 2;
  this.z *= 2;
}

var p;
var v;

function setup(){
  createCanvas(600, 300);
  p = new Particle();
  v = createVector(3,4);
}
