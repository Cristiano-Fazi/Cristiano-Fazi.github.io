import Animation from "../../../lib/Animation.js";
import State from "../../../lib/State.js";
import Direction from "../../enums/Direction.js";
import NPCStateName from "../../enums/NPCStateName.js";
import { stateStack, timer } from "../../globals.js";
import Tile from "../../services/Tile.js";

export default class NPCWalkingState extends State {
	/**
	 * In this state, the NPC can walk around following a predefined
	 * path setup in the NPC object.
	 * 
	 * @param {NPC} npc
	 */
	constructor(npc) {
		super();

		this.npc = npc;
		this.animation = {
			[Direction.Up]: new Animation([8, 9, 10, 11, 12, 13, 14, 15], 0.1),
			[Direction.Down]: new Animation([0, 1, 2, 3, 4, 5, 6, 7], 0.1),
			[Direction.Left]: new Animation([24, 25, 26, 27, 28, 29, 30, 31], 0.1),
			[Direction.Right]: new Animation([16, 17, 18, 19, 20, 21, 21, 23], 0.1),
		};

		this.isMoving = false;
		this.stepsTaken = 0;
		this.doReversePath = false;
	}

	update(dt) {
		this.npc.currentAnimation = this.animation[this.npc.direction];
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


		if (this.stepsTaken == this.npc.walkPaths[this.npc.currentWalkingPath].steps) {
			this.npc.isDonePath = true;
			this.npc.changeState(NPCStateName.Idling);
			timer.wait(2, () => {
				if(this.npc.currentWalkingPath + 1 == this.npc.walkPaths.length) {
					this.npc.walkPaths.reverse();
					this.doReversePath = !this.doReversePath;
					this.npc.currentWalkingPath = 0;
				}
				else {
					this.npc.currentWalkingPath += 1
				}
				this.npc.isDonePath = false
				this.stepsTaken = 0;
			})

			return;
		}

		this.updateDirection();
		this.move();
	}

	updateDirection() {
		this.npc.direction = this.getDirection()
	}

	getDirection() {
		let direction = this.npc.walkPaths[this.npc.currentWalkingPath].direction
		if(!this.doReversePath) {
			return direction
		}
		
		switch(direction) {
			case Direction.Right:
				return Direction.Left;
			case Direction.Left:
				return Direction.Right;
			case Direction.Down:
				return Direction.Up;
			case Direction.Up:
				return Direction.Down;
		}
	}

	move() {
		let x = this.npc.position.x;
		let y = this.npc.position.y;

		switch (this.npc.direction) {
			case Direction.Up: y--; break;
			case Direction.Down: y++; break;
			case Direction.Left: x--; break;
			case Direction.Right: x++; break;
		}
		this.npc.position.x = x;
		this.npc.position.y = y;

		this.tweenMovement(x, y);
		this.stepsTaken++;
	}


	tweenMovement(x, y) {
		this.isMoving = true;
		
		timer.tween(
			this.npc.canvasPosition,
			['x', 'y'],
			[(x * Tile.SIZE), (y * Tile.SIZE)],
			0.3,
			() => {
				this.isMoving = false;
				this.updateDirection();
			}
		);
		timer.tween(
			this.npc.position,
			['x', 'y'],
			[x, y],
			0.3,
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
		|| (x == -1 && y == 5 || x == -1 && y == 4); //Invisible collision tile, not in tile map editor?? Have no clue how these two tiles even exist in a collision layer
	}
}
