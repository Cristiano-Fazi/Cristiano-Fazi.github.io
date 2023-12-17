import Panel from '../../user-interface/elements/Panel.js';
import NPC from '../NPC.js';
import DialogueNode from '../../services/DialogueNode.js';
import DialogueChoiceNode from '../../services/DialogueChoiceNode.js';
import { stateStack } from '../../globals.js';
import Strawberry from '../../objects/items/Strawberry.js';
import StarFlower from '../../objects/items/StarFlower.js';
import StrawberrySeed from '../../objects/seeds/StrawberrySeed.js';
import NPCName from '../../enums/NPCName.js';

export default class Riddhi extends NPC {
	static STRAWBERRY_SAMPLE_QUANTITY = 3;
	static STRAWBERRY_SEED_REWARD_AMOUNT = 15;

    /**
	 * Riddhi, farms strawberries and offers players a fetch quest
	 * where they get her 10 flowers in exchange for seeds.
	 *
	 * @param {object} entityDefinition
	 * @param {Map} map
     * @param {Character} character
     * @param {Outfit} outfit
	 */
	constructor(entityDefinition = {}, map, character, outfit) {
		super(entityDefinition, map, character, outfit);

		this.start = null;
		this.start = this.createDialogueTree();//Get thes start point and save it for later
		this.dialogue = this.createDialogueTree();

        //Quest Flags
        this.questComplete = false;
        this.questGiven = false;
	}

