import Panel from '../../user-interface/elements/Panel.js';
import NPC from '../NPC.js';
import DialogueNode from '../../services/DialogueNode.js';
import DialogueChoiceNode from '../../services/DialogueChoiceNode.js';
import { stateStack } from '../../globals.js';
import NPCName from '../../enums/NPCName.js';

export default class Cristiano extends NPC {

    /**
	 * Cristiano, inside his home. Talks about his home town
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
		this.start = new DialogueNode('Hi, I\'m Cristiano, It\'s good to see you!', Panel.DIALOGUE, null);

		let node = this.start;
        let choice1option1 = new DialogueNode('I guess, but not exactly,', Panel.DIALOGUE, null);
        let choice1option2 = new DialogueNode('It\'s actually pretty awesome here!', Panel.DIALOGUE, null);
        let choice1option3 = new DialogueNode('I don\'t have anything for you, but I think Riddhi needed something?', Panel.DIALOGUE, null);
        let choice1option4 = new DialogueNode('I don\'t have anything for you, but I think Riddhi needed something?', Panel.DIALOGUE, null);
        let choice1option5 = new DialogueNode('See you later!', Panel.DIALOGUE, 'end');
        let choice1 = new DialogueChoiceNode(Panel.DIALOGUE, [
			{ text: 'Is the strawberry farm yours?', onSelect: () => { this.dialogue = choice1option1; stateStack.pop(); }},
			{ text: 'I\'m new here, what\'s it like living here in Patchwork Paradise?', onSelect: () => { this.dialogue = choice1option2; stateStack.pop(); }},
            { text: 'Did you need help with anything?', onSelect: () => { 
                if(this.map.player.quests[NPCName.Riddhi] != undefined){
                    this.dialogue = choice1option3;
                }
                else{
                    this.dialogue = choice1option4; 
                }
                stateStack.pop(); }},
            { text: 'I\'ll be seeing you later', onSelect: () => { this.dialogue = choice1option5; stateStack.pop()}},
		]);
        node.next = choice1;

        //'Is the strawberry farm yours?' Branch
        node = choice1option1
        node.next = new DialogueNode('I actually run the farm with Riddhi. She\'s always loved loved strawberries.', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('So starting a farm like this was always a real dream of hers.', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('To be honest with you, I\'m no strawberry expert, she knows way more than I do!', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('I just do what she tells me, and the strawberries keep coming!', Panel.DIALOGUE, choice1);

        //'I'm new here, what's it like living here in Patchwork Paradise?' Branch
        node = choice1option2;
        node.next = new DialogueNode('The people are great, they\'re all very fun to spend time with!', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('And the land is amazing! It\'s rich in nutrients making it ideal for farming!', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('We were able to set up this thriving farm in no time!', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('Riddhi and I actually come from Frosty Fields where it\'s super cold and the land is not as fertile.', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('Building farms like this is impossible there.', Panel.DIALOGUE, null);

        let choice2option1 = new DialogueNode('I complain about it, but it\'s not a terrible place to live', Panel.DIALOGUE, null);
        let choice2option2 = new DialogueNode('That\'s a good question and the answers may not be what you expect!', Panel.DIALOGUE, null);
        let choice2option3 = new DialogueNode('I guess not everyone loves strawberries as much as we do!', Panel.DIALOGUE, choice1);
        let choice2 = new DialogueChoiceNode(Panel.DIALOGUE, [
			{ text: 'Frosty Fields? What\'s life like there?', onSelect: () => { this.dialogue = choice2option1; stateStack.pop(); }},
			{ text: 'Why\'d you chose to come to this town specifically?', onSelect: () => { this.dialogue = choice2option2; stateStack.pop(); }},
            { text: 'That\'s enough about strawberries...', onSelect: () => { this.dialogue = choice2option3; stateStack.pop(); }},
		]);
        node.next = choice2;

            //'Frosty Fields? What's life like there?' Branch
            node = choice2option1
            node.next = new DialogueNode('It\'s jus super cold most of the year', Panel.DIALOGUE, null);
            node = node.next;
            node.next = new DialogueNode('Makes it tough to grows things, unlike here where we can grow things year round!', Panel.DIALOGUE, null);
            node = node.next;
            node.next = new DialogueNode('Sometimes I miss it though, it\'s home after all.', Panel.DIALOGUE, null);
            node = node.next;
            node.next = new DialogueNode('I should probably visit sometime soon.', Panel.DIALOGUE, null);
            node = node.next;
            node.next = new DialogueNode('That\'s enough of me reminiscing! Was there anything else you wanted to ask?', Panel.DIALOGUE, choice1);

            //'Why'd you chose to come to this town specifically?' Branch
            node = choice2option2
            node.next = new DialogueNode('We were originally going to move to stardust springs!', Panel.DIALOGUE, null);
            node = node.next;
            node.next = new DialogueNode('But as we were making our decision, Kevin contacted me, he said we should come to Paradise.', Panel.DIALOGUE, null);
            node = node.next;
            node.next = new DialogueNode('He\'s quite the salesman! After our conversation he convinced me to come live here!', Panel.DIALOGUE, null);
            node = node.next;
            node.next = new DialogueNode('And I\'ve never looked back! Our town may be small but we take care of each other.', Panel.DIALOGUE, null);
            node = node.next;
            node.next = new DialogueNode('I\'m happy you\'re getting to join our little community!', Panel.DIALOGUE, null);
            node = node.next;
            node.next = new DialogueNode('That\'s enough of that, was there anything else you wanted to ask?', Panel.DIALOGUE, choice1);

        //'I don\'t have anything for you, but I think Riddhi needed something?'
        node = choice1option3
        let choice3option1 = new DialogueNode('Well that\'s great to hear! Good luck getting those flowers!', Panel.DIALOGUE, choice1);
        node.next = new DialogueChoiceNode(Panel.DIALOGUE, [
            { text: 'I\'ve spoken to her, I\'m getting the flowers soon.', onSelect: () => { this.dialogue = choice3option1; stateStack.pop(); }},
        ])

        node = choice1option4
        let choice4option1 = new DialogueNode('She mentioned something about flowers? She\'d appreciate the help I\'m sure!', Panel.DIALOGUE, choice1);
        node.next = new DialogueChoiceNode(Panel.DIALOGUE, [
            { text: 'I\'ll speak to her about that soon.', onSelect: () => { this.dialogue = choice4option1; stateStack.pop(); }},
        ])

		return this.start;
	}
}