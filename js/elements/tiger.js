function Tiger() {
  this.direction = Helper.randomElement(Config.directionNames);
  this.energy = 100;

  // Used to track the amount of prey seen per turn in the last six turns
  this.preySeen = [];
}

Tiger.prototype.act = function(context) {
  // Average number of prey seen per turn
  var seenPerTurn = this.preySeen.reduce(function(a, b) {
    return a + b;
  }, 0) / this.preySeen.length;

  var prey = [];
  prey.concat(context.findAll("o"));
  prey.concat(context.findAll("s"));

  this.preySeen.push(prey.length);
  // Drop the first element from the array when it is longer than 6
  if (this.preySeen.length > 6) {
    this.preySeen.shift();
  }

  // Only eat if the predator saw more than 1/4 prey animal per turn
  if (prey.length && seenPerTurn > 0.25) {
    return { type: "eat", direction: randomElement(prey) };
  }

  var space = context.find(" ");
  if (this.energy > 400 && space) {
    return {type: "reproduce", direction: space};
  }

  if (context.look(this.direction) !== " " && space) {
    this.direction = space;
  }

  return {type: "move", direction: this.direction};
};
