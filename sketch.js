const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var backg, bgImg;
var enemy, bunny, mouse, unicorn;
var player, PF;
var invisibleGround;
var platform, platformGroup;

function preload() {
    bgImg = loadImage("backgroundImg.png");
    bunnyImg = loadImage("bunny.png");
    coinImg = loadImage("coin.png");
    enemyImg = loadImage("enemy.png");
    PF = loadImage("PF.png");
    playerRunning = loadAnimation("P1.PNG", "P2.PNG", "P3.PNG");
    loser = loadImage("L1.png");
    grassImg = loadImage("grass.png");
    platformImg = loadImage("platform.png");
}

function setup() {
    createCanvas(displayWidth,500);

    engine = Engine.create();
    world = engine.world;
    Engine.run(engine);

    //backg = createSprite(500,190);
    //backg.addImage("bground",bgImg);
    //backg.scale = 0.27;
    //backg.x = backg.width/2;
    //backg.velocityX = -4;

    gro = createSprite(width/2,height,width,2);
    gro.addImage("ground",grassImg);
    gro.scale = 5;
    gro.x = width/2
    gro.velocityX = -6;

    player = createSprite(70,290,30,30);
    player.addAnimation("running", playerRunning);
    player.scale = 0.5;

    enemy = createSprite(1050,255,30,30);
    enemy.addImage(enemyImg);
    enemy.scale = 0.6;

    bunny = createSprite(1230,285,30,30);
    bunny.addImage(bunnyImg);
    bunny.scale = 0.3;

    invisibleGround = createSprite(10,460,2500,15);
    invisibleGround.visible = false;

    platformGroup = createGroup();
}

function draw() {
    background(bgImg);

    player.collide(invisibleGround);
    enemy.collide(invisibleGround);
    //bunny.collide(invisibleGround);

    if(gameState === PLAY) {
      if(gro.x < 0) {
        gro.x = gro.width/2;
      }

      if(keyDown("up_arrow")) {
          player.velocityY = -15;
        }
      
      //add gravity
      player.velocityY = player.velocityY + 0.8

      if(player.x > 3500) {
        gameState = END;
      }

      spawnPlatform();
  }
  else if(gameState === END) {
    gro.velocityX = 0;
  }

    console.log(player.x);

    drawSprites();
}

function spawnPlatform() {
  //write code here to spawn the clouds
  if (frameCount % 120 === 0) {
    var platform = createSprite(1275,120,40,10);
    platform.y = Math.round(random(130,230));
    platform.addImage(platformImg);
    platform.scale = 0.3;
    platform.velocityX = -5;
    
     //assign lifetime to the variable
     platform.lifetime = -1;
    
    //adjust the depth
    platform.depth = player.depth;
    player.depth = player.depth + 1;
    
    //add each cloud to the group
    platformGroup.add(platform);
  }
}