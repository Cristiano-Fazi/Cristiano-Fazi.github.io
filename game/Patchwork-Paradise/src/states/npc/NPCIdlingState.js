import Animation from "../../../lib/Animation.js";
import State from "../../../lib/State.js";
import Player from "../../entities/Player.js";
import Direction from "../../enums/Direction.js";
import NPCStateName from "../../enums/NPCStateName.js";
import { keys } from "../../globals.js";

export default class NPCIdlingState extends State {

	/**
	 * In this state, the NPC is stationary
	 *
	 * @param {NPC} npc
	 */
	constructor(npc) {
		super();

		this.npc = npc;
		this.animation = {
			[Direction.Up]: new Animation([8], 1),
			[Direction.Down]: new Animation([0], 1),
			[Direction.Left]: new Animation([24], 1),
			[Direction.Right]: new Animation([16], 1),
		};
	}

	enter() {
		this.npc.currentAnimation = this.animation[this.npc.direction];
	}

	update() {
		if(this.npc.walkPaths.length > 0 && !this.npc.isDonePath) {
			this.npc.direction = this.npc.walkPaths[this.npc.currentWalkingPath].direction
			this.npc.changeState(NPCStateName.Walking)
		} 
	}
}
