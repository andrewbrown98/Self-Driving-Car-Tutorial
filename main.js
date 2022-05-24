const carCanvas=document.getElementById("carCanvas");
carCanvas.width=500;

const networkCanvas=document.getElementById("networkCanvas");
networkCanvas.width=600;

const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");
const road = new Road(carCanvas.width/2,carCanvas.width*0.9);
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
    
    carCanvas.height=window.innerHeight; 
    networkCanvas.height=window.innerHeight;
    
    carCtx.save(); // save the caanvas position
    carCtx.translate(0,-car.y+carCanvas.height*0.7); // translate the canvas
    road.draw(carCtx);

    for(let i =0; i<traffic.length;i++){ //draw traffic
        traffic[i].draw(carCtx,"red");
    }

    car.draw(carCtx, "blue"); //draw the car in the new position 

    carCtx.restore();

    Visualizer.drawNetwork(networkCtx,car.brain);
    requestAnimationFrame(animate); //calls the animate function repeatedly 
}