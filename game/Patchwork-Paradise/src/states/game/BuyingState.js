import State from "../../../lib/State.js";
import { keys, stateStack, context, CANVAS_HEIGHT, CANVAS_WIDTH, sounds } from "../../globals.js";
import BuyingUI from "../../user-interface/elements/shop/BuyingUI.js"
import SoundName from "../../enums/SoundName.js";
export default class BuyingState extends State {

	/**
	 * A state where the user can buy items from the shopkeeper
	 *
	 */
	constructor(player, shopkeeper) {
		super();
		this.player = player;
		this.shopkeeper = shopkeeper;
		this.BuyingUI = new BuyingUI(player, shopkeeper);
	}

	enter() {
		//sounds.play(SoundName.MenuOpen);
	}

	update(dt) {
		this.BuyingUI.update(dt)
		if(keys.d) {
			keys.d = false;
			this.BuyingUI.selectedItemIndex = Math.min(BuyingUI.ROW_SIZE - 1, this.BuyingUI.selectedItemIndex + 1);
			sounds.play(SoundName.SelectionMove);
		}
		if(keys.a) {
			keys.a = false;
			this.BuyingUI.selectedItemIndex = Math.max(0, this.BuyingUI.selectedItemIndex - 1);
			sounds.play(SoundName.SelectionMove);
		}
		if(keys.s) {
			keys.s = false;
			this.BuyingUI.selectedRow = Math.min(BuyingUI.COLUMN_SIZE - 1, this.BuyingUI.selectedRow + 1);
			sounds.play(SoundName.SelectionMove);
		}
		if(keys.w) {
			keys.w = false;
			this.BuyingUI.selectedRow = Math.max(0, this.BuyingUI.selectedRow - 1);
			sounds.play(SoundName.SelectionMove);
		}
		if(keys.Enter) {
			keys.Enter = false;
			sounds.play(SoundName.SelectionChoice);
			if(this.BuyingUI.getSelectedItem() && this.BuyingUI.getSelectedItem().price <= this.player.money && this.player.money != 0) {
				if(this.player.addItemToInventory(this.BuyingUI.getSelectedItem())) {
					this.player.money -= this.BuyingUI.getSelectedItem().price;
				}
			}
		}
		if(keys.Escape) {
			keys.Escape = false;
			this.BuyingUI.isClosed = true;
		}
		
		if (this.BuyingUI.isClosed) {
			stateStack.pop();
		}
	}

	render() {
		context.save();
		context.fillStyle = 'rgba(0, 0, 0, 0.7)';
		context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		context.restore();
		this.BuyingUI.render()
	}
}
