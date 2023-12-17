import { timer } from "../../globals.js";
import Vector from "../../../lib/Vector.js";
import Tile from "../../services/Tile.js";
import GameObject from "../GameObject.js";
import Hitbox from "../../../lib/Hitbox.js";

export default class Crop extends GameObject {
    static TOTAL_GROW_TIME = 30 
    static GROW_STATES = 6
    static HITBOX_DIMENSIONS = new Vector(0.5, 0.5);
    constructor(position) {
        super(new Vector(Crop.HITBOX_DIMENSIONS.x, Crop.HITBOX_DIMENSIONS.y), position);
        this.sprites = this.initSprites();
        this.isGrowing = false;
        this.offset = new Vector(0, 0)

        this.hitbox = new Hitbox(
			this.position.x + Crop.HITBOX_DIMENSIONS.x / 2,
			this.position.y + Crop.HITBOX_DIMENSIONS.y / 2,
			this.dimensions.x,
			this.dimensions.y,
		);

        this.isHarvestable = false;
    }

    initSprites() {}

    update(dt) {
        super.update(dt);

        if(this.currentFrame == this.sprites.length - 1) {
            this.isHarvestable = true;
            return
        }

        if(!this.isGrowing) {
            this.isGrowing = true;
            timer.wait(Crop.TOTAL_GROW_TIME / Crop.GROW_STATES - 1, () => {
                this.currentFrame++;
                this.isGrowing = false;
                this.offset = new Vector(0, -4)
            }) 
        }
    }

    harvest() { }

    render() {
        super.render()
        const x = this.position.x * Tile.SIZE + this.offset.x;
		const y = this.position.y * Tile.SIZE + this.offset.y;

        this.sprites[this.currentFrame].render(x, y)
    }
}