var tree;
var input;
var button;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(50);
  tree =  new Tree();
  input = createInput();
  input.position(15, 15);

  button = createButton('ADD');
  button.position(input.x + input.width + 5, 15);
  button.mousePressed(addValue);

  for (var i=0; i<10; i++){
    tree.addValue(floor(random(0, 100)));
  }
  tree.traverse();
}

function addValue(){
  var number = input.value();
  input.value('');
  tree.addValue(number);
  tree.traverse();
}
