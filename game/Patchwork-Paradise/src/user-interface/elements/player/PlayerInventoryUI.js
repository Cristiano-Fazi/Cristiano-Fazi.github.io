import Sprite from "../../../../lib/Sprite.js";
import Vector from "../../../../lib/Vector.js";
import Player from "../../../entities/Player.js";
import FontName from "../../../enums/FontName.js";
import ImageName from "../../../enums/ImageName.js";
import { context, images } from "../../../globals.js";
import Tile from "../../../services/Tile.js";
import UserInterfaceElement from "../../UserInterfaceElement.js";

export default class PlayerInventoryUI extends UserInterfaceElement {
	static FONT_SIZE = Tile.SIZE * 0.65;
	static FONT_FAMILY = FontName.Joystix;
    static UI_TILES = [174,175,176,177,178,179,180,181,182,183,184,185,186,198,199,200,201,202,203,204,205,206,207,208,209,210]
    static UI_WIDTH = 13
    static HOTBAR_POSITION_X = 5
    static HOTBAR_POSITION_Y = 20.5
    static ITEM_OFFSET_X = 22
    static ITEM_OFFSET_Y = Tile.SIZE / 2

	/**
	 * An inventory Hotbar where the player can store their items
	 *
	 * @param {Player} player
	 */
	constructor(player) {
        super(PlayerInventoryUI.HOTBAR_POSITION_X, PlayerInventoryUI.HOTBAR_POSITION_Y, 0, 0)
        this.sprites = this.loadInventorySprites()
        this.player = player
	}


    loadInventorySprites() {
        let sprites = Sprite.generateSpritesFromSpriteSheet(images.get(ImageName.UI), Tile.SIZE, Tile.SIZE)

        return PlayerInventoryUI.UI_TILES.map(index => sprites[index]);
    }

    update(dt) {

    }

    render() { 
        //Print top hotbar sprites
        for(let i = 0; i < PlayerInventoryUI.UI_WIDTH; i++) {
            this.sprites[i].render(this.position.x + (i * Tile.SIZE), this.position.y)
        }
        //Print bottom hotbar sprites
        for(let i = PlayerInventoryUI.UI_WIDTH; i < this.sprites.length; i++) {
            this.sprites[i].render(this.position.x + ((i - PlayerInventoryUI.UI_WIDTH)  * Tile.SIZE), this.position.y + Tile.SIZE)
        }
        //Render items in player inventory
        context.save();
        context.font = '10px Arial';
        context.fillStyle = 'white';
        context.strokeStyle = 'black';
        context.lineWidth = 1;
        context.textAlign= 'left';

        for(let i = 0; i < Player.INVENTORY_SIZE; i++) {
            let item = this.player.inventory[i]
            if(item) {
                this.player.inventory[i].item.render(Tile.SIZE / 2 + this.position.x + (i * PlayerInventoryUI.ITEM_OFFSET_X), this.position.y + PlayerInventoryUI.ITEM_OFFSET_Y)
                context.strokeStyle = 'black';
                context.strokeText(item.quantity, Tile.SIZE / 2 + this.position.x + 9 + (i * PlayerInventoryUI.ITEM_OFFSET_X), this.position.y + PlayerInventoryUI.ITEM_OFFSET_Y + 16);
                context.fillText(item.quantity, Tile.SIZE / 2 + this.position.x + 8 + (i * PlayerInventoryUI.ITEM_OFFSET_X), this.position.y + PlayerInventoryUI.ITEM_OFFSET_Y + 16)
            }
        }
        context.restore();  

        let selectedIndex = this.player.selectedInventoryItem
        
		context.save();
		context.strokeStyle = 'white';
		context.beginPath();
        context.rect(Tile.SIZE / 2 + (selectedIndex * PlayerInventoryUI.ITEM_OFFSET_X) + this.position.x, this.position.y + PlayerInventoryUI.ITEM_OFFSET_Y - 2, Tile.SIZE, Tile.SIZE + 4)
		context.stroke();
		context.closePath();
		context.restore();

        //MONEY
        context.save();
        let text = `$${this.player.money}`;
        let textWidth = context.measureText(text).width;
        let padding = 8;

		context.fillStyle = 'rgba(0, 0, 0, 0.5)';
		context.fillRect(0, 0, textWidth + padding * 2, 20);

        context.font = '12px Comic Sans';
        context.fillStyle = 'white';
        context.textAlign= 'left';
        context.fillText(`$${this.player.money}`, 8, 15)
        context.restore();  
    }
}
