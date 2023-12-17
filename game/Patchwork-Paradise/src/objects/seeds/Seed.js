import { images } from "../../globals.js";
import Sprite from "../../../lib/Sprite.js";
import Vector from "../../../lib/Vector.js";
import ImageName from "../../enums/ImageName.js";
import Tile from "../../services/Tile.js";
import GameObject from "../GameObject.js";

export default class Seed extends GameObject {
    constructor() {
        super(new Vector(Tile.SIZE, Tile.SIZE), new Vector(0,0));
        this.sprite = Sprite.generateSpritesFromSpriteSheet(images.get(ImageName.Seeds), Tile.SIZE, Tile.SIZE)[0]
        this.isSeed = true;
        this.name = "Seeds";
        this.price = 0
    }

    render(positionX, positionY) {
        this.sprite.render(positionX, positionY)
    }

    plant(x, y) { }
}