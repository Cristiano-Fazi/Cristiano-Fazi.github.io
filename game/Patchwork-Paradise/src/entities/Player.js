import GameEntity from "./GameEntity.js";
import { images, stateStack } from "../globals.js";
import StateMachine from "../../lib/StateMachine.js";
import PlayerWalkingState from "../states/player/PlayerWalkingState.js";
import PlayerIdlingState from "../states/player/PlayerIdlingState.js";
import PlayerStateName from "../enums/PlayerStateName.js";
import Sprite from "../../lib/Sprite.js";
import Vector from "../../lib/Vector.js";
import { pickRandomElement } from "../../lib/RandomNumberHelpers.js";
import Character from "../enums/Character.js";
import Tile from "../services/Tile.js";
import PlayerHoeingState from "../states/player/PlayerHoeingState.js";
import Hitbox from "../../lib/Hitbox.js";
import PlayerPlantingState from "../states/player/PlayerPlantingState.js";
import PlayerHarvestingState from "../states/player/PlayerHarvestingState.js";
import TitleScreenState from "../states/game/TitleScreenState.js";
import WheatSeed from "../objects/seeds/WheatSeed.js";
import ItemFactory from "../services/Factories/ItemFactory.js";
import CornSeed from "../objects/seeds/CornSeed.js";
import Watermelon from "../objects/items/Watermelon.js";
import WatermelonSeed from "../objects/seeds/WatermelonSeed.js";
import StrawberrySeed from "../objects/seeds/StrawberrySeed.js";
import TomatoSeed from "../objects/seeds/TomatoSeed.js";
import PumpkinSeed from "../objects/seeds/PumpkinSeed.js";
import RaddishSeed from "../objects/seeds/RaddishSeed.js";

export default class Player extends GameEntity {
	/**
	 * The character that the player controls in the map.
	 * Has a party of Pokemon they can use to battle other Pokemon.
	 *
	 * @param {object} entityDefinition
	 * @param {object} outfit
	 */
	static INVENTORY_SIZE = 9
	static STARTING_OFFSET = new Vector(-(Player.WIDTH / 4), 0)
	static BARN_INVENTORY_SIZE = 27

	constructor(entityDefinition = {}, outfit, money) {
		super(entityDefinition);

		this.dimensions = new Vector(GameEntity.WIDTH, GameEntity.HEIGHT);
		this.positionOffset = new Vector(Player.STARTING_OFFSET.x, Player.STARTING_OFFSET.y)
		this.canvasPosition = new Vector(Math.floor(this.position.x * Tile.SIZE + Player.WIDTH / 4), Math.floor(this.position.y * Tile.SIZE));
		this.hitboxOffsets = new Hitbox(0,-0.5, -GameEntity.HITBOXWIDTH, -GameEntity.HITBOXHEIGHT);

		this.stateMachine = this.initializeStateMachine();
		this.sprites = this.initializeSprites();

		this.shirt = outfit.shirt;
		this.pants = outfit.pants;
		this.shoes = outfit.shoes;
		this.hair = outfit.hair;

		this.currentAnimation = this.stateMachine.currentState.animation[this.direction];
		this.camera = null;
		this.isTraveling = false;
		this.canHarvest = false;
		this.currentFarmLevel = Number(JSON.parse(localStorage.getItem('farmlevel')) ?? 1);
		this.didUpgrade = false;

		//Quest stuff
		this.quests = JSON.parse(localStorage.getItem("quests")) ?? {}

		//Inventory stuff
		this.money = money;
		this.inventory = this.loadInventory() ?? [{item: new WheatSeed(), quantity: 1}, {item: new CornSeed(), quantity: 1}, {item: new WatermelonSeed(), quantity: 1}, {item: new StrawberrySeed(), quantity: 1}, {item: new TomatoSeed(), quantity: 1}, {item: new PumpkinSeed(), quantity: 1}, {item: new RaddishSeed(), quantity: 1}, null, null];
		this.selectedInventoryItem = 0;
		this.barnInventory = this.loadBarnInventory() ?? [];

		//This array stores if the player has inspected certain items
		this.hasInspected = {
			kevinForgotComputerNote: false,
		}
	}

	loadInventory() {
		let items = JSON.parse(localStorage.getItem("inventory"))
		if(!items) {
			return
		}
		items = items.map(savedItem => {
			if(savedItem) {
				let inventoryItem = ItemFactory.CreateInstance(savedItem.type)
				return { item: inventoryItem, quantity: savedItem.quantity }
			}
			return null;
		})
		return items
	}

