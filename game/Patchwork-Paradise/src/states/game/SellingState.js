import State from "../../../lib/State.js";
import { keys, stateStack, context, CANVAS_HEIGHT, CANVAS_WIDTH, sounds } from "../../globals.js";
import SellingUI from "../../user-interface/elements/shop/SellingUI.js";
import SoundName from "../../enums/SoundName.js";

export default class SellingState extends State {

	/**
	 * A state where the user can buy items from the shopkeeper
	 *
	 */
	constructor(player, shopkeeper) {
		super();
		this.player = player;
		this.shopkeeper = shopkeeper;
		this.SellingUI = new SellingUI(player, shopkeeper);
	}

	enter() {
		//sounds.play(SoundName.MenuOpen);
	}

	update(dt) {
		this.SellingUI.update(dt)
		if(keys.d) {
			keys.d = false;
            this.SellingUI.selectedItemIndex = Math.min(SellingUI.ROW_SIZE - 1, this.SellingUI.selectedItemIndex + 1);
			sounds.play(SoundName.SelectionMove);
		}
		if(keys.a) {
			keys.a = false;
            this.SellingUI.selectedItemIndex = Math.max(0, this.SellingUI.selectedItemIndex - 1);
			sounds.play(SoundName.SelectionMove);
		}
		if(keys.Enter) {
			keys.Enter = false;
            if(this.SellingUI.getSelectedItem()) {
                this.player.money += this.SellingUI.getSelectedItem().price;
                this.player.removeItemFromInventory(this.SellingUI.selectedItemIndex);
				sounds.play(SoundName.Coin)
            }
		}
		if(keys.Escape) {
			keys.Escape = false;
			this.SellingUI.isClosed = true;
		}
		
		if (this.SellingUI.isClosed) {
			stateStack.pop();
		}
	}

	render() {
		context.save();
		context.fillStyle = 'rgba(0, 0, 0, 0.7)';
		context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		context.restore();
		this.SellingUI.render()
	}
}
