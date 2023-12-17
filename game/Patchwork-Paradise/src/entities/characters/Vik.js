import Panel from '../../user-interface/elements/Panel.js';
import NPC from '../NPC.js';
import DialogueNode from '../../services/DialogueNode.js';
import DialogueChoiceNode from '../../services/DialogueChoiceNode.js';
import { stateStack } from '../../globals.js';
import CarrotSeed from "../../objects/seeds/CarrotSeed.js";
import StrawberrySeed from "../../objects/seeds/StrawberrySeed.js";
import CornSeed from "../../objects/seeds/CornSeed.js";
import PotatoSeed from "../../objects/seeds/PotatoSeed.js";
import LettuceSeed from "../../objects/seeds/LettuceSeed.js";
import BuyingState from '../../states/game/BuyingState.js';
import SellingState from '../../states/game/SellingState.js';
import WinScreenState from '../../states/game/WinScreenState.js';
import EggplantSeed from '../../objects/seeds/EggplantSeed.js';
import PumpkinSeed from '../../objects/seeds/PumpkinSeed.js';
import RaddishSeed from '../../objects/seeds/RaddishSeed.js';
import TomatoSeed from '../../objects/seeds/TomatoSeed.js';
import WatermelonSeed from '../../objects/seeds/WatermelonSeed.js';
import WheatSeed from '../../objects/seeds/WheatSeed.js';
import StarFlowerSeed from '../../objects/seeds/StarFlowerSeeds.js';

export default class Vik extends NPC {
	static BASE_FARM_COST = 100;
	static MAX_FARM_LEVEL = 3;

