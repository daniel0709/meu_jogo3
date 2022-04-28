var player,fundo;
var fundoImg,playerImg1
var car,police1,police2;

var carImg;
var pol2Img;
var pol1Img;

var END =0;
var PLAY =1;
var gameState = PLAY;

var gameOver, restart;

function preload(){
 fundoImg = loadImage("Road.png");
 playerImg1 = loadAnimation("ladrao.png","ladrao_run2.png");
 carImg = loadImage("carro.png");
 pol1Img = loadImage("police.png");
 pol2Img = loadImage("police2.png");
 gameOverImg = loadImage("fimdejogo.png");
}

function setup() {

  player = createSprite(100,160)
  player.scale=0.05
 
 createCanvas(1000,400);
 fundo=createSprite(100,150);
 fundo.addImage(fundoImg);
 fundo.velocityX = -5;

 fimdejogo = createSprite(650,150);
 fimdejogo.addImage(gameOverImg);
 fimdejogo.scale = 0.8;
 fimdejogo.visible = false;  

 pol1Group = new Group();
 pol2Group = new Group();
 carGroup = new Group();
}

function draw() {
 background(0);
  
 drawSprites();
    
 if(gameState===PLAY){

  player.y = World.mouseY;
    
 edges= createEdgeSprites();

 if(fundo.x < 0 ){
    fundo.x = width/2;
  }
  var select_police = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (select_police == 1) {
      criarPolice2();
    } else if (select_police == 2) {
      criarPolice1();
    } else {
      criarCarro();
    }
  }
  if(police1Group.isTouching(player)){
    gameState = END;
    pol1Group.velocityY = 0;
   }
   if(police2Group.isTouching(player)){
    gameState = END;
    pol2Group.velocityY = 0;
   }
   if(carGroup.isTouching(player)){
    gameState = END;
    carGroup.velocityY = 0;
   }
}
   else if (gameState === END) {
    fimdejogo.visible = true;

    fundo.velocityX = 0;
    player.velocityY = 0;

    carGroup.VelocityXEach(0);
    carGroup.LifetimeEach(-1);
    carGroup.destroyEach();

    police2Group.VelocityXEach(0);
    police2Group.LifetimeEach(-1);
    police2Group.destroyEach();

    police1Group.VelocityXEach(0);
    police1Group.LifetimeEach(-1);
    police1Group.destroyEach();
 }
}
function criarCarro(){
    car =createSprite(1100,Math.round(random(50, 250)));
    car.scale =0.06;
    car.Lifetime=170;
    carGroup.add(car);
    car.velocityX = 0
}

function criarPolice1(){
    police1 =createSprite(1100,Math.round(random(50, 250)));
    police1.scale =0.06;
    police1.Lifetime=170;
    police1Group.add(pol1);
    police1.velocityX = 0
}

function criarPolice2(){
    pol2 =createSprite(1100,Math.round(random(50, 250)));
    police2.scale =0.06;
    police2.Lifetime=170;
    police2Group.add(pol2);
    police2.velocityX = 0
}
