import Colour from "../../enums/Colour.js";
import Sprite from "../../../lib/Sprite.js";
import Tile from "../Tile.js";
import Layer from "../Layer.js";
import Crop from "../../objects/crops/Crop.js";
import {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	context,
	DEBUG,
	images,
} from "../../globals.js";
import Door from "../../objects/townObjects/Door.js"
import ObjectStore from "../ObjectStore.js";
import TileType from "../../enums/TileType.js";
import GameObject from "../../objects/GameObject.js";
import Vector from "../../../lib/Vector.js";
import Graphic from "../../../lib/Graphic.js";
import Interactable from "../../objects/Interactable.js";

export default class Map {
	/**
	 * The collection of layers, sprites,
	 * and characters that comprises the world.
	 *
	 * @param {object} mapDefinition JSON from Tiled map editor.
	 */

	static SIZE = 60;
	constructor(mapDefinition, tileset, objectStore = new ObjectStore()) {
		const sprites = Sprite.generateSpritesFromSpriteSheet(
			images.get(tileset),
			Tile.SIZE,
			Tile.SIZE,
		);
		this.mapDefinition = mapDefinition;
		this.bottomLayer = new Layer(mapDefinition.layers[Layer.BOTTOM], sprites);
		this.ledgeLayer = new Layer(mapDefinition.layers[Layer.LEDGE], sprites);
		this.collisionLayer = new Layer(mapDefinition.layers[Layer.COLLISION], sprites);
		this.furniture = [];
		mapDefinition.layers[Layer.FURNITURE].objects.forEach(object => {
			let newFurniture = new GameObject(new Vector(object.width, object.height), new Vector(object.x, object.y - 16));
			newFurniture.currentFrame = object.gid - 1;
			newFurniture.sprites = sprites;
			this.furniture.push(newFurniture);
		})
		this.topLayer = new Layer(mapDefinition.layers[Layer.TOP], sprites);
		this.NPCs = [];
		this.exits = [];
		this.objectStore = objectStore;
		this.justTalked = false;
		this.renderBottomLayer = true;
		this.renderLedgeLayer = true;
		this.renderCollisionLayer = true;
		this.renderTopLayer = true;
		this.farmingEnabled = false;
		this.size = Map.SIZE;
		this.inspectables = [];
		this.interactableSprite = new Interactable();
	}

	update(dt) {
		this.player.update(dt)

		//Make each NPC talk if they need to
		this.NPCs.forEach(npc => {

			if(this.player.hitbox.didCollide(npc.hitbox)){//Did the player collide with the NPC?
				npc.canTalk = true;
				npc.speak();
				this.interactableSprite.update(npc.position, new Vector(0, -20));
				this.interactableSprite.shouldRender = true;
			}
			else{
				npc.canTalk = false;
			}

			npc.update(dt);
		});

		this.exits.forEach(exit => {
			if(exit.didCollideWithEntity(this.player.hitbox)){//Did the player collide with the Door?
				if(exit instanceof Door){
					this.interactableSprite.update(exit.position, new Vector(0, 0));
					this.interactableSprite.shouldRender = true;
					exit.canShowOption = true;
					exit.showOption();
					if(exit.isOpening){
						this.player.isTraveling = true;
						exit.isOpening = false;
					}
				}
				else{
					this.player.isTraveling = true;
				}
			}
			exit.update();
		});

		this.inspectables.forEach(inspectable => {
			if(inspectable.didCollideWithEntity(this.player.hitbox)){
				inspectable.showMessage();
				this.interactableSprite.update(inspectable.position, new Vector(0, -10));
				this.interactableSprite.shouldRender = true;
			}
		})

		let didTouch = false;
		//console.log(this.objects)
		this.objectStore.objects.forEach(obj => {
			if(obj.didCollideWithEntity(this.player.hitbox) && (this.player.position.x == obj.position.x) && (this.player.position.y == obj.position.y)) {
				if(obj instanceof Crop) {
					if(obj.isHarvestable) {
						didTouch = true;
						this.player.canHarvest = true;
					}
					else {
						this.player.canHarvest = false;
					}			
				}
			}

			if(!didTouch){
				this.player.canHarvest = false;
			}

			if(obj instanceof Crop) {
				this.bottomLayer.setTile(obj.position.x, obj.position.y, TileType.TilledSoil);
			}

            obj.update(dt);
        });
		didTouch = false;

		this.camera.update()
	}

	render() {
		context.save();
		context.translate(-this.camera.position.x, -this.camera.position.y);

		if (this.renderBottomLayer) {
			this.bottomLayer.render();
		}
		if(this.renderLedgeLayer) {
			this.ledgeLayer.render();
		}

		this.objectStore.objects.forEach(obj => {
            obj.render();
        });

		this.inspectables.forEach(inspectable => {
			inspectable.render();
		})

		if (this.renderCollisionLayer) {
			this.collisionLayer.render();
		}

		this.furniture.forEach(obj => {
			obj.render()
		});

		if(this.NPCs.length > 0){
			this.NPCs.forEach(npc => {
				npc.render();
			});
		}

		// We will render this later
		if(this.exits.length > 0){
			this.exits.forEach(exit => {
				if(exit instanceof Door){
					exit.render();
				}
			});
		}

		this.player.render();

		if (this.renderTopLayer) {
			this.topLayer.render();
		}

		if(this.interactableSprite.shouldRender) {
			this.interactableSprite.render();
			this.interactableSprite.shouldRender = false;
		}
		if (DEBUG) {
			//Map.renderGrid();
		}

		context.restore();
	}

	renderViewport() {
		context.save();
		context.translate(-this.camera.position.x, -this.camera.position.y);
		this.player.render()
		context.restore();
	}

	/**
	 * Draws a grid of squares on the screen to help with debugging.
	 */
	static renderGrid() {
		context.save();
		context.strokeStyle = Colour.White;

		for (let y = 1; y < CANVAS_HEIGHT / Tile.SIZE; y++) {
			context.beginPath();
			context.moveTo(0, y * Tile.SIZE);
			context.lineTo(CANVAS_WIDTH, y * Tile.SIZE);
			context.closePath();
			context.stroke();

			for (let x = 1; x < CANVAS_WIDTH / Tile.SIZE; x++) {
				context.beginPath();
				context.moveTo(x * Tile.SIZE, 0);
				context.lineTo(x * Tile.SIZE, CANVAS_HEIGHT);
				context.closePath();
				context.stroke();
			}
		}

		context.restore();
	}

	static renderInstructions() {
		context.save();
		context.translate(0, Tile.SIZE * 9);
		context.fillStyle = 'rgba(0, 0, 0, 0.75)';
		context.fillRect(0, 0, Tile.SIZE * 5, Tile.SIZE * 2);
		context.font = `12px PowerRed`;
		context.textBaseline = 'alphabetic';
		context.fillStyle = 'white';
		[
			`[1] Toggle Bottom Layer`,
			`[2] Toggle Collision Layer`,
			`[3] Toggle Top Layer`,
		].forEach((text, index) => context.fillText(text, 15, index * 16 + 22));
		context.restore();
	}
}
