import State from "../../../lib/State.js";
import {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	context,
	stateStack,
	timer,
} from "../../globals.js";
import BlissardScreen from "../../user-interface/elements/BlissardScreen.js";

export default class BlissardState extends State {
	static TYPE = { In: 0, Out: 1 };
	static DISPLAY_TIME = 3
	static FADE_TIME = 1.5
	constructor(onTransitionComplete = () => { }) {
		super();

		this.backdrop = new BlissardScreen();

		this.alpha = 0;
		this.endAlpha = 1;

		timer.wait(BlissardState.DISPLAY_TIME - BlissardState.FADE_TIME, () => {
			timer.tween(this, ['alpha'], [this.endAlpha], BlissardState.FADE_TIME, () => {
				stateStack.pop();
				onTransitionComplete();
			});
		})

	}

	render() {
		this.backdrop.render();
		context.save();
		context.fillStyle = `rgba(0, 0, 0, ${this.alpha})`;
		context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		context.restore();
	}

	/**
	 * Smoothly transitions from one state to another with a nice fade.
	 * By default, pops the last state halfway through the fade.
	 *
	 * @param {function} betweenEvent
	 */
	static fade(betweenEvent = () => stateStack.pop()) {
		stateStack.push(new TransitionState(TransitionState.TYPE.In, () => {
			betweenEvent();
			stateStack.push(new TransitionState(TransitionState.TYPE.Out));
		}));
	}
}
