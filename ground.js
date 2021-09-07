class ground {
    constructor(x,y,width,height) {
        var options={
            isStatic: true
        }
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.ground = Bodies.rectangle(x,y,width,height,options);
        World.add(world,this.ground);
        
    }
    display() {
        noStroke();
        fill(188,67,67);
        rectMode(CENTER);
        rect(this.ground.position.x, this.ground.position.y, 80,15);
    }
}