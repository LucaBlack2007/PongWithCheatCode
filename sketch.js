var ball, ballImg;
var backgroundImage;
var edges;

var player, playerImg;
var ai, aiImg;

var resetButton, resetButtonImg;

var levelFinished, paddleHit;

var score = 0;
var gameState = 0;

/*

mousePressedOver()

250% scale good !

*/

function setup() {
  createCanvas(800,400);
  edges = createEdgeSprites();

  ball = createSprite(400, 200, 0, 0);
  ball.scale = 0.1;
  ball.addImage(ballImg);

  //ball.velocityX = 8;
  //ball.velocityY = 4;


  player = createSprite(650, 200, 0, 0);
  player.scale = 0.4;
  player.addImage(playerImg);

  ai = createSprite(160, 200, 0, 0)
  ai.scale = 0.4;
  ai.addImage(aiImg);

  resetButton = createSprite(400, 200, 0, 0);
  resetButton.scale = 0.2;
  resetButton.addImage(resetButtonImg);
  resetButton.visible = false;
}


function preload() {
  ballImg = loadImage('images/soccer_ball.png');
  backgroundImage = loadImage('images/background.jpg');
  playerImg = loadImage('images/person_kicking_right.png');
  aiImg = loadImage('images/person_kicking_left.png');
  resetButtonImg = loadImage('images/restart_game.png');

  paddleHit = loadSound('sounds/paddle_hit.mp3');
}

function draw() {
  background(backgroundImage);  



  if (gameState === 1) {
  
    fill("white");
    text("Score: " + score, 365, 15);

    
    ai.debug = true;
    player.debug = true;
    ball.debug = true;
    

    if (player.isTouching(ball)) {
      console.log('collision!');
      score = score + 1;
      paddleHit.play();
    }

    if (ai.isTouching(ball)) {
      paddleHit.play();
    }

    if (score % 5 === 0 && score != 0) {
      ball.velocityX+=0.3;
      ball.velocityY+=0.3;
    }


    ball.bounceOff(edges);
    ball.bounceOff(player);
    ball.bounceOff(ai);

    //fill("white");
    //text(World.mouseX + ", " + World.mouseY, World.mouseX, World.mouseY);
    
    player.y = World.mouseY;
    ai.y = ball.y;

    if (ball.x > player.x) {
      gameState = 0;
    }

    if (keyDown("A")) {
      if (keyDown("W")) {
        if (keyDown("S")) {
          if (keyDown("D")) {
            if (keyDown("SPACE")) {
              score = 100;
            }
          }
        }
      }
    }
  } else if (gameState === 0) {
  
    reset();  

    if (mousePressedOver(resetButton)) {
      gameState = 1;
      ball.velocityX = 8;
      ball.velocityY = 4;
      ball.visible = true;
      resetButton.visible = false;
    }

    if (keyDown("SPACE")) {
      gameState = 1;
      ball.velocityX = 8;
      ball.velocityY = 4;
      ball.visible = true;
      resetButton.visible = false;
    }
  }

  drawSprites();
}

function reset() {
  ball.veloictyX = 0;
  ball.velocityY = 0;
  ball.x = 400;
  ball.y = 200;
  ai.x = 160;
  ai.y = 200;
  player.x = 650;
  player.y = 200;
  score = 0;

  resetButton.visible = true;
  ball.visible = false;
}