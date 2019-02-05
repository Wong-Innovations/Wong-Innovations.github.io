// Canvas Pre-reqs
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
var powerSlider = document.getElementById("power");
var angleField = document.getElementById("angle");
var greenTank, redTank;
var tankImg = new Image();
tankImg.src = "tanks.png";
var rightPressed, leftPressed = false;
var gravity = -3;

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

class Tank{
    //         (int,  int,  float,  int,   bool)
    constructor(xpos, ypos, theata, power, active){
        this.xpos = xpos;
        this.ypos = ypos;
        this.theata = theata;
        this.power = power;
        this.active = active;
    }
    fire(theata, power){

    }
}

class Bullet{
    constructor(xpos, ypos, dx, dy){
        this.xpos = xpos;
        this.ypos = ypos;
        this.dx = dx;
        this.dy = dy;
    }
}

function updateTheata(e){
    if ((e.pageX <= 480) && (e.pageY <= 320) && (e.pageX >= 0) && (e.pageY >= 0)){
        if (greenTank.active){
            let dx = (e.pageX - greenTank.xpos)-55;
            let dy = (greenTank.ypos - e.pageY)+38;
            let angle = Math.atan2(dy, dx);
            if (angle > Math.PI/2){
                angle = Math.PI/2;
            }else if (angle < 0){
                angle = 0;
            }
            greenTank.theata = angle;
            angleField.value = greenTank.theata*180/Math.PI;
        }else{
            let dx = (redTank.xpos - e.pageX);
            let dy = (redTank.ypos - e.pageY)+38;
            let angle = Math.atan2(dy, dx);
            if (angle > Math.PI/2){
                angle = Math.PI/2;
            }else if (angle < 0){
                angle = 0;
            }
            redTank.theata = angle;
            angleField.value = redTank.theata*180/Math.PI;
        }
    }
}

function manUpdateTheata(){
    if (greenTank.active){
        greenTank.theata = angleField.value*Math.PI/180;
    }else{
        redTank.theata = angleField.value*Math.PI/180;
    }
}

function drawRotatedRect(x,y,width,height,theata){
    ctx.save();
    ctx.beginPath();
    ctx.translate( x+width/2, y+height/2 );
    ctx.rotate(theata);
    ctx.rect( -width/2, -height/2, width,height);
    ctx.fill();
    ctx.restore();

}

function movement(){
    let dx = 1;
    if (greenTank.active){
        if (rightPressed){
            greenTank.xpos += dx;
        }else if (leftPressed){
            greenTank.xpos -= dx;
        }
    }else{
        if (rightPressed){
            redTank.xpos += dx;
        }else if (leftPressed){
            redTank.xpos -= dx;
        }
    }
}

// Main function to be called upon starting the game
function setup(){
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener('click', updateTheata);
    greenTank = new Tank(20, 240, 20*Math.PI/180, 0, true);
    redTank = new Tank(400, 240, 20*Math.PI/180, 0, false);
    console.log(greenTank);
    console.log(redTank);
    draw();
}

// Rendering loop, active for the duration of the game
function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Draw tank barrels
    drawRotatedRect(greenTank.xpos+40, greenTank.ypos+30, 30, 7, -greenTank.theata);
    drawRotatedRect(redTank.xpos-5, redTank.ypos+30, 30, 7, redTank.theata);
    
    // Draw Tanks
    ctx.drawImage(tankImg,0,0,64,64,greenTank.xpos,greenTank.ypos,64,64);
    ctx.drawImage(tankImg,64,0,64,64,redTank.xpos,redTank.ypos,64,64);
    
    movement();

    requestAnimationFrame(draw);
}

window.onload = setup;