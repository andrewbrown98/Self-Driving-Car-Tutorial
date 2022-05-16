const canvas=document.getElementById("myCanvas");

canvas.width=200;

const ctx = canvas.getContext("2d");
const car = new Car(100,100,30,50);

animate();

function animate(){ //function allowing the movements of the car to take effect
car.update(); //get new positions from button pushes 
canvas.height=window.innerHeight; //resize canvas
car.draw(ctx); //draw the car in the new position 
requestAnimationFrame(animate); //calls the animate function repeatedly 
}