    /**
	 * Vik, sells seeds to the player, buys crops from the player, and allows
	 * the player to upgrade their farms. Players can also have a brief 
	 * conversation with him about his shop and career
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

        //These are the seeds Vik has for sale
        this.items = [
			new CarrotSeed(),
			new StrawberrySeed(),
			new CornSeed(),
			new PotatoSeed(),
			new LettuceSeed(),
			new EggplantSeed(), 
			new PumpkinSeed(), 
			new RaddishSeed(), 
			new TomatoSeed(),      
			new WatermelonSeed(), 
			new WheatSeed(), 
			null, 
			null, 
			null, 
			new StarFlowerSeed(), 
			null,
			null, 
			null, 
			null, 
			null, 
			null, 
			//TRINKETS      
			null, 
			null, 
			null, 
			null, 
			null, 
			null, 
			null, 
			null, 
			null
		];
	}

    update(dt){
        super.update(dt);

        //Vik's hitbox needs to be larger because he stands behind a desk
		this.hitbox.set(
			this.canvasPosition.x/16 + this.hitboxOffsets.position.x - 1,
			this.canvasPosition.y/16 + this.hitboxOffsets.position.y,
			this.dimensions.x + this.hitboxOffsets.dimensions.x + 2,
			this.dimensions.y + this.hitboxOffsets.dimensions.y + 1,
		);
    }

	createDialogueTree(){
		let node = null;//We will use this later as trusty place holder

		//Main decision tree, this is the dialogue 'home' to Vik's character. Essentially, the place where the placer can take different branching paths, though they all lead back here. 
		//This therefore serves as the only 'exit' point for the conversation.
		let decisionNode = new DialogueChoiceNode(Panel.DIALOGUE, [
			{ text: 'I would like to buy some stuff', onSelect: () => { this.dialogue = choice1option1; stateStack.pop(); stateStack.push(new BuyingState(this.map.player, this)) }},
			{ text: 'I would like to sell some stuff', onSelect: () => { this.dialogue = choice1option2; stateStack.pop(); stateStack.push(new SellingState(this.map.player, this)) }},
            { text: 'I want to upgrade my farm', onSelect: () => { 
				if(this.map.player.currentFarmLevel == 1){ this.dialogue = choice1option3level1;stateStack.pop(); }
				else if(this.map.player.currentFarmLevel == 2){ this.dialogue = choice1option3level2;stateStack.pop(); }
				else{ this.dialogue = maxUpgradeNode;stateStack.pop(); }
			}},
            { text: 'Tell me about yourself', onSelect: () => { this.dialogue = choice1option5; stateStack.pop()}},
            { text: 'I have to get going!', onSelect: () => { this.dialogue = choice1option6[Math.floor(Math.random() * 5)]; stateStack.pop()}},
		]);
		let returnToMenuDialogue = new DialogueNode('Was there anything else I could help you with?', Panel.DIALOGUE, decisionNode);

        let choice1option1 = new DialogueNode('I hope you found what you we\'re looking for!', Panel.DIALOGUE, 'end');
		let choice1option2 = new DialogueNode('A pleasure doing business with you!', Panel.DIALOGUE, 'end');
		
		//Asking the player if they are sure about the upgrade
		let choisingToBuyNodeReject = new DialogueNode("That's alright, maybe another time", Panel.DIALOGUE, decisionNode);
		let choice2option3 = new DialogueNode('Your farm has been upgraded!', Panel.DIALOGUE, returnToMenuDialogue);
		let choice2option4 = new DialogueNode('You don\'t have enough money to upgrade your farm!', Panel.DIALOGUE, returnToMenuDialogue);

		var maxUpgradeNode = new DialogueNode('You have the maximum level farm, you can\'t upgrade anymore!', Panel.DIALOGUE, returnToMenuDialogue);
		var chosingToBuyNode = new DialogueChoiceNode(Panel.DIALOGUE, [
				{ text: 'Yes I want to upgrade my farm', onSelect: () => {
					if(this.map.player.currentFarmLevel < Vik.MAX_FARM_LEVEL) {
						if(this.map.player.money >= (Vik.BASE_FARM_COST * Math.pow(1.5, this.map.player.currentFarmLevel))){
							this.map.player.money -= (Vik.BASE_FARM_COST * Math.pow(1.5, this.map.player.currentFarmLevel));
							this.map.player.didUpgrade = true;
							this.map.player.currentFarmLevel++;
							this.dialogue = choice2option3;
							if(this.map.player.currentFarmLevel == Vik.MAX_FARM_LEVEL) {
								stateStack.push(new WinScreenState())
							}
						}
						else{
							this.dialogue = choice2option4;
						}
					}
					else{
						this.dialogue = maxUpgradeNode;
					}
					if(this.map.player.currentFarmLevel != Vik.MAX_FARM_LEVEL) {
						stateStack.pop()
					}
				 }},
				{ text: 'Actually I don\'t want to upgrade anymore', onSelect: () => { 
					this.dialogue = choisingToBuyNodeReject; stateStack.pop(); 
				}},
			])
		var choice1option3level1 = new DialogueNode('Upgrading your farm will cost ' + (Vik.BASE_FARM_COST * Math.pow(1.5, 1)) + ". Do you still want to upgrade?", Panel.DIALOGUE, chosingToBuyNode);
		var choice1option3level2 = new DialogueNode('Upgrading your farm will cost ' + (Vik.BASE_FARM_COST * Math.pow(1.5, 2)) + ". Do you still want to upgrade?", Panel.DIALOGUE, chosingToBuyNode);

		let choice1option5 = new DialogueNode('What would you like to know?', Panel.DIALOGUE, null);

		//This list allows Vik's response to be randomized, so he doesn't say the same thing each time you say goodbye
        let choice1option6 = [
			new DialogueNode('Don\'t forget to finish your peer assessments!', Panel.DIALOGUE, 'end'),
			new DialogueNode("Remember to post your questions to the class forum!", Panel.DIALOGUE, 'end'),
			new DialogueNode('I\'ll be in class next lab period so feel free to drop by!', Panel.DIALOGUE, 'end'),
			new DialogueNode('Send me a message if you have any questions about the assignment!', Panel.DIALOGUE, 'end'),
			new DialogueNode('I should be done grading your last assignment later today, keep an eye out for that!', Panel.DIALOGUE, 'end'),
		]

		//Personal Conversation Dialogue Tree
		let personalConversationHomeNodeOption1 = new DialogueNode('I\'ve actually worked quite a few jobs', Panel.DIALOGUE, null);
		let personalConversationHomeNodeOption2 = new DialogueNode('I\'m glad you asked!', Panel.DIALOGUE, 'end');
		let personalConversationHomeNodeOption3 = new DialogueNode('Oh, I guess those wouldn\'t be common in other shops', Panel.DIALOGUE, null);
		let personalConversationHomeNodeOption4 = new DialogueNode('Feel free to ask again anytime!', Panel.DIALOGUE, decisionNode);
		let personalConversationHomeNode = new DialogueChoiceNode(Panel.DIALOGUE, [
			{ text: 'What jobs have you worked before this?', onSelect: () => { this.dialogue = personalConversationHomeNodeOption1; stateStack.pop(); }},
			{ text: 'What do you do outside of running this shop?', onSelect: () => { this.dialogue = personalConversationHomeNodeOption2; stateStack.pop(); }},
            { text: 'Why are there computers and desks in a crop shop?', onSelect: () => { this.dialogue = personalConversationHomeNodeOption3; stateStack.pop(); }},
            { text: 'That\'s all I wanted to ask for now!', onSelect: () => { this.dialogue = personalConversationHomeNodeOption4; stateStack.pop()}},
		]);
		choice1option5.next = personalConversationHomeNode;

		//'What jobs have you worked before this?' Branch
		node = personalConversationHomeNodeOption1;
		node.next = new DialogueNode('I worked at Radial Point doing web development. 💻',  Panel.DIALOGUE, null)
		node = node.next;
		node.next = new DialogueNode('I worked independently developing mobile apps for Bombardier. 📱', Panel.DIALOGUE, null);
		node = node.next;
		node.next = new DialogueNode('I\'ve even worked on flight simulators! ✈️', Panel.DIALOGUE, null);
		node = node.next;
		node.next = new DialogueNode('And I just started working here, at my very own crop shop! I hope you\'re impressed by my customer service skills. 🌽', Panel.DIALOGUE, null);
		node = node.next;
		node.next = new DialogueNode('But my favorite job is definitely teaching! Except for grading of course, that I could go without. 👨‍🏫', Panel.DIALOGUE, null);
		node = node.next;
		node.next = new DialogueNode('I\'ve worked a few others of course, but I wouldn\'t want to keep you here all day',  Panel.DIALOGUE, personalConversationHomeNode);

		//'What do you do outside of running this shop? Branch
		node = personalConversationHomeNodeOption2;
		node.next = new DialogueNode('While I do enjoy running this shop, it\'s only something I do on the side. ', Panel.DIALOGUE, null);
		node = node.next;
		node.next = new DialogueNode('My full time job is as a teacher at John Abbott College. I teach the Programming 4 and Game Programming courses.', Panel.DIALOGUE, null);
		node = node.next;

		let choice2option1 = new DialogueNode('The programming 4 class actually used to be called \'Data Structures and Algorithms\'. 🤖', Panel.DIALOGUE, null);
		let choice2option2 = new DialogueNode('The Game Programming course is a pretty heavy one, we cover lots of topics related to game development. 🎮', Panel.DIALOGUE, null);
		node.next = new DialogueChoiceNode(Panel.DIALOGUE, [
			{ text: 'What do you teach in the Programming IV class?', onSelect: () => { this.dialogue = choice2option1; stateStack.pop(); }},
			{ text: 'What do you teach in the Game Programming class?', onSelect: () => { this.dialogue = choice2option2; stateStack.pop(); }},
		]);
			//Programming 4 Branch
			node = choice2option1;
			node.next = new DialogueNode('We go over topics like Data types. For example, we cover stacks, queues and trees.', Panel.DIALOGUE, null);
			node = node.next;
			node.next = new DialogueNode('We discuss binary trees and how they can be searched through efficiently.', Panel.DIALOGUE, null);
			node = node.next;
			node.next = new DialogueNode('You wouldn\'t think it, but the topics we cover are super important to understanding game programming.', Panel.DIALOGUE, null);
			node = node.next;
			node.next = new DialogueNode('You should come sit in next time I\'m giving a lecture!', Panel.DIALOGUE, personalConversationHomeNode);

			//Game Programming Branch
			node = choice2option2;
			node.next = new DialogueNode('The course is divided into 6 or 7 sections, with each section covering a specific game', Panel.DIALOGUE, null);
			node = node.next;
			node.next = new DialogueNode('Each game attempts to cover just a few game programming concepts, like saving, physics, map development etc.', Panel.DIALOGUE, null);
			node = node.next;
			node.next = new DialogueNode('The course is a little challenging but I always love seeing the games the students make as their final projects.', Panel.DIALOGUE, null);
			node = node.next;
			node.next = new DialogueNode('You should come sit in next time I\'m giving a lecture!', Panel.DIALOGUE, personalConversationHomeNode);


		//'Why are there computers and desk in a crop shop?' Branch
		node = personalConversationHomeNodeOption3;
		node.next = new DialogueNode('Well since I\'m a teacher, my students like to work on their assignments here with me around.', Panel.DIALOGUE, null);
		node = node.next;
		node.next = new DialogueNode('It lets them ask both me and other students for help when they get stuck.', Panel.DIALOGUE, null);
		node = node.next;
		node.next = new DialogueNode('Though, to be honest, I think they come more for the lofi music and calm environment than anything else.', Panel.DIALOGUE, null);
		node = node.next;
		node.next = new DialogueNode('If you ever need a place to get some work done, feel free to pull out a chair and use a computer here',  Panel.DIALOGUE, personalConversationHomeNode);

		this.start = decisionNode;
		return this.start;
	}
}