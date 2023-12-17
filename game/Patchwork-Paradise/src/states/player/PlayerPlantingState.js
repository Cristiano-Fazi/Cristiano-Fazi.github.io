import State from "../../../lib/State.js";
import Player from "../../entities/Player.js";
import Animation from "../../../lib/Animation.js";
import Direction from "../../enums/Direction.js";
import PlayerStateName from "../../enums/NPCStateName.js";
import { stateStack } from "../../globals.js";

export default class PlayerPlantingState extends State {
	/**
	 * State in which the player plants seeds in ground that has been tilled.
	 * The player cannot move in this state and the state is exited when the 
	 * animation is completed.
	 *
	 * @param {Player} player The player performing the planting
	 */
	constructor(player) {
		super();

		this.player = player;
		this.animation = {
			[Direction.Up]: new Animation([130, 130], 0.2, 1),
			[Direction.Down]: new Animation([130, 130], 0.2, 1),
			[Direction.Left]: new Animation([130, 130], 0.2, 1),
			[Direction.Right]: new Animation([130, 130], 0.2, 1),
		};
	}

	update() {
		this.player.currentAnimation = this.animation[this.player.direction];
		if(this.player.currentAnimation.isDone()) {

			let seedItem = this.player.inventory[this.player.selectedInventoryItem].item;

			stateStack.top().currentMap.objectStore.objects.push(seedItem.plant(this.player.position.x, this.player.position.y))
			this.player.removeItemFromInventory(this.player.selectedInventoryItem);

			this.player.currentAnimation.refresh();
			this.player.changeState(PlayerStateName.Idling)
		}
	}
}