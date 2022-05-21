const canvas=document.getElementById("myCanvas");

canvas.width=200;

const ctx = canvas.getContext("2d");
const road = new Road(canvas.width/2,canvas.width*0.9);
const car = new Car(road.getLaneCenter(1),100,30,50,"AI");

const traffic = [
    new Car(road.getLaneCenter(1),-100,30,50,"DUMMY",2)
];

animate();

function animate(){ //function allowing the movements of the car to take effect
    for(let i=0;i<traffic.length;i++){
        traffic[i].update(road.borders,[])
    }
    
    car.update(road.borders,traffic); //get new positions from button pushes, pass the boarders for use with sensors
    
    canvas.height=window.innerHeight; //resize canvas
    
    ctx.save(); // save the caanvas position
    ctx.translate(0,-car.y+canvas.height*0.7); // translate the canvas
    road.draw(ctx);

    for(let i =0; i<traffic.length;i++){ //draw traffic
        traffic[i].draw(ctx,"red");
    }

    car.draw(ctx, "blue"); //draw the car in the new position 

    ctx.restore();
    requestAnimationFrame(animate); //calls the animate function repeatedly 
}