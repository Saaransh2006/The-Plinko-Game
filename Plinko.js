class Plinko {
    constructor(x, y) {
      var options = {
          isStatic:true,
          restitution:0.3,
          friction:0.5,
          density:1.2
      }
      this.body = Bodies.circle(x, y, 6, options);
      this.width = 6;
      this.height = 6;
      
      World.add(world, this.body);
    }

    display() {
      ellipseMode(RADIUS);
      stroke("white")
      fill("white");
      ellipse(this.body.position.x,this.body.position.y, this.width, this.height);
    }
};