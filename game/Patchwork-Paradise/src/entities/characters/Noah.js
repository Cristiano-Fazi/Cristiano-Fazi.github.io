import Panel from '../../user-interface/elements/Panel.js';
import NPC from '../NPC.js';
import DialogueNode from '../../services/DialogueNode.js';
import DialogueChoiceNode from '../../services/DialogueChoiceNode.js';
import { stateStack } from '../../globals.js';

export default class Noah extends NPC {
    /**
	 * Noah, broke his arm while working out, now hangs out
     * around the hospital
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
		this.start = new DialogueNode('Hiiiiii :3', Panel.DIALOGUE, null);

		let node = this.start;

		//Central Dialogue Fork #1
		let choice1option1 = new DialogueNode('😸', Panel.DIALOGUE, null);
		let choice1option2 = new DialogueNode('Oh uh... hello...', Panel.DIALOGUE, null);
        let choice1option3 = new DialogueNode('Nothing.. I said nothing...', Panel.DIALOGUE, null);
		node.next = new DialogueChoiceNode(Panel.DIALOGUE, [
			{ text: 'Hiiiiii ;3', onSelect: () => { this.dialogue = choice1option1; stateStack.pop() }},
            { text: 'Hello?', onSelect: () => { this.dialogue = choice1option2; stateStack.pop() }},
			{ text: 'Im sorry.. what did you just say?', onSelect: () => { this.dialogue = choice1option3; stateStack.pop()}},
		]);

		choice1option1.next = new DialogueNode('My name is Noah, its nice to meet you!', Panel.DIALOGUE, null);
        choice1option2.next = new DialogueNode('Did you want to ask me something?', Panel.DIALOGUE, null);//MAKE THIS A DECISION TREE LIKE THE DIAGRAM
        choice1option3.next = new DialogueNode('Goodbye.', Panel.DIALOGUE, 'end');
		choice1option3.next.next = new DialogueNode('Test', Panel.DIALOGUE, null);

		//Left Dialogue Fork #1
		node = choice1option1.next;
		let choice2option1 = new DialogueNode('Its a funny story! I broke my arm while trying to impress my friend at the gym', Panel.DIALOGUE, null);
		let choice2option2 = new DialogueNode('No actually Im not!', Panel.DIALOGUE, null);
        let choice2option3 = new DialogueNode('Byeeeeeee!', Panel.DIALOGUE, 'end');
		node.next = new DialogueChoiceNode(Panel.DIALOGUE, [
			{ text: 'Why are you at the hospital?', onSelect: () => { this.dialogue = choice2option1; stateStack.pop() }},
            { text: 'Are you waiting for someone in the hospital?', onSelect: () => { this.dialogue = choice2option2; stateStack.pop() }},
			{ text: 'I have to get going.', onSelect: () => { this.dialogue = choice2option3; stateStack.pop()}},
		]);

		choice2option1.next = new DialogueNode('Now that I think about it... Its not that funny...');
		choice2option2.next = choice2option1;


		//Left Dialogue Fork #2
		node = choice2option1.next;
		let choice3option1 = new DialogueNode('Oh! youre a doctor?', Panel.DIALOGUE, null);
		let choice3option2 = new DialogueNode('Thanks :3', Panel.DIALOGUE, null);
        let choice3option3 = new DialogueNode('I bet you couldnt lift 200 pounds!', Panel.DIALOGUE, null);
		node.next = new DialogueChoiceNode(Panel.DIALOGUE, [
			{ text: 'How can I help you?', onSelect: () => { this.dialogue = choice3option1; stateStack.pop() }},
            { text: 'I hope you get well soon!', onSelect: () => { this.dialogue = choice3option2; stateStack.pop() }},
			{ text: 'You never fail to impress...', onSelect: () => { this.dialogue = choice3option3; stateStack.pop()}},
		]);


		//Far Left Dialogue Fork #1
		let choice4option1 = new DialogueNode('I may be an idiot who broke his arm at the gym, but even Im not falling for that!', Panel.DIALOGUE, null);
		let choice4option2 = new DialogueNode('Thats what I thought...', Panel.DIALOGUE, null);
		choice3option1.next = new DialogueChoiceNode(Panel.DIALOGUE, [
			{ text: 'Yes! I am a doctor!', onSelect: () => { this.dialogue = choice4option1; stateStack.pop() }},
            { text: 'No... Im not', onSelect: () => { this.dialogue = choice4option2; stateStack.pop() }},
		]);
		choice4option1.next = new DialogueNode('It was nice speaking to you, but I think theyll be ready for me soon', Panel.DIALOGUE, null);
		choice4option2.next = choice4option1.next

		choice4option1.next.next = new DialogueNode('Byeeeeeee!', Panel.DIALOGUE, 'end');


		//Left Dialogue Fork #2 Continued
		choice3option2.next = choice4option1.next;

		let choice5option1 = choice3option2;
		let choice5option2 = new DialogueNode('I think Im gonna go now.', Panel.DIALOGUE, null);
		choice3option3.next = new DialogueChoiceNode(Panel.DIALOGUE, [
			{ text: 'Youre right! Get well soon!', onSelect: () => { this.dialogue = choice5option1; stateStack.pop() }},
            { text: 'Because Im not dumb enough to try...', onSelect: () => { this.dialogue = choice5option2; stateStack.pop() }},
		]);

		choice5option2.next = new DialogueNode('Bye.', Panel.DIALOGUE, 'end');
		

		//Right Dialogue Fork #1
		let choice6option1 = new DialogueNode('I broke my arm.', Panel.DIALOGUE, null);
		let choice6options2 = new DialogueNode('Nope.', Panel.DIALOGUE, null);
		let choice6options3 = new DialogueNode('Alright. Goodbye.', Panel.DIALOGUE, 'end');
		choice1option2.next.next = new DialogueChoiceNode(Panel.DIALOGUE, [
			{ text: 'Why are you at the hospital?', onSelect: () => { this.dialogue = choice6option1; stateStack.pop() }},
            { text: 'Are you waiting for someone in the hospital', onSelect: () => { this.dialogue = choice6options2; stateStack.pop() }},
			{ text: 'Youre really weird man.', onSelect: () => { this.dialogue = choice6options3; stateStack.pop()}},
		]);


		choice6options2.next =  new DialogueChoiceNode(Panel.DIALOGUE, [
			{ text: 'Why are you at the hospital?', onSelect: () => { this.dialogue = choice6option1; stateStack.pop() }},
		]);

		//Right Dialogue Fork #2
		let choice7option1 = new DialogueNode('Doing something super cool...', Panel.DIALOGUE, null);
		let choice7option2 = new DialogueNode('Because I just like waiting soooooooo much', Panel.DIALOGUE, null);
		let choice7option3 = new DialogueNode('Oh... uh.. thanks. I appreciate it', Panel.DIALOGUE, null);
		choice6option1.next = new DialogueChoiceNode(Panel.DIALOGUE, [
			{ text: 'How did you break your arm?', onSelect: () => { this.dialogue = choice7option1; stateStack.pop() }},
            { text: 'Why are you just waiting around?', onSelect: () => { this.dialogue = choice7option2; stateStack.pop() }},
			{ text: 'Get well soon!', onSelect: () => { this.dialogue = choice7option3; stateStack.pop()}},
		]);

		choice7option1.next = new DialogueChoiceNode(Panel.DIALOGUE, [
			{ text: 'Oh, get well soon!', onSelect: () => { this.dialogue = choice4option1.next.next; stateStack.pop() }},
            { text: 'I bet it was stupid wasnt it!', onSelect: () => { this.dialogue = choice5option2; stateStack.pop() }},
		]);

		choice7option2.next = new DialogueNode('Obviously Im waiting for the Doctor!', Panel.DIALOGUE, null);
		choice7option2.next.next = choice5option2;

		choice7option3.next = choice4option1.next.next;

		return this.start;
	}
}