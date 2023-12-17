import Sprite from "../../../../lib/Sprite.js";
import FontName from "../../../enums/FontName.js";
import ImageName from "../../../enums/ImageName.js";
import { context, images } from "../../../globals.js";
import Tile from "../../../services/Tile.js";
import UserInterfaceElement from "../../UserInterfaceElement.js";

export default class BuyingUI extends UserInterfaceElement {
    static FONT_SIZE = Tile.SIZE * 0.65;
	static FONT_FAMILY = FontName.Joystix;
    static UI_WIDTH = 14
    static UI_HEIGHT = 8
    static UI_POSITION_X = 4
    static UI_POSITION_Y = 5
    static ITEM_OFFSET_X = 21
    static ITEM_OFFSET_Y = Tile.SIZE / 2 - 2
    static SHOP_SIZE = 27
    static ROW_SIZE = 9
    static COLUMN_SIZE = 3

	constructor(player, shopkeeper) {
        super(BuyingUI.UI_POSITION_X, BuyingUI.UI_POSITION_Y, 0, 0)
        this.sprites = this.loadItemSprites()
        this.player = player
        this.shopkeeper = shopkeeper
        this.isClosed = false;
        this.itemPositionX = this.position.x + 12
        this.itemPositionY = this.position.y + 41
        this.selectedItemIndex = 0;
        this.selectedRow = 0
	}

    loadItemSprites() {
        return Sprite.generateSpritesFromSpriteSheet(images.get(ImageName.ViksShop), Tile.SIZE, Tile.SIZE)
    }

    update(dt) { }

    getSelectedItem() {
        return this.shopkeeper.items[this.selectedItemIndex + (this.selectedRow * BuyingUI.ROW_SIZE)]
    }

    render() { 
        //UI
        let i = 0
        for(let y = 0; y < BuyingUI.UI_HEIGHT; y++) {
            for(let x = 0; x < BuyingUI.UI_WIDTH; x++) {
                this.sprites[i++].render(this.position.x + (x * Tile.SIZE), this.position.y + (y * Tile.SIZE))
            }
        }
        
        //ITEMS
        i = 0;
        for(let y = 0; y < 3; y++) {
            for(let x = 0; x < 9; x++) {
                let item = this.shopkeeper.items[i]
                if(item) {
                    this.shopkeeper.items[i].render(Tile.SIZE / 2 + this.itemPositionX + (x * BuyingUI.ITEM_OFFSET_X), this.itemPositionY + (y * Tile.SIZE) + (y * BuyingUI.ITEM_OFFSET_Y))
                }
                i++;
            }

        }

        //TEXT
        let selectedItem = this.getSelectedItem();
        if(selectedItem) {
            context.save();
            context.font = '16px Comic Sans';
            context.fillStyle = 'white';
            context.textAlign= 'left';
            context.fillText("Item:", this.position.x + 10, this.position.y + 130 + BuyingUI.UI_HEIGHT)
            context.fillText(selectedItem.name, this.position.x + 50, this.position.y + 130 + BuyingUI.UI_HEIGHT)
            context.fillText("Price:", this.position.x + 10, this.position.y + 150 + BuyingUI.UI_HEIGHT)
            context.fillText("$" + selectedItem.price, this.position.x + 50, this.position.y + 150 + BuyingUI.UI_HEIGHT)
            context.restore();  
        }

        //SELECTION
		context.save();
		context.strokeStyle = 'white';
		context.beginPath();
        context.rect(Tile.SIZE / 2 + (this.selectedItemIndex * BuyingUI.ITEM_OFFSET_X) + this.itemPositionX, this.itemPositionY - 2 + (this.selectedRow * Tile.SIZE) + (this.selectedRow * BuyingUI.ITEM_OFFSET_Y), Tile.SIZE, Tile.SIZE + 3)
		context.stroke();
		context.closePath();
		context.restore();
    }
}