	loadBarnInventory() {
		let items = JSON.parse(localStorage.getItem("barninventory"))
		if(!items) {
			return null;
		}
		items = items.map(savedItem => {
			if(savedItem) {
				let inventoryItem = ItemFactory.CreateInstance(savedItem.type)
				return { item: inventoryItem, quantity: savedItem.quantity }
			}
			return null;
		})
		return items
	}

	changePos(newPosition) {
		this.position.x = newPosition.x
		this.position.y = newPosition.y
		this.canvasPosition.x = this.position.x * Tile.SIZE
		this.canvasPosition.y = this.position.y * Tile.SIZE
	}

	update(dt) {
		super.update(dt);
		this.currentAnimation.update(dt);
		this.currentFrame = this.currentAnimation.getCurrentFrame();
	}

	isInventoryFull() {
		let count = 0;
		for(let i = 0; i < Player.INVENTORY_SIZE; i++) {
			if (this.inventory[i]) {
				count++;
			}
		}

		return count == Player.INVENTORY_SIZE
	}

	addItemToInventory(item) {
		//Check for already existing instance of item in hotbar
		for(let i = 0; i < Player.INVENTORY_SIZE; i++) {
			if (this.inventory[i] && this.inventory[i].item instanceof item.constructor) {
				this.inventory[i].quantity++;
				return true;
			}
		}

		for(let i = 0; i < Player.INVENTORY_SIZE; i++) {
			if (!this.inventory[i]) {
				this.inventory[i] = {item: item, quantity: 1}
				return true;
			}
		}

		return false;
	}

	removeItemFromInventory(index) {
		this.inventory[index].quantity--;
		if(this.inventory[index].quantity == 0) {
			this.inventory[index] = null;
		}
	}

	addItemToBarnInventory(item) {
		for(let i = 0; i < Player.BARN_INVENTORY_SIZE; i++) {
			if (this.barnInventory[i] && this.barnInventory[i].item instanceof item.constructor) {
				this.barnInventory[i].quantity++;
				return true;
			}
		}
		for(let i = 0; i < Player.BARN_INVENTORY_SIZE; i++) {
			if (!this.barnInventory[i]) {
				this.barnInventory[i] = {item: item, quantity: 1}
				return true;
			}
		}
		return false;
	}

	removeItemFromBarnInventory(index) {
		this.barnInventory[index].quantity--;
		if(this.barnInventory[index].quantity == 0) {
			this.barnInventory[index] = null;
		}
	}

	render() {
		if(stateStack.top() instanceof TitleScreenState) {
			return
		}
		const x = Math.floor(this.canvasPosition.x);

		/**
		 * Offset the Y coordinate to provide a more "accurate" visual.
		 * To see the difference, remove the offset and bump into something
		 * either above or below the character and you'll see why this is here.
		 */
		const y = Math.floor(this.canvasPosition.y - this.dimensions.y / 2);

		super.render(x, y, this.positionOffset);//Render the player
		this.shirt[this.currentFrame].render(x, y, {x: 1, y: 1}, this.positionOffset);//Render their clothes
		this.pants?.[this.currentFrame]?.render(x, y, {x: 1, y: 1}, this.positionOffset);
		this.shoes?.[this.currentFrame]?.render(x, y, {x: 1, y: 1}, this.positionOffset);
	    this.hair?.[this.currentFrame]?.render(x, y, {x: 1, y: 1}, this.positionOffset);
	}

	initializeStateMachine() {
		const stateMachine = new StateMachine();

		stateMachine.add(PlayerStateName.Walking, new PlayerWalkingState(this));
		stateMachine.add(PlayerStateName.Hoeing, new PlayerHoeingState(this));
		stateMachine.add(PlayerStateName.Harvesting, new PlayerHarvestingState(this));
		stateMachine.add(PlayerStateName.Planting, new PlayerPlantingState(this));
		stateMachine.add(PlayerStateName.Idling, new PlayerIdlingState(this));

		stateMachine.change(PlayerStateName.Idling);

		return stateMachine;
	}

	initializeSprites() {
		const character = pickRandomElement([
			Character.Character1
		]);

		return Sprite.generateSpritesFromSpriteSheet(
			images.get(character),
			GameEntity.WIDTH,
			GameEntity.HEIGHT,
		);
	}

	intializeClothingSprites(clothing){
		return Sprite.generateSpritesFromSpriteSheet(
			images.get(clothing),
			GameEntity.WIDTH,
			GameEntity.HEIGHT,
		);
	}
}
