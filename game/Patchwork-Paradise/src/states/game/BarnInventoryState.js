import State from "../../../lib/State.js";
import { keys, stateStack, context, CANVAS_HEIGHT, CANVAS_WIDTH, sounds } from "../../globals.js";
import BarnUI from "../../user-interface/elements/player/BarnUI.js";
import SoundName from "../../enums/SoundName.js";
export default class BarnInventoryState extends State {
	/**
	 * A state where the user can buy items from the shopkeepers
	 *
	 */
	constructor(player, barn) {
		super();
		this.player = player;
        this.barn;
		this.BarnUI = new BarnUI(player);
	}

	enter() {
		//sounds.play(SoundName.MenuOpen);
	}

	update(dt) {
		this.BarnUI.update(dt)
		if(keys.d) {
			keys.d = false;
			this.BarnUI.selectedItemIndex = Math.min(BarnUI.ROW_SIZE - 1, this.BarnUI.selectedItemIndex + 1);
            sounds.play(SoundName.SelectionMove);
		}
		if(keys.a) {
			keys.a = false;
			this.BarnUI.selectedItemIndex = Math.max(0, this.BarnUI.selectedItemIndex - 1);
            sounds.play(SoundName.SelectionMove);
		}
		if(keys.s) {
			keys.s = false;
			this.BarnUI.selectedRow = Math.min(BarnUI.COLUMN_SIZE - 1, this.BarnUI.selectedRow + 1);
            sounds.play(SoundName.SelectionMove);
		}
		if(keys.w) {
			keys.w = false;
			this.BarnUI.selectedRow = Math.max(0, this.BarnUI.selectedRow - 1);
            sounds.play(SoundName.SelectionMove);
		}
		if(keys.Enter) {
			keys.Enter = false;
            sounds.play(SoundName.SelectionChoice);
            if(this.BarnUI.selectedRow == BarnUI.HOTBAR_ROW) {
                if(this.player.inventory[this.BarnUI.selectedItemIndex]) {
                    if(this.player.addItemToBarnInventory(this.player.inventory[this.BarnUI.selectedItemIndex].item)) {
                        this.player.removeItemFromInventory(this.BarnUI.selectedItemIndex);
                    }
                }

            }
            else {
                if(!this.player.isInventoryFull()) {
                    if(this.BarnUI.getSelectedItem()) {
                        if(this.player.addItemToInventory(this.BarnUI.getSelectedItem().item)) {
                            this.player.removeItemFromBarnInventory(this.BarnUI.getSelectedBarnIndex())
                        }
                    }
			    }
            }


		}
		if(keys.Escape) {
			keys.Escape = false;
			this.BarnUI.isClosed = true;
		}
		if (this.BarnUI.isClosed) {
			stateStack.pop();
		}
	}

	render() {
		context.save();
		context.fillStyle = 'rgba(0, 0, 0, 0.7)';
		context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		context.restore();
		this.BarnUI.render()
	}
}