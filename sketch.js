var balloon , backImg, database , position , balloonImg;

function preload(){

  backImg = loadImage("Image/HotAirBallon-01.png");
  balloonImg = loadAnimation("Image/HotAirBallon-02.png")
}

function setup() {
  createCanvas(500,500);
  
  database = firebase.database();
  
  balloon=createSprite(250, 200, 50, 50);
  balloon.addAnimation("hotAirBalloon" , balloonImg);
  balloon.scale =0.2;
  var balloonPos = database.ref('balloon/position');
  balloonPos.on("value",readHeight);
}

function draw() {
  background(backImg);
  if(keyDown(LEFT_ARROW)){

    updateHeight(-10,0);
   // balloon.x = balloon.x - 10;
  
  }
  else if(keyDown(RIGHT_ARROW)){

    updateHeight(10,0);
   // balloon.x = balloon.x + 10;
    
  }
  else if(keyDown(UP_ARROW)){
    
    
    balloon.scale = balloon.scale - 0.01;
    updateHeight(0,-10);
    
  }
  else if(keyDown(DOWN_ARROW)){
    
  //  balloon.y = balloon.y + 10;
    balloon.scale = balloon.scale + 0.01;
    updateHeight(0,+10);
    
  }

  textSize(15);
  fill("grey");
  stroke("red")
  text("Use keys to move", 250, 50);

  drawSprites();
}
function readHeight(data){

    position = data.val();

    balloon.x= position.x;
    balloon.y = position.y;
}
function updateHeight(x,y){
  
  database.ref('balloon/position').set({
    'x' : balloon.x + x,
    'y' : balloon.y + y
  });
}
