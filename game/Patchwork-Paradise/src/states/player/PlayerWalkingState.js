import Animation from "../../../lib/Animation.js";
import State from "../../../lib/State.js";
import Player from "../../entities/Player.js";
import Direction from "../../enums/Direction.js";
import PlayerStateName from "../../enums/PlayerStateName.js";
import { keys, stateStack, timer } from "../../globals.js";
import Tile from "../../services/Tile.js";
import Door from "../../objects/townObjects/Door.js"
import PlayState from "../game/PlayState.js";

export default class PlayerWalkingState extends State {
	/**
	 * In this state, the player can move around using the
	 * directional keys. From here, the player can go idle
	 * if no keys are being pressed.
	 *
	 * @param {Player} player
	 */
	constructor(player) {
		super();

		this.player = player;
		this.animation = {
			[Direction.Up]: new Animation([8, 9, 10, 11, 12, 13, 14, 15], 0.1),
			[Direction.Down]: new Animation([0, 1, 2, 3, 4, 5, 6, 7], 0.1),
			[Direction.Left]: new Animation([24, 25, 26, 27, 28, 29, 30, 31], 0.1),
			[Direction.Right]: new Animation([16, 17, 18, 19, 20, 21, 21, 23], 0.1),
		};

		this.isMoving = false;
	}

	update(dt) {
		this.player.currentAnimation = this.animation[this.player.direction];

		this.handleMovement();
	}

	handleMovement() {
		/**
		 * The Player's movement is locked to
		 * the grid. To restrict them from moving freely, we set a flag
		 * to track if they're currently moving from one tile to another,
		 * and reject input if so.
		 */
		if (this.isMoving) {
			return;
		}

		if (!keys.w && !keys.a && !keys.s && !keys.d) {
			this.player.changeState(PlayerStateName.Idling);
			return;
		}

		this.updateDirection();
		this.move();
	}

	updateDirection() {
		if (keys.s) {
			this.player.direction = Direction.Down;
		}
		else if (keys.d) {
			this.player.direction = Direction.Right;
		}
		else if (keys.w) {
			this.player.direction = Direction.Up;
		}
		else if (keys.a) {
			this.player.direction = Direction.Left;
		}

		for(let i = 0; i < Player.INVENTORY_SIZE; i++) {
			if(keys[(i + 1).toString()]) {
				this.player.selectedInventoryItem = i;
			}
		}
	}

	move() {
		let x = this.player.position.x;
		let y = this.player.position.y;

		switch (this.player.direction) {
			case Direction.Up: y--; break;
			case Direction.Down: y++; break;
			case Direction.Left: x--; break;
			case Direction.Right: x++; break;
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

		if (!this.isValidMove(x, y)) {
			return;
		}
		
		this.player.position.x = x;
		this.player.position.y = y;

		this.tweenMovement(x, y);
	}


	tweenMovement(x, y) {
		this.isMoving = true;
		
		timer.tween(
			this.player.canvasPosition,
			['x', 'y'],
			[(x * Tile.SIZE), (y * Tile.SIZE)],
			0.15,
			() => {
				this.isMoving = false;
				this.updateDirection();
			}
		);
		timer.tween(
			this.player.position,
			['x', 'y'],
			[x, y],
			0.15,
			() => {
				this.isMoving = false;
				this.updateDirection();
			}
		);
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @returns Whether the player is going to move on to a non-collidable tile.
	 */
	isValidMove(x, y) {
		return stateStack.top().currentMap.collisionLayer.getTile(x, y) === null 
		&& x >= -1 
		&& x < stateStack.top().currentMap.size 
		|| (x == -1 && y == 5 || x == -1 && y == 4);
	}
}
