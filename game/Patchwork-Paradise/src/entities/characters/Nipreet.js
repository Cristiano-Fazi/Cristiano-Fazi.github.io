import Panel from '../../user-interface/elements/Panel.js';
import NPC from '../NPC.js';
import DialogueNode from '../../services/DialogueNode.js';
import DialogueChoiceNode from '../../services/DialogueChoiceNode.js';
import { stateStack, sounds } from '../../globals.js';
import SoundName from '../../enums/SoundName.js';
import Ruby from '../../objects/items/Ruby.js';
import NPCName from '../../enums/NPCName.js';

export default class Carson extends NPC {
    /**
	 * Nipreet, working on a necklace for his girlfriend
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
		this.start = new DialogueNode('Yoooo, I\'m Nipreet, it\'s good to see you!', Panel.DIALOGUE, null);

		let node = this.start;
        let choice1option1 = new DialogueNode('Right now I\'m planning how I\'m going to make a necklace for Jordan!', Panel.DIALOGUE, null);
        let choice1option2 = new DialogueNode('There actually is something!', Panel.DIALOGUE, null);
        let choice1option3 = new DialogueNode('See you later big man.', Panel.DIALOGUE, 'end');
        let choice1 = new DialogueChoiceNode(Panel.DIALOGUE, [
			{ text: 'What are you up to Nipreet?', onSelect: () => { this.dialogue = choice1option1; stateStack.pop(); }},
            { text: 'Is there anything I can help you with?', onSelect: () => { 
				const quest = this.map.player.quests[NPCName.Nipreet];
				if(quest && quest.completed){
                    this.dialogue = questCompleted;
                }
                else if(quest && quest.given){
                    let hasRubys = false;
                    for(let index = 0; index < this.map.player.inventory.length; index++){
                        if(this.map.player.inventory[index] != null && this.map.player.inventory[index].item instanceof Ruby){
                            if(this.map.player.inventory[index].quantity >= 1){
                                for(let j = 0; j < 1; j++){
                                    this.map.player.removeItemFromInventory(index);
                                }
                                hasRubys = true;
                            }
                        }
                    }

                    if(!hasRubys){
                        this.dialogue = questGiven;
                    }
                    else{
                        this.map.player.quests[NPCName.Nipreet].completed = true;
                        this.dialogue = questCompletedDialogue;
                    }
                }
                else{
                    this.dialogue = choice1option2; 
                }
				stateStack.pop(); }},
            { text: 'See ya Nit!', onSelect: () => { this.dialogue = choice1option3; stateStack.pop()}},
		]);
        node.next = choice1;


		//'I noticed there are two beds, who do you live with?' Branch
		node = choice1option1;
        node.next = new DialogueNode('I want to make her something nice that she\'ll really love!', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('I\'m actually almost done... but it\'s missing something...', Panel.DIALOGUE, null);
        node = node.next;
		node.next = new DialogueNode('A big center piece... like a Ruby!', Panel.DIALOGUE, null);
        node = node.next;
		node.next = new DialogueNode('Yeah that\'s what this necklace needs!', Panel.DIALOGUE, choice1);
        node = node.next;


		//'Do you need help with anything around here?' Branch
		node = choice1option2;
		node.next = new DialogueNode('So I wanted to make a necklace for Jordan. It\'s gonna be a nice one I know she\'ll love it.', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('But the necklace still needs a main piece...', Panel.DIALOGUE, null);
        node = node.next;
		node.next = new DialogueNode('Something that would really make the necklace amazing.', Panel.DIALOGUE, null);
        node = node.next;
		node.next = new DialogueNode('And I figured exactly what I need to make this necklace amazing...', Panel.DIALOGUE, null);
        node = node.next;
		node.next = new DialogueNode('A real Ruby! Now that\'s not something you see very day!', Panel.DIALOGUE, null);
        node = node.next;
		node.next = new DialogueNode('Unfortunately, I can\'t find any... I guess that\'s why you don\'t see them everyday.', Panel.DIALOGUE, null);
        node = node.next;
		node.next = new DialogueNode('But I heard Carson has one he dose\'t care to keep, offer to help him and maybe he\'ll give it to you!', Panel.DIALOGUE, null);
        node = node.next;
		
			//Choosing to accept the Quest or not
			let choice5option1 = new DialogueNode('Yo thank you so much! You\'re the best!', Panel.DIALOGUE, choice1);
			let choice5option2 = new DialogueNode('Ok, but my offer still stands. Come back if you wanna take me up on it.', Panel.DIALOGUE, choice1);
			node.next = new DialogueChoiceNode(Panel.DIALOGUE, [
				{ text: 'Yeah I\'ll grab that Ruby for you.', onSelect: () => { this.dialogue = choice5option1;  this.map.player.quests[NPCName.Nipreet] = {given: true, completed: false}; stateStack.pop(); }},
				{ text: 'Sorry, I don\'t have time to go treasure hunting right now.', onSelect: () => { this.dialogue = choice5option2; stateStack.pop(); }},
			]);

			//Quest Completed Branch
        	let questCompleted = new DialogueNode('Nah you\'ve done more than enough', Panel.DIALOGUE, null);
        	questCompleted.next = new DialogueNode('Thanks again for the Ruby! Jordan will love it!', Panel.DIALOGUE, choice1);

        	//Quest Given Branch
        	let questGiven = new DialogueNode('Nope. That Ruby is all I need from you big man.', Panel.DIALOGUE, choice1);

			//Finishing Completed Dialogue
			let questCompletedDialogue = new DialogueNode('Yoooooo you got the Ruby!', Panel.DIALOGUE, null);
			node = questCompletedDialogue;
			node.next = new DialogueNode('I appreciate this big man. It\'s even shinier than I thought!', Panel.DIALOGUE, null);
			node = node.next;
			node.next = new DialogueNode('Jordan\'s gonna love this! Thanks again, and here\'s a little cash for your trouble.', Panel.DIALOGUE, null);
			node = node.next;

			let finalQuestGoodbye = new DialogueNode('Thanks again for helping me out. You\'re always welcome in our home!', Panel.DIALOGUE, 'end');
			let choice6option1 = new DialogueNode('It\'s the least I could do!', Panel.DIALOGUE, finalQuestGoodbye);
			let choice6option2 = new DialogueNode('No no, take it off my hands, I don\'t have anywhere to keep it!', Panel.DIALOGUE, finalQuestGoodbye);
			node.next = new DialogueChoiceNode(Panel.DIALOGUE, [
				{ text: 'Thank you Nipreet, I appreciate it.', onSelect: () => { this.dialogue = choice6option1; this.DispenseReward(); sounds.play(SoundName.Coin); stateStack.pop(); }},
				{ text: 'No really, the pleasure is all mine.', onSelect: () => { this.dialogue = choice6option2;  this.DispenseReward(); sounds.play(SoundName.Coin); stateStack.pop(); }},
			]);

		return this.start;
	}

	DispenseReward(){
        this.map.player.money += 200;
    }
}