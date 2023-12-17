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
		this.start = new DialogueNode('Hello my name is Kevin!', Panel.DIALOGUE, null);

		let node = this.start;
		node.next = new DialogueNode('You look new. Can I help you learn a little bit about the game?', Panel.DIALOGUE, null);

		node = node.next;
		let choice1option1 = new DialogueNode('To move around press the W, A, S and D keys!', Panel.DIALOGUE, null);
		let choice1option2 = new DialogueNode('Goodbye!', Panel.DIALOGUE, 'end');
		node.next = new DialogueChoiceNode(Panel.DIALOGUE, [
			{ text: 'Yes', onSelect: () => { this.dialogue = choice1option1; stateStack.pop() }},
			{ text: 'No', onSelect: () => { this.dialogue = choice1option2; stateStack.pop()}},
		])
		choice1option1.next = new DialogueNode('Press the E key to interact with people and objects!', Panel.DIALOGUE, null);

		node = choice1option1.next;
		node.next = new DialogueNode('Do you know where to buy seeds?', Panel.DIALOGUE, null);

		node = node.next;
		let choice2option1 = new DialogueNode('I guess you didnt need my help after all!', Panel.DIALOGUE, null)
		let choice2option2 = new DialogueNode('Its on your left!', Panel.DIALOGUE, null);
		node.next = new DialogueChoiceNode(Panel.DIALOGUE, [
			{ text: 'At the market to your left!', onSelect: () => { this.dialogue = choice2option1; stateStack.pop()} },
			{ text: 'I have no idea...', onSelect: () => { this.dialogue = choice2option2; stateStack.pop()}},
		]);

		choice2option1.next = new DialogueNode('Goodbye!', Panel.DIALOGUE, 'end');
		choice2option2.next = new DialogueNode('Goodbye!', Panel.DIALOGUE, 'end');

		return this.start;
	}
}