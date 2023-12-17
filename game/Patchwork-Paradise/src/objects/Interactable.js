import Sprite from "../../lib/Sprite.js";
import Vector from "../../lib/Vector.js";
import ImageName from "../enums/ImageName.js";
import Tile from "../services/Tile.js";
import { images } from "../globals.js";

export default class Interactable {
    constructor() {
        this.sprite = Sprite.generateSpritesFromSpriteSheet(images.get(ImageName.Interactable), Tile.SIZE, Tile.SIZE)[0];
        this.shouldRender = false;
        this.position = new Vector(0,0);
        this.offset = new Vector(0,0);
    }

    update(position, offset) {
        this.position.x = position.x * Tile.SIZE;
        this.position.y = position.y * Tile.SIZE;
        this.offset.x = offset.x;
        this.offset.y = offset.y;
    }

    render() {
        const x = this.position.x + this.offset.x;
        const y = this.position.y + this.offset.y
        this.sprite.render(x, y);
    }
}