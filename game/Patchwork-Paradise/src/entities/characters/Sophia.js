import Panel from '../../user-interface/elements/Panel.js';
import NPC from '../NPC.js';
import DialogueNode from '../../services/DialogueNode.js';
import DialogueChoiceNode from '../../services/DialogueChoiceNode.js';
import { stateStack } from '../../globals.js';
import Direction from '../../enums/Direction.js';
export default class Sophia extends NPC {

    /**
	 * 
	 *
	 * @param {object} entityDefinition
	 * @param {Map} map
     * @param {Character} character
     * @param {Outfit} outfit
	 */
	constructor(entityDefinition = {}, map, character, outfit) {
		super(entityDefinition, map, character, outfit);

		this.start = null;
		this.start = this.createDialogueTree(); //Get the start point and save it for later
		this.dialogue = this.createDialogueTree();

        this.walkPaths = [
			{direction: Direction.Down, steps: 4},
			{direction: Direction.Right, steps: 8},
            {direction: Direction.Left, steps: 6},
            {direction: Direction.Down, steps: 4},
            {direction: Direction.Left, steps: 9},
		]
	}

	createDialogueTree(){
		this.start = new DialogueNode('Just finished studying, I need a vacation...', Panel.DIALOGUE, null);

		let node = this.start;
		node.next = new DialogueNode('Bing Bong Bye', Panel.DIALOGUE, 'end');
		return this.start;
	}
}