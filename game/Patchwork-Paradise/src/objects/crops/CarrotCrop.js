import { images, timer } from "../../globals.js";
import Sprite from "../../../lib/Sprite.js";
import Vector from "../../../lib/Vector.js";
import ImageName from "../../enums/ImageName.js";
import Tile from "../../services/Tile.js";
import Crop from "./Crop.js";
import ItemFactory from "../../services/Factories/ItemFactory.js";
import ItemType from "../../enums/ItemType.js";

export default class CarrotCrop extends Crop {
    static TOTAL_GROW_TIME = 30
    static GROW_STATES = 6
    constructor(position) {
        super(position);
        this.sprites = this.initSprites();
        this.isGrowing = false;
        this.offset = new Vector(0, 0)
        this.isHarvestable = false;
    }

    initSprites() {
        let sprites = Sprite.generateSpritesFromSpriteSheet(images.get(ImageName.Crops), Tile.SIZE, Tile.SIZE)

        return sprites.splice(0, CarrotCrop.GROW_STATES)
    }

    update(dt) {
        super.update(dt);

        if(this.currentFrame == this.sprites.length - 1) {
            this.isHarvestable = true;
            return
        }

        if(!this.isGrowing) {
            this.isGrowing = true;
            timer.wait(CarrotCrop.TOTAL_GROW_TIME / CarrotCrop.GROW_STATES - 1, () => {
                this.currentFrame++;
                this.isGrowing = false;
                this.offset = new Vector(4, -4)
            }) 
        }
        
    }

    harvest() {
        return ItemFactory.CreateInstance(ItemType.Carrot)
    }

    render() {
        super.render()
    }

}