import State from "../../../lib/State.js";
import Player from "../../entities/Player.js";
import Animation from "../../../lib/Animation.js";
import Direction from "../../enums/Direction.js";
import PlayerStateName from "../../enums/NPCStateName.js";
import TileType from "../../enums/TileType.js";
import { stateStack, sounds } from "../../globals.js";
import Vector from "../../../lib/Vector.js";
import SoundName from "../../enums/SoundName.js"; 

export default class PlayerHoeingState extends State {
	/**
	 * In this state, the played hoes the grass tile beneath them. The
	 * player cannot move in this state, and the state is exited when 
	 * the animation is completed.
	 *
	 * @param {Player} player
	 */
	constructor(player) {
		super();

		this.player = player;
		this.animation = {
			[Direction.Up]: new Animation([336, 337, 338, 339, 340], 0.1, 1),
			[Direction.Down]: new Animation([328, 329, 330, 331, 332], 0.1, 1),
			[Direction.Left]: new Animation([352, 353, 354, 355, 356], 0.1, 1),
			[Direction.Right]: new Animation([344, 345, 346, 347, 348], 0.1, 1),
		};
	}

	update() {
		this.player.currentAnimation = this.animation[this.player.direction];
		if(this.player.direction == Direction.Down) {
			this.player.positionOffset = { x: this.player.positionOffset.x, y: Player.HEIGHT / 2 - 10 };
		}
		if(this.player.currentAnimation.isDone()) {
			this.player.currentAnimation.refresh();
			this.player.positionOffset = new Vector(Player.STARTING_OFFSET.x, Player.STARTING_OFFSET.y)
			this.tilSoil(this.player.position.x, this.player.position.y)
			sounds.stop(SoundName.Hoeing);
			this.player.changeState(PlayerStateName.Idling)
		}
	}

	tilSoil(x, y) {
		let bottomLayer = stateStack.top().currentMap.bottomLayer;
		bottomLayer.setTile(x, y, TileType.TilledSoil);
	}
}