	createDialogueTree(){
		this.start = new DialogueNode('Hi. I\'m Riddhi', Panel.DIALOGUE, null);

		let node = this.start;
        let choice1option1 = new DialogueNode('Yes! This is my strawberry farm!', Panel.DIALOGUE, null);
		let choice1option2 = new DialogueNode('Well there are a few reasons!', Panel.DIALOGUE, null);
        let choice1option3 = new DialogueNode('I\'m glad you asked! There is something I need help with.', Panel.DIALOGUE, null);
		let choice1option4 = new DialogueNode('bye bye!', Panel.DIALOGUE, 'end');
        let choice1 = new DialogueChoiceNode(Panel.DIALOGUE, [
			{ text: 'Is this your strawberry farm?', onSelect: () => { this.dialogue = choice1option1; stateStack.pop(); }},
			{ text: 'Why do you live so far from town?', onSelect: () => { this.dialogue = choice1option2; stateStack.pop(); }},
			{ text: 'Is there anything I can do for you?', onSelect: () => { 
				const quest = this.map.player.quests[NPCName.Riddhi];
                if(quest && quest.completed){
                    this.dialogue = questCompleted;
                }
                else if(quest && quest.given){
                    let hasStarFlowers = false;
                    for(let index = 0; index < this.map.player.inventory.length; index++){
                        if(this.map.player.inventory[index] != null && this.map.player.inventory[index].item instanceof StarFlower){
                            if(this.map.player.inventory[index].quantity >= 10){
                                for(let j = 0; j < 10; j++){
                                    this.map.player.removeItemFromInventory(index);
                                }
                                hasStarFlowers = true;
                            }
                        }
                    }

                    if(!hasStarFlowers){
                        this.dialogue = questGiven;
                    }
                    else{
                        this.map.player.quests[NPCName.Riddhi].completed = true;
                        this.dialogue = questCompletedDialogue;
                    }
                }
                else{
                    this.dialogue = choice1option3; 
                }
                stateStack.pop(); }},
            { text: 'Goodbye Riddhi', onSelect: () => { this.dialogue = choice1option4; stateStack.pop() }},
		]);
        node.next = choice1;

		//'Is this your strawberry farm?' Branch
		node = choice1option1;
        node.next = new DialogueNode('Ever since I was a little girl, I\'ve always loved strawberries!', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('So when we moved here I felt it was only right to start me very own farm!', Panel.DIALOGUE, null);
        node = node.next;
		node.next = new DialogueNode('We\'re the ones who provide Vik the strawberry seeds he sells at the market actually!', Panel.DIALOGUE, null);
        node = node.next;
		node.next = new DialogueNode('And sometimes I give him a basket or two of free strawberries when he stops by.', Panel.DIALOGUE, null);
        node = node.next;
		node.next = new DialogueNode('But that\'s a secret so shhhhhhhhh', Panel.DIALOGUE, null);
        node = node.next;

		let choice2option1 = new DialogueNode('I\'m impressed you think I could run a farm like this all on my own!', Panel.DIALOGUE, null);
		let choice2option2 = new DialogueNode('Yes he does!', Panel.DIALOGUE, null);
        let choice2option3 = new DialogueNode('Alright! No Problem!', Panel.DIALOGUE, choice1);
        node.next = new DialogueChoiceNode(Panel.DIALOGUE, [
			{ text: 'Do you run this farm on your own?', onSelect: () => { this.dialogue = choice2option1; stateStack.pop(); }},
			{ text: 'Vik buys seeds from you?', onSelect: () => { this.dialogue = choice2option2; stateStack.pop(); }},
			{ text: 'That\'s all I wanted to know about the farm', onSelect: () => { this.dialogue = choice2option3; stateStack.pop(); }},
		]);

			//'Do you run this farm on your own?' Branch
			node = choice2option1;
			node.next = new DialogueNode('But no, Yano and I run it together!', Panel.DIALOGUE, null);
			node = node.next;
			node.next = new DialogueNode('We make a pretty good strawberry growing team!', Panel.DIALOGUE, null);
			node = node.next;

				let choice3option1 = new DialogueNode('I think he\'s inside our house, just to your right!', Panel.DIALOGUE, choice1);
				let choice3option2 = new DialogueNode('Me too! I\'d have a hard time running a farm like this alone!', Panel.DIALOGUE, choice1);
				node.next = new DialogueChoiceNode(Panel.DIALOGUE, [
					{ text: 'Where is he now?', onSelect: () => { this.dialogue = choice3option1; stateStack.pop(); }},
					{ text: 'Well I\'m glad to hear you have help!', onSelect: () => { this.dialogue = choice3option2; stateStack.pop(); }},
				]);

			//'Vik buys seeds from you?' Branch
			node = choice2option2;
			node.next = new DialogueNode('He buys most of his seeds from external suppliers, but when he can source something locally, he does.', Panel.DIALOGUE, null);
			node = node.next;
			node.next = new DialogueNode('Or at least that\'s what he says. I think he just comes for the baskets of strawberries I give him.', Panel.DIALOGUE, null);
			node = node.next;
			node.next = new DialogueNode('And I can\'t blame him! Our strawberries are the best in this whole region!', Panel.DIALOGUE, null);
			node = node.next;
			node.next = new DialogueNode('Would you like to try some? Though I have to warn you, you won\'t be able to go back to regular strawberries!', Panel.DIALOGUE, null);
			node = node.next;

				let choice4option1 = new DialogueNode('I know you\'ll love them!', Panel.DIALOGUE, choice1);
				let choice4option1Fail = new DialogueNode('You\'re hands seem full, come back later when you\'re carrying less stuff!', Panel.DIALOGUE, choice1)
				let choice4option2 = new DialogueNode('Ok, but you\'re seriously missing out!', Panel.DIALOGUE, choice1);
				node.next = new DialogueChoiceNode(Panel.DIALOGUE, [
					{ text: 'Yes I\'ll try some!', onSelect: () => {
						if(this.giveStrawberries()){ this.dialogue = choice4option1; }
						else{ this.dialogue = choice4option1Fail }
						stateStack.pop(); }},
					{ text: 'No thank you', onSelect: () => { this.dialogue = choice4option2; stateStack.pop(); }},
				]);
		
		//'Why do you live so far from town?' Branch
		node = choice1option2;
        node.next = new DialogueNode('The first being that we needed open ground to be able to make our farm.', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('There just wasn\'t really enough space in the heart of the city for that.', Panel.DIALOGUE, null);
        node = node.next;
		node.next = new DialogueNode('The second is that we prefer it out here! It\'s a lot calmer than the bustling city.', Panel.DIALOGUE, null);
        node = node.next;
		node.next = new DialogueNode('And the last reason is that we\'re not too far from the flower fields in the south!', Panel.DIALOGUE, null);
        node = node.next;
		node.next = new DialogueNode('I love strawberries but I love flowers too! I always love to go for walks through the flower fields!', Panel.DIALOGUE, null);
        node = node.next;
		node.next = new DialogueNode('I think we really got lucky with this house, even if buying groceries is a bit of a walk!', Panel.DIALOGUE, choice1);

		//'Is there anything I can do for you?' Branch
		node = choice1option3;
		node.next = new DialogueNode('I love flowers and wanted to decorate my house with some interesting and unique flowers', Panel.DIALOGUE, null);
        node = node.next;
		node.next = new DialogueNode('Vik recently got a shipment of new Star Flowers and they look so cute!', Panel.DIALOGUE, null);
        node = node.next;
		node.next = new DialogueNode('Would you be able to get me 10 of those Star Flowers so I can decorate my house?', Panel.DIALOGUE, null);
        node = node.next;
		node.next = new DialogueNode('I\'d be happy to compensate your efforts by giving you some of my world famous strawberry seeds!', Panel.DIALOGUE, null);
        node = node.next;

			//Choosing to accept the Quest or not
			let choice5option1 = new DialogueNode('Thank you so much! I can\'t wait to see what they look like in person!', Panel.DIALOGUE, choice1);
			let choice5option2 = new DialogueNode('I understand, if ever you want to take me up on my offer, just ask again!', Panel.DIALOGUE, choice1);
			node.next = new DialogueChoiceNode(Panel.DIALOGUE, [
				{ text: 'Yes, I can get those for you!', onSelect: () => { this.dialogue = choice5option1; this.map.player.quests[NPCName.Riddhi] = {given: true, completed: false}; stateStack.pop(); }},
				{ text: 'On second thought, I can\'t now.', onSelect: () => { this.dialogue = choice5option2; stateStack.pop(); }},
			]);

			//Quest Completed Branch
        	let questCompleted = new DialogueNode('No I have nothing else to ask you, the flowers were than enough!', Panel.DIALOGUE, null);
        	questCompleted.next = new DialogueNode('Thanks again for getting them! They look even cuter than I could have imagined! Thank you so so so much!', Panel.DIALOGUE, choice1);

        	//Quest Given Branch
        	let questGiven = new DialogueNode('Other than getting me those 10 StarFlowers there\'s nothing I need!', Panel.DIALOGUE, null);
        	questGiven.next = new DialogueNode('There\'s no time pressure, just get them to me whenever you can!', Panel.DIALOGUE, choice1);

			//Quest Completed Dialogue
			let questCompletedDialogue = new DialogueNode('Thank you so much I love them!', Panel.DIALOGUE, null);
			node = questCompletedDialogue;
			node.next = new DialogueNode('They are even cuter than I thought they\'d be! I can\'t wait to decorate my house with them!', Panel.DIALOGUE, null);
			node = node.next;
			node.next = new DialogueNode('I\'m going to show them to Yano, I know he\'s going to love them!', Panel.DIALOGUE, null);
			node = node.next;
			node.next = new DialogueNode('And here are the seeds as promised! Let me know how they taste!', Panel.DIALOGUE, null);
			node = node.next;

			let finalQuestGoodbye = new DialogueNode('Thank you so much again for the flowers, I didn\'t think I\'d ever get to see them myself!', Panel.DIALOGUE, 'end');
			let choice6option1 = new DialogueNode('Grow them properly now, these high quality strawberry seeds are not for novice farmers!', Panel.DIALOGUE, finalQuestGoodbye);
			let choice6option2 = new DialogueNode('You\'re very sweet, but really, I insist! You absolutely deserve them!', Panel.DIALOGUE, finalQuestGoodbye);
			let inventoryFullOption = new DialogueNode('Looks like your inventory is full, take this money and buy them from Vik when you get the chance!', Panel.DIALOGUE, finalQuestGoodbye);
			node.next = new DialogueChoiceNode(Panel.DIALOGUE, [
				{ text: 'Thank you for the seeds!', onSelect: () => { 
					if(this.map.player.isInventoryFull()){
						this.dialogue = inventoryFullOption;
					}
					else{
						this.dialogue = choice6option1; 
					}
					this.DispenseReward(); 
					stateStack.pop(); }},
				{ text: 'There\'s no need to compensate me! It was my pleasure!', onSelect: () => { this.dialogue = choice6option2;  this.DispenseReward(); stateStack.pop(); }},
			]);

		return this.start;
	}

	giveStrawberries(){
		if(!this.map.player.isInventoryFull()){
            for(let i = 0; i < Riddhi.STRAWBERRY_SAMPLE_QUANTITY; i++){
                this.map.player.addItemToInventory(new Strawberry());
            }
			return true;
        }
	}

	DispenseReward(){
        if(!this.map.player.isInventoryFull()){
            for(let i = 0; i < Riddhi.STRAWBERRY_SEED_REWARD_AMOUNT; i++){
                this.map.player.addItemToInventory(new StrawberrySeed());
            }
        }
        else{
            this.map.player.money += 150;
        }
    }
}