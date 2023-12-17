import Panel from '../../user-interface/elements/Panel.js';
import NPC from '../NPC.js';
import DialogueNode from '../../services/DialogueNode.js';
import DialogueChoiceNode from '../../services/DialogueChoiceNode.js';
import { stateStack } from '../../globals.js';

export default class Larry extends NPC {

    /**
	 * Larry, mayor of the town, provides players with advice on how to play the game
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
		this.start = new DialogueNode('I\'m Larry Mayor of our little town and it\'s a pleasure to meet our newest resident!', Panel.DIALOGUE, null);

		let node = this.start;
        let choice1option1 = new DialogueNode('Our fair town contains a bustling community and economy.', Panel.DIALOGUE, null);
        let choice1option2 = new DialogueNode('Farming is more straightforward than one might imagine.', Panel.DIALOGUE, null);
        let choice1option3 = new DialogueNode('Well for that you should visit out finest merchant Vik!', Panel.DIALOGUE, null);
        let choice1 = new DialogueChoiceNode(Panel.DIALOGUE, [
			{ text: 'How should I introduce myself in town? (Town Interaction Tutorial)', onSelect: () => { this.dialogue = choice1option1; stateStack.pop();}},
            { text: 'How do I get my farm started? (Farming Tutorial)', onSelect: () => { this.dialogue = choice1option2; stateStack.pop();}},
            { text: 'How do I buy and sell crops and seeds? (Shop Tutorial)', onSelect: () => { this.dialogue = choice1option3; stateStack.pop();}},
            { text: 'Goodbye', onSelect: () => { this.dialogue = goodbyeOptions[Math.floor(Math.random() * 5)]; stateStack.pop();}},
		]);
        node.next = choice1;

        //This list allows Larry's response to be randomized, so he doesn't say the same thing each time you say goodbye
        let goodbyeOptions = [
            new DialogueNode('May you find prosperity in your endeavors.', Panel.DIALOGUE, 'end'),
            new DialogueNode('Farewell, dear citizen.', Panel.DIALOGUE, 'end'),
            new DialogueNode('Until next time, stay inspired and resolute', Panel.DIALOGUE, 'end'),
            new DialogueNode('It was the utmost pleasure to speak with you.', Panel.DIALOGUE, 'end'),
            new DialogueNode('With heartfelt gratitude, I bid you adieu.', Panel.DIALOGUE, 'end'),
        ]
        
        //'How do I get started? (Gameplay Tutorial)' Branch
        node = choice1option1;
        node.next = new DialogueNode('Anticipate a wealth of interactions, diverse areas to explore, and countless jobs to complete', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('To interact with the town\'s folk press the noble \'e\' key on your keyboard.', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('Encounter a conversation? Use \'W\' and \'S\' to navigate, then choose your option with the venerable \'Enter\' key', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('Keep in mind, there are multiple paths to conversations. So explore the diverse routes available in our dynamic town!', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('To enter buildings, a simple act awaits: press \'E\' on doors. In our dynamic world, certain objects beckon your interaction.', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('When you\'re close, watch for an icon above them. Simply press \'E\' to unlock the mysteries or benefits they hold.', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('I trust this information proves valuable. Is there anything else you wish to inquire about?', Panel.DIALOGUE, choice1);

        //'How do I get my farm started? (Farming Tutorial)' Branch
        node = choice1option2;
        node.next = new DialogueNode('To embark on the farming journey, begin by hoeing the ground.', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('Seeds find their home only in tilled soil. Stand over a grass block and press the \'Spacebar\' to till the soil', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('To sow the seeds of growth, position yourself over the tilled soil and press the \'Spacebar\'', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('Now, exercise patience as you await the fruition of your efforts.', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('The growth of crops varies; each one follows its own unique timeline.', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('When your crop reaches full maturity, reap the rewards by pressing the \'Spacebar\' to harvest it.', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('Witness the bounty appear in your inventory, a testament to your nurturing touch in the fields.', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('Is there anything else on your mind? Your queries are always welcome in our town.', Panel.DIALOGUE, choice1);

        //'How do I buy and sell crops and seeds? (Shop Tutorial)' Branch
        node = choice1option3;
        node.next = new DialogueNode('It is from him that you can procure seeds.', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('To do this, simply request to buy seeds and a lustrous menu will appear before you', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('To navigate the menu seamlessly, employ the \'WASD\' keys.', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('Once the desired seed is highlighted, seal the deal by pressing \'Enter\'', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('But remember citizen! You have limited carrying capacity, if your inventory is full you cannot purchase more seeds.', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('Navigate the menu using \'W\' and \'S\'. Seal the deal with your dependable \'Enter\' key.', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('To sell items, consult Vik and ask to make a sale.', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('To enhance your living space, consult Vik about house upgrades.', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('He\'ll provide details on the cost, and if you decide to proceed, he\'ll handle the upgrade seamlessly.', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode(' No further action required on your part. Simply enjoy the improved comforts and greater farmable land', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('Is there any other inquiry you wish to bring forth? I am at your service, eager to assist in any way I can.', Panel.DIALOGUE, choice1);

		return this.start;
	}
}