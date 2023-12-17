import Sprite from "../../../lib/Sprite.js";
import Player from "../../entities/Player.js";
import FontName from "../../enums/FontName.js";
import ImageName from "../../enums/ImageName.js";
import { images } from "../../globals.js";
import Tile from "../../services/Tile.js";
import UserInterfaceElement from "../UserInterfaceElement.js";

export default class PauseScreen extends UserInterfaceElement {
    static FONT_SIZE = Tile.SIZE * 0.65;
	static FONT_FAMILY = FontName.Joystix;

	/**
	 * PauseScreen shows the user three options, allowing them to
     * save, exit or return to the game.
	 *
	 * @param {Player} player
     * @param {Vik} shopkeeper 
	 */
	constructor() {
        super(PauseScreen.UI_POSITION_X, PauseScreen.UI_POSITION_Y, 0, 0)
        this.sprite = this.loadItemSprites()
	}

    loadItemSprites() {
        return Sprite.generateSpritesFromSpriteSheet(images.get(ImageName.PauseUi), 360, 360)[0]
    }

    update(dt) { }

    render() { 
        this.sprite.render(0,0)
    }
}