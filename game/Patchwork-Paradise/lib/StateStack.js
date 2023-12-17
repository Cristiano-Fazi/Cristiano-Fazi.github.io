import { timer } from "../src/globals.js"
export default class StateStack {
	constructor() {
		this.states = [];
	}

	update(dt) {
		timer.update(dt);
		this.top().update(dt);
	}

	render(context) {
		this.states.forEach((state) => state.render(context));
	}

	push(state) {
		this.states.push(state);
		this.top().enter();
	}

	pop() {
		this.top().exit();
		return this.states.splice(this.states.length - 1, 1)[0];
	}

	top() {
		return this.states[this.states.length - 1];
	}

	clear() {
		this.states = [];
	}
}
