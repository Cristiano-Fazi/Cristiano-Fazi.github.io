import Panel from '../../user-interface/elements/Panel.js';
import NPC from '../NPC.js';
import DialogueNode from '../../services/DialogueNode.js';
import DialogueChoiceNode from '../../services/DialogueChoiceNode.js';
import { stateStack } from '../../globals.js';

export default class Kevin extends NPC {

    /**
	 * Kevin, chilling at home
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
	}

	createDialogueTree(){
		this.start = new DialogueNode('Gee... the brain rot has gotten to me!', Panel.DIALOGUE, null);

		let node = this.start;
		node.next = new DialogueNode('Doing game programming at 2:40 am really did a number on me.', Panel.DIALOGUE, null);
		node = node.next;

		node.next = new DialogueNode('Do you like farming tycoon type games?', Panel.DIALOGUE, null);
		node = node.next;

		let choice1option1 = new DialogueNode('Nice me too! You should give Patchword Paradise a try!', Panel.DIALOGUE, null);
		let choice1option2 = new DialogueNode('Thats to bad, I\'m sorry to hear that.', Panel.DIALOGUE, null);
		node.next = new DialogueChoiceNode(Panel.DIALOGUE, [
			{ text: 'Yes', onSelect: () => { this.dialogue = choice1option1; stateStack.pop() }},
			{ text: 'No', onSelect: () => { this.dialogue = choice1option2; stateStack.pop()}},
		])
		node = choice1option1;
		node.next = new DialogueNode('I should really get back to it. Nice talking to you!', Panel.DIALOGUE, 'end');
		node = node.next;
		node = choice1option2;
		node.next = new DialogueNode('I should really get back to it.', Panel.DIALOGUE, 'end');
		return this.start;
	}
}