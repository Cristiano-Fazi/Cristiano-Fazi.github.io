import { images } from "../../globals.js";
import Sprite from "../../../lib/Sprite.js";
import Vector from "../../../lib/Vector.js";
import ImageName from "../../enums/ImageName.js";
import VegetableType from "../../enums/VegetableType.js";
import Tile from "../../services/Tile.js";
import GameObject from "../GameObject.js";

export default class Strawberry extends GameObject {
    constructor() {
        super(new Vector(Tile.SIZE, Tile.SIZE), new Vector(0,0));
        this.sprite = Sprite.generateSpritesFromSpriteSheet(images.get(ImageName.CropsCarry), Tile.SIZE, Tile.SIZE)[VegetableType.Strawberry]
        this.name = "Strawberry";
        this.price = 13
    }

    render(positionX, positionY) {
        this.sprite.render(positionX, positionY)
    }

}