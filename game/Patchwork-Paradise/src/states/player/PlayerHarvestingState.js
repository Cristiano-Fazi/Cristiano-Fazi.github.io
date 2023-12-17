import State from "../../../lib/State.js";
import Player from "../../entities/Player.js";
import Animation from "../../../lib/Animation.js";
import Direction from "../../enums/Direction.js";
import PlayerStateName from "../../enums/NPCStateName.js";
import TileType from "../../enums/TileType.js";
import { stateStack } from "../../globals.js";

export default class PlayerHarvestingState extends State {
	/**
	 * In this state, the player harvests the fully grown crop underneath them.
	 * The player cannot move in this state and the state is exited when the harvesting
	 * animation is complete, at which point they return to an idling state.
	 *
	 * @param {Player} player
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

			let crop = stateStack.top().currentMap.objectStore.objects.filter(obj => 
				obj.position.x == this.player.position.x && obj.position.y == this.player.position.y)[0]
			
			if(crop){
				this.player.addItemToInventory(crop.harvest());
			}

			stateStack.top().currentMap.objectStore.objects = stateStack.top().currentMap.objectStore.objects.filter(obj => 
				!(obj.position.x === this.player.position.x && obj.position.y === this.player.position.y));

			this.resetSoil(this.player.position.x, this.player.position.y);
			this.player.canHarvest = false;
			this.player.currentAnimation.refresh();
			this.player.changeState(PlayerStateName.Idling)
		}
	}

	resetSoil(x, y) {
		let bottomLayer = stateStack.top().currentMap.bottomLayer;
		bottomLayer.setTile(x, y, TileType.TillableGrass);
	}
}