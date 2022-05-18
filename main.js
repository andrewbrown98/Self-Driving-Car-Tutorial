const canvas=document.getElementById("myCanvas");

canvas.width=200;

const ctx = canvas.getContext("2d");
const road = new Road(canvas.width/2,canvas.width*0.9);
const car = new Car(road.getLaneCenter(1),100,30,50);

animate();

function animate(){ //function allowing the movements of the car to take effect
    car.update(road.borders); //get new positions from button pushes, pass the boarders for use with sensors
    
    canvas.height=window.innerHeight; //resize canvas
    
    ctx.save(); // save the caanvas position
    ctx.translate(0,-car.y+canvas.height*0.7); // translate the canvas
    road.draw(ctx);
    car.draw(ctx); //draw the car in the new position 

    ctx.restore();
    requestAnimationFrame(animate); //calls the animate function repeatedly 
}