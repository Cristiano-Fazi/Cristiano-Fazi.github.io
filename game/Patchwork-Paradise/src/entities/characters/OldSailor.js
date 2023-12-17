import Panel from '../../user-interface/elements/Panel.js';
import NPC from '../NPC.js';
import DialogueNode from '../../services/DialogueNode.js';
import DialogueChoiceNode from '../../services/DialogueChoiceNode.js';
import { stateStack, sounds } from '../../globals.js';
import SoundName from '../../enums/SoundName.js';
import Wheat from '../../objects/items/Wheat.js';
import SeaShell from '../../objects/items/SeaShell.js';
import NPCName from '../../enums/NPCName.js';

export default class OldSailor extends NPC {
    static SEASHELL_REWARD_AMOUNT = 5;

    /**
	 * OldSailor, sits by the dock and offers the play wisdom, a story and a quest.
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
		this.start = new DialogueNode('Arrrr me heartie! I\'m Captain Barnacle O\'Sullivan, scourge of the seven seas! What be it ye wanted to ask ol\' Barnacle?', Panel.DIALOGUE, null);

		let node = this.start;
        let choice1option1 = new DialogueNode('Ah, me heartie, I find meself reminisci\' bout the golden days, ', Panel.DIALOGUE, null);
        let choice1option2 = new DialogueNode('Would ye truly lend yer services to an old salt like meself?', Panel.DIALOGUE, null);
        let choice1 = new DialogueChoiceNode(Panel.DIALOGUE, [
			{ text: 'What are you doing here by the ocean?', onSelect: () => { this.dialogue = choice1option1; stateStack.pop(); }},
			{ text: 'You seem to miss the sea, is there any way I could help fix that?', onSelect: () => { 
                const quest = this.map.player.quests[NPCName.OldSailor]
                if(quest && quest.completed){
                    this.dialogue = questCompleted;
                }
                else if(quest && quest.given){
                    let hasWheat = false;
                    for(let index = 0; index < this.map.player.inventory.length; index++){
                        if(this.map.player.inventory[index] != null && this.map.player.inventory[index].item instanceof Wheat){
                            if(this.map.player.inventory[index].quantity >= 10){
                                for(let j = 0; j < 10; j++){
                                    this.map.player.removeItemFromInventory(index);
                                }

                                hasWheat = true;
                            }
                        }
                    }

                    if(!hasWheat){
                        this.dialogue = questGiven;
                    }
                    else{
                        this.map.player.quests[NPCName.OldSailor].completed = true;
                        this.dialogue = questCompletedDialogue;
                    }
                }
                else{
                    this.dialogue = choice1option2; 
                }
                stateStack.pop(); }},
            { text: 'Do you have any maritime wisdom you can share?', onSelect: () => { this.dialogue = sailorWisdom[Math.floor(Math.random() * 5)]; stateStack.pop(); }},
            { text: 'Goodbye captain', onSelect: () => { this.dialogue = goodbyeOptions[Math.floor(Math.random() * 5)]; stateStack.pop() }},
		]);
        node.next = choice1;

        //This list allows Barnacle's response to be randomized, so he doesn't say the same thing each time you say goodbye
        let goodbyeOptions = [
			new DialogueNode('Fair winds and followin\' seas to ye, me matey', Panel.DIALOGUE, 'end'),
			new DialogueNode('May the tides be in your favor, landlubber', Panel.DIALOGUE, 'end'),
			new DialogueNode('Until the next chapter, may fortune smile upon ye, me hearty', Panel.DIALOGUE, 'end'),
			new DialogueNode('Set sail on your own course, me friend.', Panel.DIALOGUE, 'end'),
			new DialogueNode('Til\' our fates entwine once more, stay true to the compass of your heart', Panel.DIALOGUE, 'end'),
		]

        //Like with his goodbyes, we have a list of maritime wisom that can be randomly iterated through
        let sailorWisdom = [
			new DialogueNode('One thing the sea has taught me is that patience be the anchor that steadies a sailor in the stormiest of waters.', Panel.DIALOGUE, choice1),
			new DialogueNode('In the vast ocean of life, always be ready to adjust yer sails, for the winds of change are as unpredictable as the tide.', Panel.DIALOGUE, choice1),
			new DialogueNode('Say? a smooth sea never made a skilled sailor. Embrace the challenges, for they be the forge that shapes a mariner.', Panel.DIALOGUE, choice1),
			new DialogueNode('Ships find safety in the harbor, but that ain\'t their purpose. Embrace the open sea; that\'s where they thrive, as do you.', Panel.DIALOGUE, choice1),
			new DialogueNode('Here be a nugget of wisdom from the briny deep: Respect the sea, and it shall share its secrets with ye.', Panel.DIALOGUE, choice1),
		]

        //Quest Completed Branch
        let questCompleted = new DialogueNode('Ye\'ve been a true shipmate, and I can\'t thank ye enough.', Panel.DIALOGUE, null);
        questCompleted.next = new DialogueNode('With the provisions ye\'ve provided, I\'m set to set sail once more. Fair winds, and a thousand thanks.', Panel.DIALOGUE, choice1);

        //Quest Given Branch
        let questGiven = new DialogueNode('As I\'ve mentioned afore, fetch me ten wheat, and I\'ll have sustenance aplenty for a grand sailing escapade,', Panel.DIALOGUE, null);
        questGiven.next = new DialogueNode('reliving the glory days of the open sea.', Panel.DIALOGUE, choice1);

        //Giving The Quest Branch
        let choice2option1 = new DialogueNode('Thank ye, me friend. Here\'s what I\'ll be needin\' from ye.', Panel.DIALOGUE, null);
        let choice2option2 = new DialogueNode('I understand. Aye, I held a bit of hope that ye might lend a hand, but such is the way of the tides.', Panel.DIALOGUE, choice1);
        choice1option2.next = new DialogueChoiceNode(Panel.DIALOGUE, [
			{ text: 'Yes, what do you need me to do?', onSelect: () => { this.dialogue = choice2option1; this.map.player.quests[NPCName.OldSailor] = {given: true, completed: false}; stateStack.pop(); }},
			{ text: 'On second thought, I don\'t have time for this', onSelect: () => { this.dialogue = choice2option2; stateStack.pop(); }},
		]);

        node = choice2option1;
        node.next = new DialogueNode('Long have I yearned for one last sailing venture, yet my provisions fall short.', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('Me aging bones can\'t toil the fields for the wheat I need. Could ye spare a hand and fetch me ten wheat?', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('\'Tis all I require for a final grand odyssey upon the open sea.', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('This holds great weight in me heart. I\'ll be eagerly awaitin\' yer return, me friend.', Panel.DIALOGUE, 'end');

        //Quest Completed Dialogue
        let questCompletedDialogue = new DialogueNode('Many thanks for the wheat, young sailor.', Panel.DIALOGUE, null);
        node = questCompletedDialogue;
        node.next = new DialogueNode('Ye can\'t fathom how much this means to an old salt like meself.', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('Eager I am to set sail once more, chasing new adventures on the open seas.', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('May the winds favor ye, and here\'s a token of gratitude for yer troubles.', Panel.DIALOGUE, null);
        node = node.next;

        let finalQuestGoodbye = new DialogueNode('Farewell, landlubber, but mark me words—I\'m sure our paths will cross again soon.', Panel.DIALOGUE, 'end');
        let choice3option1 = new DialogueNode('Ahahaha, ye\'ve managed to get a laugh out of an old sailor—that ain\'t an easy feat, I tell ye!', Panel.DIALOGUE, finalQuestGoodbye);
        let choice3option2 = new DialogueNode('Hahahaha! Ye\'ve coaxed a hearty laugh from this weathered old sailor. That alone deserves a reward, me friend.', Panel.DIALOGUE, finalQuestGoodbye);
        let choice3option3 = new DialogueNode('The pleasure be mine, me friend.', Panel.DIALOGUE, finalQuestGoodbye);
        let choice3option4 = new DialogueNode('Nay, I insist. It would stain me reputation as a sailor if I didn\'t.', Panel.DIALOGUE, finalQuestGoodbye);
        node.next = new DialogueChoiceNode(Panel.DIALOGUE, [
			{ text: 'Thank ye for.. the.. might treasure! ye.. uhh.. ye scallewag!', onSelect: () => { this.dialogue = choice3option1; this.DispenseReward(); sounds.play(SoundName.Coin); stateStack.pop(); }},
			{ text: 'No need to reward a... fellow sailor of the grand.. um... seven seas!', onSelect: () => { this.dialogue = choice3option2;  this.DispenseReward(); sounds.play(SoundName.Coin); stateStack.pop(); }},
			{ text: 'Thank you for the money captain', onSelect: () => { this.dialogue = choice3option3;  this.DispenseReward(); sounds.play(SoundName.Coin); stateStack.pop(); }},
            { text: 'There\'s no need to pay me', onSelect: () => { this.dialogue = choice3option4; this.DispenseReward(); sounds.play(SoundName.Coin); stateStack.pop(); }},
		]);

        //'What are you doing here by the ocean?'
        node = choice1option1;
        node.next = new DialogueNode('when the sea whispered promises of untold adventures, and the horizon held the secrets of a thousand sunsets', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('Those were the days that turned a young dreamer into the weathered mariner standin\' before ye now', Panel.DIALOGUE, null);
        node = node.next;

        let choice4option1 = new DialogueNode('Ah, so ye be curious about me tale, eh?', Panel.DIALOGUE, null);
        let choice4option2 = new DialogueNode('My life be filled with interesting tales of me adventures on the sea.', Panel.DIALOGUE, choice1);
        node.next = new DialogueChoiceNode(Panel.DIALOGUE, [
			{ text: 'Tell me, how did you end up here in Patchwork Paradise?', onSelect: () => { this.dialogue = choice4option1; stateStack.pop(); }},
			{ text: 'Interesting...', onSelect: () => { this.dialogue = choice4option2; stateStack.pop(); }},
		]);

        node = choice4option1;
        node.next = new DialogueNode('I hail from Seabreeze Shores, the place where the salty winds whispered tales of the sea.', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('I, young Barnacle O\'Sullivan, an orphan, found kinship among grizzled sailors who saw the mariner in me.', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('Aye, me friend, we battled pirates and charted through wicked storms that tested the mettle of the bravest!', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('Our ship, the Mighty Mary, was the finest vessel ever to kiss the open sea!', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('But nothin\' lasts forever, me heartie. I\'m weathered and worn, the last soul standin\' from our crew.', Panel.DIALOGUE, null);
        node = node.next;

        let choice5option1 = new DialogueNode('Time me heartie, I was the youngest among em and look at me now!', Panel.DIALOGUE, null);
        let choice5option2 = new DialogueNode('Nay, the mighty Mary met her end in a ferocious storm.', Panel.DIALOGUE, null);
        node.next = new DialogueChoiceNode(Panel.DIALOGUE, [
			{ text: 'What happened to your crew?', onSelect: () => { this.dialogue = choice5option1; stateStack.pop(); }},
			{ text: 'What happened to your ship?', onSelect: () => { this.dialogue = choice5option2; stateStack.pop(); }},
		]);

            let choice5common = new DialogueNode('I still have a boat for meself, a sturdy vessel fit for the open seas.', Panel.DIALOGUE, null);
            choice5option1.next = new DialogueNode('I\'ve weathered more storms than the seas themselves, and these old bones tell tales deeper than the ocean\'s abyss', Panel.DIALOGUE, choice5common);
            choice5option2.next = new DialogueNode('The crew and I, we took it as a sign from the sea gods that we were growin\' too old for the rigors of the open waters.', Panel.DIALOGUE, choice5common);

            node = choice5common
            node.next =  new DialogueNode('Yet, if only I had enough provisions to fuel me journey, I\'d set sail once more and dance with the waves.', Panel.DIALOGUE, null);
            node = node.next;
            node.next = new DialogueNode('I\'ll cease me prattlin\' with these old sea tales, me friend.', Panel.DIALOGUE, null);
            node = node.next;
            node.next = new DialogueNode('But I\'m grateful for yer ear and patience. Thank ye kindly for listenin\' to this old sailor\'s yarns.', Panel.DIALOGUE, choice1);
        
		return this.start;
	}

    DispenseReward(){
        if(!this.map.player.isInventoryFull()){
            for(let i = 0; i < OldSailor.SEASHELL_REWARD_AMOUNT; i++){
                this.map.player.addItemToInventory(new SeaShell);
            }
            this.map.player.money += 50;
        }
        else{
            this.map.player.money += 150;
        }
    }
}