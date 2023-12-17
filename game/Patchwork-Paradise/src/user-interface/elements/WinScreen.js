import Sprite from "../../../lib/Sprite.js";
import Player from "../../entities/Player.js";
import FontName from "../../enums/FontName.js";
import ImageName from "../../enums/ImageName.js";
import { images } from "../../globals.js";
import Tile from "../../services/Tile.js";
import UserInterfaceElement from "../UserInterfaceElement.js";


export default class WinScreen extends UserInterfaceElement {
    static FONT_SIZE = Tile.SIZE * 0.65;
	static FONT_FAMILY = FontName.Joystix;

	/**
	 * WinScreen serves no function other than informing the player
     * that they have "beat" the game by achieving the max level of
     * house possible.
	 *
	 * @param {Player} player
     * @param {Vik} shopkeeper 
	 */
	constructor() {
        super(0,0, 0, 0)
        this.sprite = this.loadItemSprites()
	}


    loadItemSprites() {
        return Sprite.generateSpritesFromSpriteSheet(images.get(ImageName.WinUI), 360, 360)[0]
    }

    render() { 
        this.sprite.render(0,0)
    }
}