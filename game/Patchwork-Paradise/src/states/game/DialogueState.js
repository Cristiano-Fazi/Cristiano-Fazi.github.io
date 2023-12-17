import State from "../../../lib/State.js";
import { stateStack } from "../../globals.js";
import Panel from "../../user-interface/elements/Panel.js";
import Textbox from "../../user-interface/elements/Textbox.js";

export default class DialogueState extends State {

	/**
	 * State that presents a Textbox to the player
	 * and performs a callback after the Textbox closes.
	 *
	 * @param {string} text
	 * @param {object} placement Where on the screen the Textbox should be displayed.
	 * @param {function} callback
	 */
	constructor(text, placement = Panel.BOTTOM_DIALOGUE, callback = () => { }) {
		super();

		this.textbox = new Textbox(
			placement.x,
			placement.y,
			placement.width,
			placement.height,
			text,
			{ 
			  isAdvanceable: true,
			  fontSize: 20 
			}
		);
		this.callback = callback;
	}

	enter() {
		//sounds.play(SoundName.MenuOpen);
	}

	update() {
		this.textbox.update();

		if (this.textbox.isClosed) {
			stateStack.pop();
			this.callback();
		}
	}

	render() {
		this.textbox.render();
	}
}
