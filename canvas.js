const canvas = document.querySelector('#ballsplit');
const ctx = canvas.getContext('2d');
let circles;
let colors = ['#EB5A59','#8ff07b','#5D8AF5'];

window.addEventListener('load', () => {
//resizing
canvas.height = window.innerHeight;
canvas.width = window.innerHeight;

 setup();
});
window.onresize = function() {  
    let W = window.innerHeight;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H; 
 };

function checkcoincide(e){
    let count=0;
    for(let i = 0; i<circles.length ; i++){
        if(circles[i].radius >= window.innerHeight*0.02){
            if(e.clientX>=(circles[i].x-circles[i].radius*0.8)&&e.clientX<=(circles[i].x+circles[i].radius*0.8)&&e.clientY>=(circles[i].y-circles[i].radius*0.8)&&e.clientY<=(circles[i].y+circles[i].radius*0.8)){
                console.log(circles);
               
                let c1 = new Circle(circles[i].x-(circles[i].radius*0.5),circles[i].y-(circles[i].radius*0.5),(circles[i].radius*0.5));
                let c2 = new Circle(circles[i].x-(circles[i].radius*0.5),circles[i].y+(circles[i].radius*0.5),(circles[i].radius*0.5));
                let c3 = new Circle(circles[i].x+(circles[i].radius*0.5),circles[i].y-(circles[i].radius*0.5),(circles[i].radius*0.5));
                let c4 = new Circle(circles[i].x+(circles[i].radius*0.5),circles[i].y+(circles[i].radius*0.5),(circles[i].radius*0.5));
                circles.push(c1,c2,c3,c4);
                circles.splice(i,1);
    
                ctx.clearRect(0, 0, innerWidth, innerHeight);
                count = 1;
                break;
            }
        }
         
    }
    if(count === 1){
        console.log('1');
        gameUpdate();
    }
    
}

class Circle{
    constructor(x,y,radius){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = colors[Math.floor(Math.random() * (3) )] ;
      }
      draw(){
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius, 0, Math.PI*2,false);
        ctx.fillStyle = this.color;
        ctx.fill();
      };
}

// function play() {
//     loop = setInterval(function () {
//         render();
//       }, 16);
// }

// function render() {
//     ctx.clearRect(0, 0, innerWidth, innerHeight);
//     gameUpdate();

// }

function setup(){
    let circle = new Circle(window.innerHeight*0.5, window.innerHeight*0.5, window.innerHeight*0.45);
    circle.draw();
    circles = new Array();
    circles.push(circle);
    window.addEventListener('mousemove', (e) => {
        checkcoincide(e);
    });
   
}

function gameUpdate(){
    for(let i=0; i<circles.length; i++){
        
        circles[i].draw();
    }
}
