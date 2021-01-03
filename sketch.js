const Engine = Matter.Engine;
const World = Matter.World;
const Events = Matter.Events;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
 
var plinkos = [];
var divisions = [];
var ground,particle;

var gameState = "start";
var divisionHeight = 300;
var score = 0;
var turns = 0;

function setup() {
  createCanvas(480,650);

  engine = Engine.create();
  world = engine.world;

  ground = new Ground(width/2,height,width,20);
  for(var i = 5; i <= width; i = i + 78.5) {
    divisions.push(new Division(i, 500, 8, divisionHeight));
  }
  for(var k = 40; k <= width; k = k + 50) {
    plinkos.push(new Plinko (k,75));
  }
  for(var k = 15; k <= width; k = k + 50) {
    plinkos.push(new Plinko (k,125));
  }
  for(var k = 40; k <= width; k = k + 50) {
    plinkos.push(new Plinko (k,175));
  }
  for(var k = 15; k <= width; k = k + 50) {
    plinkos.push(new Plinko (k,225));
  }

  Engine.run(engine);
}
 
function draw() {
  background("black");
  rectMode(CENTER);
  ellipseMode(RADIUS);
  Engine.update(engine);
  
  fill("white");
  textSize(20);
  text("350        150          50          50         150        350",27,370);
  textFont("georgia");
  text("Score: "+ score,20,30);  
  text("Chances left: " + (5-turns),315,30); 

  if(gameState === "start" && mouseWentDown("leftButton")) {
    particle = new Particle(mouseX,10,6);
    turns = turns + 1;
  } 
  
  //Displaying the bodies.
  ground.display();
  for(var i = 0; i < divisions.length; i++) {
    divisions[i].display();
  }
  for(var k = 0; k < plinkos.length; k++) {
    plinkos[k].display();
  }
  if(particle) {
    particle.display();
    if(particle.body.position.y > 630) {
      if(particle.body.position.x > 397.5 || particle.body.position.x < 83.5) {
        score = score + 350;
        if(turns === 5) {
          gameState = "end";
        }
      }
      if(particle.body.position.x > 83.5 && particle.body.position.x < 162) {
        score = score + 150;
        if(turns === 5) {
          gameState = "end";
        }
      }
      if(particle.body.position.x > 319 && particle.body.position.x < 397.5) {
        score = score + 150;
        if(turns === 5) {
          gameState = "end";
        }
      }
      if(particle.body.position.x > 162 && particle.body.position.x < 319) {
        score = score + 50;
        if(turns === 5) {
          gameState = "end";
        }
      }
      particle = null;
    }
  }

  if(gameState === "end") {
    fill("lightBlue");
    noStroke();
    textSize(25);
    textAlign(CENTER);
    text("GAME OVER !! You scored",240,280);
    text(score + " points",240,310);
  }

  if(particle)
  console.log(particle.y);
}
