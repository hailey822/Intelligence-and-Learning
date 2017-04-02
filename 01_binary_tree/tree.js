// basic structrue to wrap up the nodes
function Tree() {
  this.root = null;
}


Tree.prototype.addValue = function(val) {
  // node object
  var n = new Node(val);
  if (this.root == null) {
    this.root = n;
    // An initial position for the root node
    this.root.posX = width / 2;
    this.root.posY = 50;
  } else {
    this.root.addNode(n);
  }
}

// enumerate values in nodes in ascending order
Tree.prototype.traverse = function() {
  this.root.visit(this.root);
  console.log("done");
}

// serach specific value
Tree.prototype.search = function(val) {
  var found = this.root.search(val);
  return found;
}
