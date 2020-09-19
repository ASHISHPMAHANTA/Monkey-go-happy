//for declareing the variables
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey,monkey_running;
var bananaImage,
    obstacle,ground, invisibleGround, stoneImage;
var bananaGroup, obstacleGroup;
var score,survivalTime;
var survivalTime= 0;

function preload(){
  //to preload the variables
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
   bananaImage = loadImage("banana.png");
  stoneImage = loadImage("obstacle.png");
 
}

function setup() {
    createCanvas(400, 400);

  //to create the sprites
   monkey = createSprite(50,400,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(200,400,900,20);
  ground.velocityX = -(2+3*survivalTime/10); 
  
 invisibleGround = createSprite(200,400,900,20);
  
  
//to create the groups
  bananaGroup = createGroup();
  stoneGroup = createGroup();

}

function draw() {
  //to give color to the background
background(220);
  
  if(gameState === PLAY){
  
   //jump when the space key is pressed
  if(keyDown("space")&& monkey.y>=350){
     monkey.velocityY = -12;
     }  
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
    
//to reset the ground
  if(ground.x<0){
  ground.x = ground.width /2;
     }
        
    stone();
    food();
    
    if(monkey.isTouching(stoneGroup)){
      gameState = END;
        
       }
    }
  
  //giving extra point when the monkey is touching the bananaGroup 
    if(monkey.isTouching(bananaGroup)){
    survivalTime = survivalTime+2;
    
  }
  
  //game state = end
  else if (gameState === END) {
  
  ground.velocity = 0;
    //to destroy the groups      
     stoneGroup.destroyEach();
      bananaGroup.destroyEach();
    frameCount = 0;
    monkey.destroy();
    //console.log(survivalTime);
///to show game over
    textSize(50);
    fill("red");
     text("GAME OVER",80,200);
  }
  
  //preventing the monkey to fall down
monkey.collide(invisibleGround);
  
  //to draw the sprites
  drawSprites();
  //to show the Survival time
  stroke("white");
  textSize(20);
  fill("white");
  text("score:",+score,500,50);
  
  stroke("black");
  textSize(20);
  fill("green");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time:"+survivalTime,100,50);
  
}

//function food
function food(){
  
  if (frameCount % 80=== 0) {
 //to create the banana
    var banana = createSprite(200,150,10,10);
    banana.y = Math.round(random(220,300));
    banana.addImage("banana",bananaImage);
    banana.scale =0.1;
    banana.velocityX= -2;
    banana.lifetime = 200;
     bananaGroup.add(banana);          
                              
}
}

function stone(){
  
  if(frameCount % 80 === 0) {
    //to create the sprites
 var stone = createSprite(400,380,20,20);
 stone.addAnimation("banana", stoneImage);
  stone.velocityX = -(6+3*survivalTime/10);
    stone.scale = 0.1;
    stone.lifetime = 300;
    
    stoneGroup.add(stone);
    
  }
}









