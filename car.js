class Car{
    constructor(x,y,width,height){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;

        this.speed=0;
        this.acceleration=0.2;
        this.maxSpeed = 3;
        this.friction = 0.05;
        this.angle = 0;

        //sensors
        this.sensor = new Sensor(this); //pass car to sensor
    
        this.controls = new Controls();
    }

    update(roadBorders){
        this.#move();
        this.sensor.update(roadBorders);
    }

    #move(){
        if(this.controls.forward){
            this.speed+=this.acceleration;  
        }
        if(this.controls.reverse){
            this.speed-=this.acceleration;
        }
        if(this.speed>this.maxSpeed){ //cap the speed at the max speed 
            this.speed = this.maxSpeed;
        }
        if(this.speed<-this.maxSpeed/2){
            this.speed = -this.maxSpeed/2; //not as fast in reverse
        }

        if(this.speed>0){ //friction for forward motion
            this.speed-=this.friction; //subtract the friction value from speed to slow down
        }
        if(this.speed<0){ //friction for reverse motion
            this.speed+=this.friction;
        }
        if(Math.abs(this.speed)<this.friction){ //prevents drifting if speed is not exactly 0
            this.speed=0;
        }

        if(this.speed!=0){
            //flip is used to make driving in reverse work properly
            const flip=this.speed>0?1:-1;//if speed >0 no flip else flip
            if(this.controls.left){
                this.angle+=0.03*flip;
            }
            if(this.controls.right){
                this.angle-=0.03*flip;
            }
        }
        
        //update the x, y coordinates
        this.x-=Math.sin(this.angle)*this.speed;
        this.y-=Math.cos(this.angle)*this.speed;
    }
    draw(ctx){
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(-this.angle);

        ctx.beginPath();
        ctx.rect(
            -this.width/2,
            -this.height/2,
            this.width,
            this.height
        );
        ctx.fill();

        ctx.restore();

        this.sensor.draw(ctx); //car draws its sensors
    }
}