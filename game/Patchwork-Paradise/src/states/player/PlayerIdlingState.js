import Animation from "../../../lib/Animation.js";
import State from "../../../lib/State.js";
import Player from "../../entities/Player.js";
import Direction from "../../enums/Direction.js";
import PlayerStateName from "../../enums/PlayerStateName.js";
import PlayState from "../game/PlayState.js";
import TileType from "../../enums/TileType.js";
import { keys, stateStack, sounds } from "../../globals.js";
import SoundName from "../../enums/SoundName.js";
import Door from "../../objects/townObjects/Door.js"

export default class PlayerIdlingState extends State {
	/**
	 * In this state, the player is stationary unless
	 * a directional key or the spacebar is pressed.
	 *
	 * @param {Player} player
	 */
	constructor(player) {
		super();

		this.player = player;
		this.animation = {
			[Direction.Up]: new Animation([8], 1),
			[Direction.Down]: new Animation([0], 1),
			[Direction.Left]: new Animation([24], 1),
			[Direction.Right]: new Animation([16], 1),
		};
	}

	enter() {
		this.player.currentAnimation = this.animation[this.player.direction];
	}

	update() {
		if(this.isTraveling) {
			return
		}

		if(this.player.isTraveling) {
			if(!stateStack.top() instanceof PlayState) {
				return
			}

			return stateStack.top().currentMap.exits.forEach(exit => {
				if(exit.didCollideWithEntity(this.player.hitbox)){//Did the player collide with the Door?
					if(exit instanceof Door){
						this.player.changeState(PlayerStateName.Idling);
						stateStack.top().switchMaps(exit.map);
					}
					else{
						this.player.changeState(PlayerStateName.Idling);
						stateStack.top().switchMaps(exit.map)
					}
					exit.isOpenable = true;
				}
			});
		}

		if (keys.s) {
			this.player.direction = Direction.Down;
			this.player.changeState(PlayerStateName.Walking);
		}
		if (keys.d) {
			this.player.direction = Direction.Right;
			this.player.changeState(PlayerStateName.Walking);
		}
		if (keys.w) {
			this.player.direction = Direction.Up;
			this.player.changeState(PlayerStateName.Walking);
		}
		if (keys.a) {
			this.player.direction = Direction.Left;
			this.player.changeState(PlayerStateName.Walking);
		}
		if (keys[' ']) {
			let map = stateStack.top().currentMap
			if(map.farmingEnabled) {
				let tile = map.bottomLayer.getTile(this.player.position.x, this.player.position.y);
				let inventoryItem = this.player.inventory[this.player.selectedInventoryItem];

				if(this.player.canHarvest) {
					if(!this.player.isInventoryFull()) {
						this.player.changeState(PlayerStateName.Harvesting);
					}
					return
				}

				if(tile.id == TileType.TillableGrass) {
					sounds.play(SoundName.Hoeing);
					this.player.changeState(PlayerStateName.Hoeing);
				}

				if(this.canPlant(tile, inventoryItem)) {
					this.player.changeState(PlayerStateName.Planting);
				}
			}
		}

		for(let i = 0; i < Player.INVENTORY_SIZE; i++) {
			if(keys[(i + 1).toString()]) {
				this.player.selectedInventoryItem = i;
			}
		}
	}

	canPlant(tile, inventoryItem){
		let isOnPlantedSoil = false;
		stateStack.top().currentMap.objectStore.objects.forEach(object => {
			if((this.player.position.x == object.position.x) && (this.player.position.y == object.position.y)){
				isOnPlantedSoil = true;
			}
		});

		return (tile.id == TileType.TilledSoil && inventoryItem && inventoryItem.item.isSeed && !isOnPlantedSoil)
	}
}
