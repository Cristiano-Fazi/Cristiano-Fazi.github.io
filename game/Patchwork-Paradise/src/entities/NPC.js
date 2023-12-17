import GameEntity from "./GameEntity.js";
import { images, keys, stateStack } from "../globals.js";
import StateMachine from "../../lib/StateMachine.js";
import Sprite from "../../lib/Sprite.js";
import Vector from "../../lib/Vector.js";
import Map from "../services/maps/Map.js";
import NPCStateName from '../enums/NPCStateName.js';
import NPCIdlingState from "../states/npc/NPCIdlingState.js";
import DialogueNode from '../services/DialogueNode.js';
import DialogueChoiceNode from '../services/DialogueChoiceNode.js';
import DialogueState from '../states/game/DialogueState.js';
import DialogueChoiceState from '../states/game/DialogueChoiceState.js';
import Panel from '../user-interface/elements/Panel.js';
import NPCWalkingState from "../states/npc/NPCWalkingState.js";

export default class NPC extends GameEntity{
	static STARTING_OFFSET = new Vector(-(NPC.WIDTH / 4), 0)
    /**
	 * NPC character the player can interact with
	 *
	 * @param {object} entityDefinition
	 * @param {Map} map
	 */
	constructor(entityDefinition = {}, map, character, outfit) {
		super(entityDefinition);

		this.map = map;
		this.dimensions = new Vector(GameEntity.WIDTH, GameEntity.HEIGHT);
		this.positionOffset = new Vector(NPC.STARTING_OFFSET.x, NPC.STARTING_OFFSET.y)

		this.stateMachine = this.initializeStateMachine();
		this.sprites = this.initializeSprites(character);
		this.currentAnimation = this.stateMachine.currentState.animation[this.direction];
		this.shirt = outfit.shirt;
		this.pants = outfit.pants;
		this.shoes = outfit.shoes;
		this.hair = outfit.hair;
		this.canTalk = false;
		this.isTalking = false;
		this.justTalked = false;
		this.currentMessage = 0;

		this.walkPaths = [];
		this.currentWalkingPath = 0;
		this.isDonePath = false;
	}

    update(dt) {
		super.update(dt);
		if(dt) {
			this.currentAnimation.update(dt);
		}

		this.currentFrame = this.currentAnimation.getCurrentFrame();

		if(this.isTalking && !(stateStack.top() instanceof DialogueState) && !(stateStack.top() instanceof DialogueChoiceState)){
			if(this.dialogue.next == null){
				this.isTalking = false;
				this.dialogue = this.start;
			}
		}
	}

	render() {
		const x = Math.floor(this.canvasPosition.x);

		/**
		 * Offset the Y coordinate to provide a more "accurate" visual.
		 * To see the difference, remove the offset and bump into something
		 * either above or below the character and you'll see why this is here.
		 */
		const y = Math.floor(this.canvasPosition.y - this.dimensions.y / 2);
		//console.log(this.currentAnimation)

		super.render(x, y, this.positionOffset);//Render the character

		this.shirt[this.currentFrame].render(x, y, {x: 1, y: 1}, this.positionOffset);//Render their clothes
		this.pants?.[this.currentFrame]?.render(x, y, {x: 1, y: 1}, this.positionOffset);
		this.shoes?.[this.currentFrame]?.render(x, y, {x: 1, y: 1}, this.positionOffset);
	    this.hair?.[this.currentFrame]?.render(x, y, {x: 1, y: 1}, this.positionOffset);
	}

    initializeStateMachine() {
		const stateMachine = new StateMachine();

		stateMachine.add(NPCStateName.Walking, new NPCWalkingState(this));
		stateMachine.add(NPCStateName.Idling, new NPCIdlingState(this));

		return stateMachine;
	}

	/**
	 * Normally, you wouldn't generate a random character sprite every time
	 * you made a new Player object. This is probably something the player
	 * would decide at the beginning of the game or in a settings menu.
	 */
	initializeSprites(character) {
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

	speak(){
		if(keys.e || this.isTalking) {
			this.isTalking = true;

			if(this.dialogue.next != null || this.dialogue.options != undefined){
				if(this.dialogue instanceof DialogueNode && !(stateStack.top() instanceof DialogueState)){
					stateStack.push(new DialogueState(this.dialogue.text, Panel.DIALOGUE));
					this.dialogue = this.dialogue.next;
				}
				else if(this.dialogue instanceof DialogueChoiceNode && !(stateStack.top() instanceof DialogueChoiceState)){
					stateStack.push(new DialogueChoiceState(this.dialogue.options));
				}
				else {
					stateStack.push(new DialogueState("I'm having an issue with my dialogue, please talk to me later"));
				}
			}
		}
	}
}