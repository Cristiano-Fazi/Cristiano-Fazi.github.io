import Sprite from "../../../lib/Sprite.js";
import ImageName from "../../enums/ImageName.js";
import { images } from "../../globals.js";
import UserInterfaceElement from "../UserInterfaceElement.js";

export default class BlissardScreen extends UserInterfaceElement {
	constructor() {
        super(0,0, 0,0)
        this.sprite = this.loadItemSprites()
	}

    loadItemSprites() {
        return Sprite.generateSpritesFromSpriteSheet(images.get(ImageName.Blissard), 360, 360)[0]
    }

    render() { 
        this.sprite.render(0,0)
    }
}