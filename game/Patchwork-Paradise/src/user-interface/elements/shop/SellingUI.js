import Sprite from "../../../../lib/Sprite.js";
import Player from "../../../entities/Player.js";
import FontName from "../../../enums/FontName.js";
import ImageName from "../../../enums/ImageName.js";
import { context, images } from "../../../globals.js";
import Tile from "../../../services/Tile.js";
import UserInterfaceElement from "../../UserInterfaceElement.js";
import PlayerInventoryUI from "../player/PlayerInventoryUI.js";

export default class SellingUI extends UserInterfaceElement {
    static FONT_SIZE = Tile.SIZE * 0.65;
	static FONT_FAMILY = FontName.Joystix;
    static UI_TILES = [174,175,176,177,178,179,180,181,182,183,184,185,186,198,199,200,201,202,203,204,205,206,207,208,209,210]
    static UI_WIDTH = 14
    static UI_HEIGHT = 8
    static UI_POSITION_X = 4
    static UI_POSITION_Y = 8
    static ITEM_OFFSET_X = 21
    static ITEM_OFFSET_Y = Tile.SIZE / 2 - 2
    static SHOP_SIZE = 27
    static ROW_SIZE = 9
    static COLUMN_SIZE = 3

	constructor(player, shopkeeper) {
        super(SellingUI.UI_POSITION_X, SellingUI.UI_POSITION_Y, 0, 0)
        this.sprites = this.loadItemSprites()
        this.player = player
        this.shopkeeper = shopkeeper
        this.isClosed = false;
        this.itemPositionX = this.position.x + 12
        this.itemPositionY = this.position.y + 41
        this.selectedItemIndex = 0;
	}


    loadItemSprites() {
        let sprites = Sprite.generateSpritesFromSpriteSheet(images.get(ImageName.UI), Tile.SIZE, Tile.SIZE)
        return PlayerInventoryUI.UI_TILES.map(index => sprites[index]);
    }

    update(dt) { }

    getSelectedItem() {
        let inventoryItem = this.player.inventory[this.selectedItemIndex]
        if(!inventoryItem)
            return null
        return inventoryItem.item
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
        for(let i = 0; i < Player.INVENTORY_SIZE; i++) {
            let item = this.player.inventory[i]
            if(item) {
                this.player.inventory[i].item.render(Tile.SIZE / 2 + this.position.x + (i * PlayerInventoryUI.ITEM_OFFSET_X), this.position.y + PlayerInventoryUI.ITEM_OFFSET_Y)
            }
        }

        //Render the number of each item
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

        //SELECTION
        let selectedIndex = this.selectedItemIndex;
        
		context.save();
		context.strokeStyle = 'white';
		context.beginPath();
        context.rect(Tile.SIZE / 2 + (selectedIndex * PlayerInventoryUI.ITEM_OFFSET_X) + this.position.x, this.position.y + PlayerInventoryUI.ITEM_OFFSET_Y - 2, Tile.SIZE, Tile.SIZE + 4)
		context.stroke();
		context.closePath();
		context.restore();

        let selectedItem = this.getSelectedItem();
        if(selectedItem) {
            context.save();
            context.font = '16px Comic Sans';
            context.fillStyle = 'white';
            context.textAlign= 'left';
            context.fillText("Item:", this.position.x + 10, this.position.y + 40 + SellingUI.UI_HEIGHT)
            context.fillText(selectedItem.name, this.position.x + 50, this.position.y + 40 + SellingUI.UI_HEIGHT)
            context.fillText("Sell Price:", this.position.x + 10, this.position.y + 60 + SellingUI.UI_HEIGHT)
            context.fillText("$" + selectedItem.price, this.position.x + 80, this.position.y + 60 + SellingUI.UI_HEIGHT)
            context.restore();  
        }
    }
}