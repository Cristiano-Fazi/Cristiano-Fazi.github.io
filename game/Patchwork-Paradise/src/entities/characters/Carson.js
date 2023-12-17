import Panel from '../../user-interface/elements/Panel.js';
import NPC from '../NPC.js';
import DialogueNode from '../../services/DialogueNode.js';
import DialogueChoiceNode from '../../services/DialogueChoiceNode.js';
import { stateStack } from '../../globals.js';
import Ruby from '../../objects/items/Ruby.js';
import Apple from '../../objects/items/Apple.js';
import NPCName from '../../enums/NPCName.js';

export default class Carson extends NPC {
	static RUBY_REWARD_AMOUNT = 1;

    /**
	 * Carson, sits at home, just watched Noah break his arm at the gym
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

		//Quest Flags
		this.questComplete = false;
		this.questGiven = false;
	}

	createDialogueTree(){
		this.start = new DialogueNode('Hey, i\'m Carson, this is my house', Panel.DIALOGUE, null);

		let node = this.start;
        let choice1option1 = new DialogueNode('Oh yeah, I live with Noah', Panel.DIALOGUE, null);
        let choice1option2 = new DialogueNode('You\'re a swifite too?!', Panel.DIALOGUE, null);
        let choice1option3 = new DialogueNode('Actually yes, I do have favour you could help me with.', Panel.DIALOGUE, null);
        let choice1option4 = new DialogueNode('Bye.', Panel.DIALOGUE, 'end');
        let choice1 = new DialogueChoiceNode(Panel.DIALOGUE, [
			{ text: 'I noticed there are two beds, who do you live with?', onSelect: () => { this.dialogue = choice1option1; stateStack.pop(); }},
			{ text: 'Is that Taylor Swift playing on your radio?', onSelect: () => { this.dialogue = choice1option2; stateStack.pop(); }},
            { text: 'Do you need help with anything around here?', onSelect: () => { 
				const quest = this.map.player.quests[NPCName.Carson]
				if(quest && quest.completed){
                    this.dialogue = questCompleted;
                }
                else if(quest && quest.given){
                    let hasApples = false;
                    for(let index = 0; index < this.map.player.inventory.length; index++){
                        if(this.map.player.inventory[index] != null && this.map.player.inventory[index].item instanceof Apple){
                            if(this.map.player.inventory[index].quantity >= 10){
                                for(let j = 0; j < 10; j++){
                                    this.map.player.removeItemFromInventory(index);
                                }
                                hasApples = true;
                            }
                        }
                    }

                    if(!hasApples){
                        this.dialogue = questGiven;
                    }
                    else{
                        this.map.player.quests[NPCName.Carson].completed = true;
                        this.dialogue = questCompletedDialogue;
                    }
                }
                else{
                    this.dialogue = choice1option3; 
                }
				stateStack.pop(); }},
            { text: 'Goodbye Carson!', onSelect: () => { this.dialogue = choice1option4; stateStack.pop()}},
		]);
        node.next = choice1;


		//'I noticed there are two beds, who do you live with?' Branch
		node = choice1option1;
        node.next = new DialogueNode('He\'s a pretty swell guy', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('But he\'s always working out, getting big. Unfortunately he doesn\'t know his limits...', Panel.DIALOGUE, null);
        node = node.next;
		node.next = new DialogueNode('The big oaf broke his arm while bench pressing and we had to to drag him to the hospital.', Panel.DIALOGUE, null);
        node = node.next;
		node.next = new DialogueNode('And when I say drag I MEAN drag, none of us could carry his big body.', Panel.DIALOGUE, null);
        node = node.next;

		let choice2option1 = new DialogueNode('Yeah he\'ll be fine, but he could definitely be better...', Panel.DIALOGUE, choice1);
		let choice2option2 = new DialogueNode('I guess it happens to the best of us...', Panel.DIALOGUE, choice1);
        let choice2option3 = new DialogueNode('You\'ll hear about him again soon i\'m sure.', Panel.DIALOGUE, choice1);
        node.next = new DialogueChoiceNode(Panel.DIALOGUE, [
			{ text: 'Oh no, is he ok?', onSelect: () => { this.dialogue = choice2option1; stateStack.pop(); }},
			{ text: 'That guy\'s really something...', onSelect: () => { this.dialogue = choice2option2; stateStack.pop(); }},
			{ text: 'That\'s enough about Noah', onSelect: () => { this.dialogue = choice2option3; stateStack.pop(); }},
		]);
		
		//'Is that Taylor Swift playing on your radio?' Branch
		node = choice1option2;
        node.next = new DialogueNode('I\'m so glad to find another fan around here!', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('Honestly I thought me and Noah were the only Swifties in this whole town!', Panel.DIALOGUE, null);
        node = node.next;
		node.next = new DialogueNode('You\'re always welcome to come and listen to Taylor at our place', Panel.DIALOGUE, null);
        node = node.next;

		let choice3option1 = new DialogueNode('I think I should turn up the music!', Panel.DIALOGUE, choice1);
		let choice3option2 = new DialogueNode('Oh 💀', Panel.DIALOGUE, choice1);
        node.next = new DialogueChoiceNode(Panel.DIALOGUE, [
			{ text: 'Yasss I\'m so happy to meet another Swifite too!', onSelect: () => { this.dialogue = choice3option1; stateStack.pop(); }},
			{ text: 'I.. don\'t like Taylor Swift...', onSelect: () => { this.dialogue = choice3option2; stateStack.pop(); }},
		]);

		//'Do you need help with anything around here?' Branch
		node = choice1option3;
		node.next = new DialogueNode('Noah broke his arm working out and he\'s at the hospital right now.', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('And I wanted to make a his favorite food for when he comes back.', Panel.DIALOGUE, null);
        node = node.next;
		node.next = new DialogueNode('You\'d actually never expect it but his favorite food is apple flavoured protein bars', Panel.DIALOGUE, null);
        node = node.next;
		node.next = new DialogueNode('Unfortunately, I don\'t have any apples and I\'m swamped with work at the moment.', Panel.DIALOGUE, null);
        node = node.next;
		node.next = new DialogueNode('So I can\'t go get them from Vik\'s shop... would you be able to get them for me?', Panel.DIALOGUE, null);
        node = node.next;
		node.next = new DialogueNode('I have an old Ruby I found a thrift store, I don\'t care to keep it.', Panel.DIALOGUE, null);
        node = node.next;
		node.next = new DialogueNode('So I\'d be willing to give it to you, And pay you back for the five apples of course.', Panel.DIALOGUE, null);
        node = node.next;
		
			//Choosing to accept the Quest or not
			let choice5option1 = new DialogueNode('Thank you, Noah will definitely appreciate this!', Panel.DIALOGUE, choice1);
			let choice5option2 = new DialogueNode('I understand, if ever you want to take me up on my offer, just ask again!', Panel.DIALOGUE, choice1);
			node.next = new DialogueChoiceNode(Panel.DIALOGUE, [
				{ text: 'Yep, I\'ll fetch those five apples for you', onSelect: () => { this.dialogue = choice5option1;  this.map.player.quests[NPCName.Carson] = {given: true, completed: false}; stateStack.pop(); }},
				{ text: 'Sorry, i\'m busy too, maybe another time.', onSelect: () => { this.dialogue = choice5option2; stateStack.pop(); }},
			]);

			//Quest Completed Branch
        	let questCompleted = new DialogueNode('Nope, I need anything at the moment.', Panel.DIALOGUE, null);
        	questCompleted.next = new DialogueNode('But thanks again, Noah\'s gonna love the apple protein bar!', Panel.DIALOGUE, choice1);

        	//Quest Given Branch
        	let questGiven = new DialogueNode('Other than fetching me those five apples I don\'t need anything!', Panel.DIALOGUE, null);
        	questGiven.next = new DialogueNode('Noah\'s gonna be in the hospital a while so there\'s no rush.', Panel.DIALOGUE, choice1);

			//Finishing Completed Dialogue
			let questCompletedDialogue = new DialogueNode('You\'ve got the apples! Thank you.', Panel.DIALOGUE, null);
			node = questCompletedDialogue;
			node.next = new DialogueNode('Hopefully the protein bars I make out of these will help him recover faster!', Panel.DIALOGUE, null);
			node = node.next;
			node.next = new DialogueNode('Here\'s your reward as promised, I hope find a nice place for this shiny rock', Panel.DIALOGUE, null);
			node = node.next;


			let finalQuestGoodbye = new DialogueNode('Thanks again, when Noah get\'s back i\'m sure he\'ll thank you!', Panel.DIALOGUE, 'end');
			let choice6option1 = new DialogueNode('You\'re very welcome!', Panel.DIALOGUE, finalQuestGoodbye);
			let choice6option2 = new DialogueNode('No no, take it off my hands, I don\'t have anywhere to keep it!', Panel.DIALOGUE, finalQuestGoodbye);
			let inventoryFullOption = new DialogueNode('Looks like your inventory is full, I\'ll pay what the Ruby is worth instead!', Panel.DIALOGUE, finalQuestGoodbye);
			node.next = new DialogueChoiceNode(Panel.DIALOGUE, [
				{ text: 'Thanks for the shiny rock', onSelect: () => { 
					if(this.map.player.isInventoryFull()){
						this.dialogue = inventoryFullOption;
					}
					else{
						this.dialogue = choice6option1; 
					}
					this.DispenseReward(); 
					stateStack.pop(); }},
				{ text: 'Keep the Ruby and money, I don\'t need it.', onSelect: () => { this.dialogue = choice6option2;  this.DispenseReward(); stateStack.pop(); }},
			]);

		return this.start;
	}

	DispenseReward(){
        if(!this.map.player.isInventoryFull()){
            for(let i = 0; i < Carson.RUBY_REWARD_AMOUNT; i++){
                this.map.player.addItemToInventory(new Ruby());
            }
			this.map.player.money += 25;
        }
        else{
            this.map.player.money += 75;
        }
    }
}