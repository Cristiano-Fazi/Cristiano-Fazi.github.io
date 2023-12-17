import Panel from '../../user-interface/elements/Panel.js';
import NPC from '../NPC.js';
import DialogueNode from '../../services/DialogueNode.js';
import DialogueChoiceNode from '../../services/DialogueChoiceNode.js';
import { stateStack } from '../../globals.js';
import Outfit from '../../services/Outfit.js';
import Direction from '../../enums/Direction.js';

export default class Vincent extends NPC {
    /**
	 * Vincent, offers fun conversation to the player. Lives in the
     * love house.
	 *
	 * @param {object} entityDefinition
	 * @param {Map} map
     * @param {Character} character
     * @param {Outfit} outfit
	 */
	constructor(entityDefinition = {}, map, character, outfit) {
		super(entityDefinition, map, character, outfit);

		this.start = null;
		this.start = this.createDialogueTree();//Get the start point and save it for later
		this.dialogue = this.createDialogueTree();

		this.walkPaths = [
			{direction: Direction.Down, steps: 14},
			{direction: Direction.Right, steps: 24},
            {direction: Direction.Up, steps: 14},
            {direction: Direction.Left, steps: 24},
		]
	}

	createDialogueTree(){
		this.start = new DialogueNode('Hey! My name\'s Vincent! You should check out my house!', Panel.DIALOGUE, 'end');

		return this.start
	}
}