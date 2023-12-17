import Vector from "./Vector.js";
import { timer } from "../src/globals.js";

export default class Camera {
	/**
	 * The "camera" in video games boils down to a small section of the space the player can look at
	 * at any given time. The camera's position is used to translate the canvas based on where the
	 * subject currently is in the scene.
	 *
	 * @param {Object} subject The camera will follow the subject. Subject must have a position vector.
	 * @param {Vector} scene The entire space the camera can potentially look at.
	 * @param {Vector} viewport How much of the scene the player can look at at any one time.
	 */
	constructor(subject, scene, viewport) {
		this.subject = subject;
		this.scene = scene;
		this.viewport = viewport;
		this.position = new Vector(0, 0);
		this.lagFactor = 0.025
	}

	update() {
		this.targetPosition = this.getNewPosition();
    
		// Interpolate the rendering position, not the actual camera position
		const renderPositionX = this.position.x + (this.targetPosition.x - this.position.x) * this.lagFactor;
		const renderPositionY = this.position.y + (this.targetPosition.y - this.position.y) * this.lagFactor;
	
		// Check the distance between the rendering position and the target position
		const distanceX = Math.abs(renderPositionX - this.targetPosition.x);
		const distanceY = Math.abs(renderPositionY - this.targetPosition.y);
	
		// Only interpolate if the rendering position is above a certain threshold
		if (false && distanceX > 0.15 || false && distanceY > 0.15) {
			// Set the actual camera position
			this.position.x = renderPositionX;
			this.position.y = renderPositionY;
		} else {
			// If close enough, set the position directly to the target position
			this.position.x = this.targetPosition.x;
			this.position.y = this.targetPosition.y;
		}
	}

	/**
	 * Clamp movement of the camera's X between 0 and the edge of the scene,
	 * setting it to half the screen to the left of the subject so they are
	 * always in the center of the viewport.
	 */
	getNewPosition() {
		const newPosition = new Vector(0, 0);
		const maxPositionX = Math.min(
			(this.scene.x - this.viewport.x),
			this.subject.canvasPosition.x - (this.viewport.x / 2 - (this.subject.dimensions.x / 2))
		);
		newPosition.x = Math.max(0, Math.floor(maxPositionX));


		const maxPositionY = Math.max(
			0,
			this.subject.canvasPosition.y - (this.viewport.y / 2 - (this.subject.dimensions.y / 2))
		);
		newPosition.y = Math.min((this.scene.y - this.viewport.y), Math.floor(maxPositionY));

		return newPosition;
	}
}