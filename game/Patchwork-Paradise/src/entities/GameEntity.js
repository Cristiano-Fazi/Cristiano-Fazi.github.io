import Direction from "../enums/Direction.js";
import Tile from "../services/Tile.js";
import Vector from "../../lib/Vector.js";
import Hitbox from "../../lib/Hitbox.js";
import { DEBUG, context } from "../globals.js";

export default class GameEntity {
	static WIDTH = 32;
	static HEIGHT = 32;
	static HITBOXWIDTH = 31;
	static HITBOXHEIGHT = 30.5;

	/**
	 * The base class to be extended by all entities in the game.
	 * Right now we just have one Player character, but this could
	 * be extended to implement NPCs (Non Player Characters) as well.
	 *
	 * @param {object} entityDefinition
	 */
	constructor(entityDefinition = {}) {
		this.position = entityDefinition.position ?? new Vector();
		this.canvasPosition = new Vector(Math.floor(this.position.x * Tile.SIZE), Math.floor(this.position.y * Tile.SIZE));
		this.dimensions = entityDefinition.dimensions ?? new Vector();
		this.direction = entityDefinition.direction ?? Direction.Down;
		this.hitboxOffsets = new Hitbox(0,-0.5, -GameEntity.HITBOXWIDTH, -GameEntity.HITBOXHEIGHT);
		this.hitbox = new Hitbox(
			this.canvasPosition.x/16 + this.hitboxOffsets.position.x,
			this.canvasPosition.y/16 + this.hitboxOffsets.position.y,
			this.dimensions.x + this.hitboxOffsets.dimensions.x,
			this.dimensions.y + this.hitboxOffsets.dimensions.y,
		);
		this.stateMachine = null;
		this.currentFrame = 0;
		this.sprites = [];
	}

	/**
	 * At this time, stateMachine will be null for Pokemon.
	 */
	update(dt) {
		this.stateMachine?.update(dt);
		this.hitbox.set(
			this.canvasPosition.x/16 + this.hitboxOffsets.position.x,
			this.canvasPosition.y/16 + this.hitboxOffsets.position.y,
			this.dimensions.x + this.hitboxOffsets.dimensions.x,
			this.dimensions.y + this.hitboxOffsets.dimensions.y,
		);
	}

	render(x, y, offset = { x: 0, y: 0 }) {
		this.stateMachine?.render();
		this.sprites[this.currentFrame].render(x + offset.x, y + offset.y);

		if (DEBUG) {
			this.hitbox.render(context);
		}
	}

	changeState(state, params) {
		this.stateMachine?.change(state, params);
	}

	/**
	 * @param {Hitbox} hitbox
	 * @returns Whether this game object collided with an hitbox using AABB collision detection.
	 */
	didCollideWithEntity(hitbox) {
		return this.hitbox.didCollide(hitbox);
	}
}
