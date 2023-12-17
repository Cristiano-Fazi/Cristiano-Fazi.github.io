import Sprite from "../../../../lib/Sprite.js";
import Vector from "../../../../lib/Vector.js";
import Player from "../../../entities/Player.js";
import FontName from "../../../enums/FontName.js";
import ImageName from "../../../enums/ImageName.js";
import { context, images } from "../../../globals.js";
import Tile from "../../../services/Tile.js";
import UserInterfaceElement from "../../UserInterfaceElement.js";
import PlayerInventoryUI from "./PlayerInventoryUI.js";

export default class BarnUI extends UserInterfaceElement {
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
    static COLUMN_SIZE = 4
    static HOTBAR_POSITION_X = 72 
    static HOTBAR_POSITION_Y = 205
    static HOTBAR_ROW = 3

	/**
	 * 
	 *
	 * @param {Player} player
	 */
	constructor(player) {
        super(BarnUI.UI_POSITION_X, BarnUI.UI_POSITION_Y, 0, 0)
        this.barnSprites = this.loadBarnSprites()
        this.playerInventorySprites = this.loadInventorySprites()
        this.player = player;
        this.isClosed = false;
        this.itemPositionX = this.position.x + 12;
        this.itemPositionY = this.position.y + 41;
        this.selectedItemIndex = 0;
        this.selectedRow = 0;
	}

    loadBarnSprites() {
        return Sprite.generateSpritesFromSpriteSheet(images.get(ImageName.BarnInventory), Tile.SIZE, Tile.SIZE)
    }
    
    loadInventorySprites() {
        const ui_tiles = [174,175,176,177,178,179,180,181,182,183,184,185,186,198,199,200,201,202,203,204,205,206,207,208,209,210]
        let sprites = Sprite.generateSpritesFromSpriteSheet(images.get(ImageName.UI), Tile.SIZE, Tile.SIZE)
        return ui_tiles.map(index => sprites[index]);
    }
    getSelectedItem() {
        if(this.selectedRow == BarnUI.HOTBAR_ROW) {
            return this.player.inventory[this.selectedItemIndex];  
        }
        return this.player.barnInventory[this.getSelectedBarnIndex()]  
    }

    getSelectedBarnIndex() {
        return this.selectedItemIndex + (this.selectedRow * BarnUI.ROW_SIZE)
    }

    update(dt) {}

    render() { 
        //UI
        let i = 0
        for(let y = 0; y < BarnUI.UI_HEIGHT; y++) {
            for(let x = 0; x < BarnUI.UI_WIDTH; x++) {
                this.barnSprites[i++].render(this.position.x + (x * Tile.SIZE), this.position.y + (y * Tile.SIZE))
            }
        }

        //Print top hotbar sprites
        for(let i = 0; i < PlayerInventoryUI.UI_WIDTH; i++) {
            this.playerInventorySprites[i].render(BarnUI.HOTBAR_POSITION_X + (i * Tile.SIZE), BarnUI.HOTBAR_POSITION_Y)
        }
        //Print bottom hotbar sprites
        for(let i = PlayerInventoryUI.UI_WIDTH; i < this.playerInventorySprites.length; i++) {
            this.playerInventorySprites[i].render(BarnUI.HOTBAR_POSITION_X  + ((i - PlayerInventoryUI.UI_WIDTH)  * Tile.SIZE), BarnUI.HOTBAR_POSITION_Y + Tile.SIZE)
        }
        
        //ITEMS
        context.save();
        context.font = '10px Arial';
        context.fillStyle = 'white';
        context.strokeStyle = 'black';
        context.lineWidth = 1;
        context.textAlign= 'left';

        i = 0;
        for(let y = 0; y < 3; y++) {
            for(let x = 0; x < 9; x++) {
                let item = this.player.barnInventory[i]
                if(item) {
                    this.player.barnInventory[i].item.render(Tile.SIZE / 2 + this.itemPositionX + (x * BarnUI.ITEM_OFFSET_X), this.itemPositionY + (y * Tile.SIZE) + (y * BarnUI.ITEM_OFFSET_Y))
                    context.strokeText(item.quantity, Tile.SIZE / 2 + this.itemPositionX + 9 + (x * BarnUI.ITEM_OFFSET_X), this.itemPositionY + PlayerInventoryUI.ITEM_OFFSET_Y + 6 + (y * Tile.SIZE) + (y * BarnUI.ITEM_OFFSET_Y));
                    context.fillText(item.quantity, Tile.SIZE / 2 + this.itemPositionX + 8 + (x * BarnUI.ITEM_OFFSET_X), this.itemPositionY + PlayerInventoryUI.ITEM_OFFSET_Y + 6 + (y * Tile.SIZE) + (y * BarnUI.ITEM_OFFSET_Y));
                }
                i++;
            }
        }

        //Render the number of each item

        for(let i = 0; i < Player.INVENTORY_SIZE; i++) {
            let item = this.player.inventory[i]
            if(item) {
                this.player.inventory[i].item.render(Tile.SIZE / 2 + BarnUI.HOTBAR_POSITION_X + (i * PlayerInventoryUI.ITEM_OFFSET_X), BarnUI.HOTBAR_POSITION_Y + PlayerInventoryUI.ITEM_OFFSET_Y)
                context.strokeText(item.quantity, Tile.SIZE / 2 + BarnUI.HOTBAR_POSITION_X + 9 + (i * PlayerInventoryUI.ITEM_OFFSET_X), BarnUI.HOTBAR_POSITION_Y + PlayerInventoryUI.ITEM_OFFSET_Y + 16);
                context.fillText(item.quantity, Tile.SIZE / 2 + BarnUI.HOTBAR_POSITION_X + 8 + (i * PlayerInventoryUI.ITEM_OFFSET_X), BarnUI.HOTBAR_POSITION_Y + PlayerInventoryUI.ITEM_OFFSET_Y + 16)
            }
        }
        context.restore();  

        //SELECTION
        if(this.selectedRow == BarnUI.HOTBAR_ROW) {
            let selectedIndex = this.selectedItemIndex;
            console.log(selectedIndex)
            context.save();
            context.strokeStyle = 'white';
            context.beginPath();
            context.rect(Tile.SIZE / 2 + (selectedIndex * PlayerInventoryUI.ITEM_OFFSET_X) + BarnUI.HOTBAR_POSITION_X, BarnUI.HOTBAR_POSITION_Y + PlayerInventoryUI.ITEM_OFFSET_Y - 2, Tile.SIZE, Tile.SIZE + 4)
            context.stroke();
            context.closePath();
            context.restore();
        }
        else {
            context.save();
            context.strokeStyle = 'white';
            context.beginPath();
            context.rect(Tile.SIZE / 2 + (this.selectedItemIndex * BarnUI.ITEM_OFFSET_X) + this.itemPositionX, this.itemPositionY - 2 + (this.selectedRow * Tile.SIZE) + (this.selectedRow * BarnUI.ITEM_OFFSET_Y), Tile.SIZE, Tile.SIZE + 3)
            context.stroke();
            context.closePath();
            context.restore();
        }
    }
}