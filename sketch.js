const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint

var engine, world;
var box1, pig1;
var backgroundImg,platform;
var gameState="onSling"
var score=0

function preload() {
    
    getTime();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(170, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    pig1 = new Pig(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    pig3 = new Pig(810, 220);

    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(810,160,70,70);
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    bird = new Bird(200,50);
    

    slingshot=new Slingshot(bird.body,{x:200,y:50})
    
}

function draw(){
    if(backgroundImg){
        background(backgroundImg);
    }
    Engine.update(engine);
    
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    slingshot.display();

    pig1.score();
    pig3.score();

    fill("white")
    strokeWeight(10)
    textSize(30)
    text("Score:"+score,1000,100)
    

}
    function mouseDragged(){
    if(gameState==="onSling"){
    Matter.Body.setPosition(bird.body,{x:mouseX,y:mouseY})
    }
    }
    function mouseReleased(){
   slingshot.fly()
   gameState="launched"
 }
 function keyPressed(){
    if(keyCode===32){
        gameState="onSling"
        slingshot.attach(bird.body)
        Matter.Body.setPosition(bird.body,{x:200,y:50})
        bird.trajectory=[]
    } 
 }
 async function getTime(){
    var response=await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata") 
    var responsejson=await response.json()
    console.log(responsejson)
    var datetime=responsejson.datetime
    var hour=datetime.slice(11,13)
    console.log(datetime)
    console.log(hour)
if(hour>19&&hour<6){
backgroundImg=loadImage("sprites/bg2.jpg")
}
else{
 backgroundImg=loadImage("sprites/bg.png")   
}
 }
