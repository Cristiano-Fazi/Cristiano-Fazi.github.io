import Panel from '../../user-interface/elements/Panel.js';
import NPC from '../NPC.js';
import DialogueNode from '../../services/DialogueNode.js';
import DialogueChoiceNode from '../../services/DialogueChoiceNode.js';
import { stateStack } from '../../globals.js';

export default class Breanna extends NPC {

    /**
	 * Breanna, confusing life, and even more confusing career
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
		this.start = new DialogueNode('Hey there! I\'m Breanna! Was there something you wanted to ask me?', Panel.DIALOGUE, null);

		let node = this.start;
        let choice1option1 = new DialogueNode('Why does everyone ask me that... ', Panel.DIALOGUE, null);
        let choice1option2 = new DialogueNode('Those? Oh I was signing the last of my divorce papers.', Panel.DIALOGUE, null);
        let choice1option3 = new DialogueNode('You know, that\'s a great question.', Panel.DIALOGUE, null);
        let choice1option4 = new DialogueNode('See you later!', Panel.DIALOGUE, 'end');
        let choice1 = new DialogueChoiceNode(Panel.DIALOGUE, [
			{ text: 'What do you do for work?', onSelect: () => { this.dialogue = choice1option1; stateStack.pop(); }},
			{ text: 'I saw you were signing some papers, what was that about?', onSelect: () => { this.dialogue = choice1option2; stateStack.pop(); }},
            { text: 'I hate to be rude, but why is everything green?', onSelect: () => { this.dialogue = choice1option3; stateStack.pop(); }},
            { text: 'I\'ll see you later', onSelect: () => { this.dialogue = choice1option4; stateStack.pop()}},
		]);
        node.next = choice1;

        //'What do you do for work?' Branch
        node = choice1option1
        node.next = new DialogueNode('Well, to be honest I\'m not working anywhere right now', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('I just quit my job as a Christian nightclub DJ to pursue a career in tech', Panel.DIALOGUE, choice1);
        node = node.next;
        let choice2option1 =  new DialogueNode('I was hoping you wouldn\'t notice...', Panel.DIALOGUE, null);
        let choice2option2 =  new DialogueNode('I appreciate the support!', Panel.DIALOGUE, null);
        let choice2 = new DialogueChoiceNode(Panel.DIALOGUE, [
			{ text: 'I\'m sorry... did you say Christian nightclub DJ?!', onSelect: () => { this.dialogue = choice2option1; stateStack.pop(); }},
			{ text: 'Oh... uhhhh well I hope you find a job soon.', onSelect: () => { this.dialogue = choice2option2; stateStack.pop(); }},
		]);
        node.next = choice2;

            //'I'm sorry... did you say Christian nightclub DJ?!' Branch
            node = choice2option1
            node.next = new DialogueNode('It\'s a long story, I used to work as a graphic designer for the church.', Panel.DIALOGUE, null);
            node = node.next;
            node.next = new DialogueNode('Then I got moved up to video editing.', Panel.DIALOGUE, null);
            node = node.next;
            node.next = new DialogueNode('Which was not exactly the corporate structure I would have expected.', Panel.DIALOGUE, null);
            node = node.next;
            node.next = new DialogueNode('And then I got promoted again to DJ. The priest said he saw my \"Inner Muse\"', Panel.DIALOGUE, null);
            node = node.next;
            node.next = new DialogueNode('Though, to this day, I still don\'t see it. Or I guess I should say I don\'t hear it?', Panel.DIALOGUE, choice1);

            //'Oh... uhhhh well I hope you find a job soon.' Branch
            node = choice2option2
            node.next = new DialogueNode('With the current job market I\'m gonna need all the help I can get.', Panel.DIALOGUE, choice1);

        //'I saw you were signing some papers, what was that about?' Branch
        node = choice1option2;
        node.next = new DialogueNode('I\'m divorcing my husband of 3 hours, and he took the 3 kids with him', Panel.DIALOGUE, null);
        node = node.next;
        let choice3option1 =  new DialogueNode('Yeah, it\'s a little confusing.', Panel.DIALOGUE, null);
        let choice3option2 =  new DialogueNode('I appreciate the support!', Panel.DIALOGUE, null);
        let choice3option3 =  new DialogueNode('It\'s a long story, for another time.', Panel.DIALOGUE, choice1);
        let choice3 = new DialogueChoiceNode(Panel.DIALOGUE, [
			{ text: 'Divorcing your husband of 3 hours?!', onSelect: () => { this.dialogue = choice3option1; stateStack.pop(); }},
			{ text: 'Losing custody of 3 kids?!', onSelect: () => { this.dialogue = choice3option2; stateStack.pop(); }},
            { text: 'Maybe I shouldn\'t have asked about that...', onSelect: () => { this.dialogue = choice3option3; stateStack.pop(); }},
		]);
        node.next = choice3;

            //'Divorcing your husband of 3 hours?!' Branch
            node = choice3option1
            node.next = new DialogueNode('Well actually, I didn\'t even know were married, he just kind of said it as a joke and everyone believed him', Panel.DIALOGUE, null);
            node = node.next;
            node.next = new DialogueNode('One minute, your standing in line waiting for pizza', Panel.DIALOGUE, null);
            node = node.next;
            node.next = new DialogueNode('The next, you\'re married to a man you don\'t know.', Panel.DIALOGUE, null);
            node = node.next;
            node.next = new DialogueNode('And the then divorced, life really flies. It\'s a crazy world out there.', Panel.DIALOGUE, null);
            node = node.next;
            node.next = new DialogueNode('I got the pizza though, so in the end not all bad.', Panel.DIALOGUE, null);
            node = node.next;

                //Responding to Breanna's outlandish claims Branch
                let choice4option1 =  new DialogueNode('Sometimes I think the same thing', Panel.DIALOGUE, choice1);
                let choice4option2 =  new DialogueNode('I appreciate any help I can get', Panel.DIALOGUE, choice1);
                let choice4 = new DialogueChoiceNode(Panel.DIALOGUE, [
                    { text: 'You\'re life sounds like it was made up...', onSelect: () => { this.dialogue = choice4option1; stateStack.pop(); }},
                    { text: 'Well, I hope things turn out alright.', onSelect: () => { this.dialogue = choice4option2; stateStack.pop(); }},
                ]);
                node.next = choice4;

            //'Losing custody of 3 kids?!' Branch
            node = choice3option2
            node.next = new DialogueNode('Oh don\'t worry I never met them.', Panel.DIALOGUE, null);
            node = node.next;
            node.next = new DialogueNode('To be honest I don\'t even know if they are real.', Panel.DIALOGUE, null);
            node = node.next;
            node.next = new DialogueNode('Someone just keeps telling me they are, though I\' nearly convinced they aren\'t real at all.', Panel.DIALOGUE, null);
            node = node.next;
            node.next = choice4;

        //'I hate to be rude, but why is everything green?' Branch
        node = choice1option3
        node.next = new DialogueNode('To be honest, it feels as if the person who designed this house wasn\'t sure how to design a home that matched... ', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('the personalities of my housemate Cindy and I.', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('And because of the immense pressure of some looming deadline and the lack of book sprites... ',  Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('he based the house off my distinct hair color.', Panel.DIALOGUE, null);
        node = node.next;
        node.next = new DialogueNode('No, that\'s probably not it.', Panel.DIALOGUE, null);
        node = node.next;

        let choice5option1 = new DialogueNode('Yeah you\'re right, that\'s not possible.', Panel.DIALOGUE, choice1)
        let choice5 = new DialogueChoiceNode(Panel.DIALOGUE, [
            { text: 'Nope, that\'s definitely not it.', onSelect: () => { this.dialogue = choice5option1; stateStack.pop(); }},
        ]);
        node.next = choice5;

		return this.start;
	}
}