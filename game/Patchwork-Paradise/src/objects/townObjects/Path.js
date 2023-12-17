import GameObject from "../GameObject.js";

export default class Path extends GameObject {

    constructor(dimensions, position, map = null){
        super(dimensions, position);

        this.map = map;
        
        //We need to check if the player collided with a path
        this.isCollidable = true;
    }

    update(dt){
        super.update(dt);

        if(this.wasCollided){
            //No animation because it's a path with no door
        }
    }
}


