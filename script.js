const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particalsArray = [];
let adjustX = 10;
let adjustY = 10;
ctx.lineWidth =3;

let hue = 0;

const mouse = {
    x: null,
    y: null,
    radius: 150,
}

window.addEventListener('mousemove', function (e) {
    mouse.x = e.x;
    mouse.y = e.y;

})

ctx.fillStyle ='white';
ctx.font = '20px Verdana';
ctx.fillText("D" , 0, 30);
ctx.fillText("E" , 15, 30);
ctx.fillText("V" , 30, 30);
ctx.fillText("E" , 45, 30);
ctx.fillText("L" , 60, 30);
ctx.fillText("O" , 72, 30);
ctx.fillText("P" , 88, 30);
ctx.fillText("E" , 101, 30);
ctx.fillText("R" , 115, 30);
const textCoordinates = ctx.getImageData(0,0,1000,1000);


class Particles{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.size = 3;
        this.baseX = x;
        this.baseY = y;

        this.density =   (Math.random() * 80) + 1;
        this.color ='hsl('+ hue + ', 100%, 50% )';

        this.distance;
    }
    draw(){
        ctx.fillStyle ='rgba(255,255,255,0.8)';
        ctx.strokeStyle ='rgba(34,147,214,1)';
        ctx.beginPath();

        if (this.distance< mouse.radius -5) {
            this.size = 10;
            ctx.arc(this.x, this.y, this.size,0,Math.PI * 2);
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.arc(this.x-3, this.y-3, this.size/2.5,0,Math.PI * 2);
            ctx.arc(this.x+7, this.y-1, this.size/3.5,0,Math.PI * 2);
        }else if (this.distance <= mouse.radius) {
            this.size = 7;
            ctx.arc(this.x, this.y, this.size,0,Math.PI * 2);
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.arc(this.x -2, this.y -2, this.size/3,0,Math.PI * 2);

        }else{
            this.size = 5;
            ctx.arc(this.x, this.y, this.size,0,Math.PI * 2);
            ctx.stroke();
            ctx.closePath();
            ctx.beginPath();
            ctx.arc(this.x-1, this.y-1, this.size/3,0,Math.PI * 2);
        }


        ctx.closePath();
        ctx.fill();

    }
    update(){
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        this.distance = distance;

        let forceDirectionX = dx/distance;
        let forceDirectionY = dy/distance;

        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;

        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force* this.density;


        if(distance< mouse.radius){
            // this.size = 10;
            this.x -= directionX;
            this.y -= directionY;
            ctx.strokeStyle ='hsl('+ hue + ', 100%, 50% )';
            ctx.fillStyle ='hsl('+ hue + ', 100%, 50% )';
        }else{
            if (this.x !== this.baseX) {
                let dx = this.x - this.baseX;
                this.x -= dx/5;
                ctx.fillStyle ='white';
            }
            if (this.y !== this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy/5;
                ctx.fillStyle ='white';
            }
        }
    }

}

function init(){
    particalsArray = [];

    // for(let i= 0; i<1000 ; i++){
    //     let x = Math.random() * canvas.width;
    //     let y = Math.random() * canvas.height;

    //     particalsArray.push(new Particles(x,y));
    // }

    // particalsArray.push(new Particles(50,50));
    // particalsArray.push(new Particles(80,50));

    for(let y=0, y2 = textCoordinates.height; y< y2; y++){
        for(let x=0 , x2= textCoordinates.width; x< x2 ; x++){
            if(textCoordinates.data[(y * 4 * textCoordinates.width) + (x*4) + 3] > 128 ){
                let positionX = x + adjustX;
                let positionY = y + adjustY;
                particalsArray.push(new Particles(positionX *10 , positionY * 10));
            }
        }
    }

}
init();
// console.log(particalsArray);




function animate(){
    // ctx.fillStyle = 'rgba(255,255,255)';
    ctx.clearRect(0,0, canvas.width, canvas.height);

    for(let i= 0; i< particalsArray.length; i++){
        particalsArray[i].draw();
        particalsArray[i].update();
    }
    hue++;
    // connect();
    requestAnimationFrame(animate);
}

animate();


function connect(){
    for(let a=0; a<particalsArray.length; a++){
        for(let b = a; b< particalsArray.length; b++){
            // let dx = mouse.x - this.x;
            // let dy = mouse.y - this.y;
            // let distance = Math.sqrt(dx*dx + dy*dy);

            let dx = particalsArray[a].x - particalsArray[b].x;
            let dy = particalsArray[a].y - particalsArray[b].y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            opacityValue = 1- (distance/ 40)
            ctx.strokeStyle = 'rgba(225,225,225,' + opacityValue + ')';

            // if(mouseDistance )
            // ctx.strokeStyle ='hsl('+ hue + ', 100%, 50% )';

            

            if (distance < 40) {
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particalsArray[a].x,particalsArray[a].y);
                ctx.lineTo(particalsArray[b].x, particalsArray[b].y);
                ctx.stroke();
            }
        }
    }
}