import { images } from "../../globals.js";
import Sprite from "../../../lib/Sprite.js";
import Vector from "../../../lib/Vector.js";
import ImageName from "../../enums/ImageName.js";
import VegetableType from "../../enums/VegetableType.js";
import Tile from "../../services/Tile.js";
import Seed from "./Seed.js";
import CropFactory from "../../services/Factories/CropFactory.js";
import CropType from "../../enums/CropType.js";

export default class LettuceSeed extends Seed {
    constructor() {
        super();
        this.sprite = Sprite.generateSpritesFromSpriteSheet(images.get(ImageName.Seeds), Tile.SIZE, Tile.SIZE)[VegetableType.Lettuce]
        this.name = "Lettuce Seeds";
        this.price = 7
    }

    render(positionX, positionY) {
        this.sprite.render(positionX, positionY)
    }

    plant(x, y) {
        return CropFactory.CreateInstance(CropType.LettuceCrop, new Vector(x, y))
    }
}