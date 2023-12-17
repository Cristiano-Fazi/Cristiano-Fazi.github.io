import Panel from '../../user-interface/elements/Panel.js';
import NPC from '../NPC.js';
import DialogueNode from '../../services/DialogueNode.js';
import DialogueChoiceNode from '../../services/DialogueChoiceNode.js';
import { stateStack } from '../../globals.js';

export default class Cindy extends NPC {

    /**
	 * Cindy, working on her final game programming project inside Vik's Shop
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
		this.start = new DialogueNode('Hello, my name\'s Cindy', Panel.DIALOGUE, null);

		let node = this.start;
        let choice1option1 = new DialogueNode('They sell seeds mostly, you can buy basically any type of seeds you can think of here', Panel.DIALOGUE, null);
        let choice1option2 = new DialogueNode('The shopkeeper? Oh you mean Vik!', Panel.DIALOGUE, null);
        let choice1option3 = new DialogueNode('I\'m finishing my final project for my game programming class. We have to make a game!', Panel.DIALOGUE, null);
        let choice1option4 = new DialogueNode('Sounds good, Bye!', Panel.DIALOGUE, 'end');
        let choice1 = new DialogueChoiceNode(Panel.DIALOGUE, [
			{ text: 'What do they sell in this shop?', onSelect: () => { this.dialogue = choice1option1; stateStack.pop(); }},
			{ text: 'What is the shopkeeper like?', onSelect: () => { this.dialogue = choice1option2; stateStack.pop(); }},
            { text: 'What are you doing hanging around inside a store?', onSelect: () => { this.dialogue = choice1option3; stateStack.pop(); }},
            { text: 'I have to go, goodbye.', onSelect: () => { this.dialogue = choice1option4; stateStack.pop()}},
		]);
        node.next = choice1;

        //'What do they sell in this shop?' Branch
        node = choice1option1
        node.next = new DialogueNode('You can also sell any crops you\'ve grown.', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('Sometimes they sell other stuff too, but I don\'t think he has any trinkets for sale right now.', Panel.DIALOGUE, choice1);

        //'What is the shopkeeper like?' Branch
        node = choice1option2;
        node.next = new DialogueNode('Vik\'s super sweet! He only runs this shop on the side, he\'s actually a teacher full time.', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('I\'m taking his game programming class right now, he\'s a great teacher', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('I\'d definitely recommend taking one of his classes.', Panel.DIALOGUE, choice1)

        //'What are you doing hanging around inside a store?' Branch
        node = choice1option3
        let choice2option1 =  new DialogueNode('Have you ever heard of crossy-road? It\'s very similar.', Panel.DIALOGUE, null);
        let choice2option2 =  new DialogueNode('Normally it would be, but Vik has set up this area for his student\'s to work.', Panel.DIALOGUE, null);
        let choice2 = new DialogueChoiceNode(Panel.DIALOGUE, [
			{ text: 'That\'s really interesting, what\'s your game about?', onSelect: () => { this.dialogue = choice2option1; stateStack.pop(); }},
			{ text: 'A store seems like an odd place to work on a game?', onSelect: () => { this.dialogue = choice2option2; stateStack.pop(); }},
		]);
        node.next = choice2;

            //Asking about the Game Branch
            node = choice2option1
            node.next = new DialogueNode('You play as a character that is trying to walk across roads, but farm animals are passing by.', Panel.DIALOGUE, null);
            node = node.next;
            node.next = new DialogueNode('The road is procedurally generated, meaning it\'s infinity long.', Panel.DIALOGUE, null);
            node = node.next;
            node.next = new DialogueNode('And if you get hit by an animal, you lose the game and restart.', Panel.DIALOGUE, null);
            node = node.next;
            node.next = new DialogueNode('It\'s actually lots of fun, I\'d be happy to show you when I\'m done!', Panel.DIALOGUE, choice1);

            //Asking why she's working in a shop Branch
            node = choice2option2
            node.next = new DialogueNode('That way, if we get stuck we can ask him questions and he can help us work through bugs.', Panel.DIALOGUE, choice1);

		return this.start;
	}
}