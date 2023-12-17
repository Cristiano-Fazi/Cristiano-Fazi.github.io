import GameObject from "../GameObject.js";
import { keys, stateStack } from "../../globals.js";
import DialogueChoiceState from "../../states/game/DialogueChoiceState.js";
import DialogueChoiceNode from "../../services/DialogueChoiceNode.js";
import Panel from "../../user-interface/elements/Panel.js";
import PlayState from "../../states/game/PlayState.js";
import DialogueNode from "../../services/DialogueNode.js";

export default class Door extends GameObject {

    /**
     * Door is an object players can press 'e' on to be given the
     * option to transition into a new map/interior cell
     * 
     * @param {*} dimensions 
     * @param {*} position 
     * @param {*} isOpenable 
     * @param {*} map 
     * @param {*} options 
     */
    constructor(dimensions, position, isOpenable, map = null, options = null) {
        super(dimensions, position);
        
        this.isOpenable = isOpenable;
        this.isCollidable = true;

        this.map = map;

        this.canShowOption = false;
        this.showingOption = false;
        this.isOpening = false;

        if(this.isOpenable){
            this.dialogueChoice = new DialogueChoiceNode(Panel.DIALOGUE, [
                { text: options[0], onSelect: () => { 
                    this.isOpening = true;
                    stateStack.pop();
                }},
                { text: options[1], onSelect: () => { 
                    this.isOpening = false;
                    stateStack.pop();
                }},
            ]);
        }
        else{
            this.dialogueChoice = new DialogueNode('This door is locked. You cannot enter.', Panel.DIALOGUE, null);
        }

    }

    update(dt){
        super.update(dt);

        if(this.wasCollided){
            //Play the door opening animation
        }
    }

    render(){
        super.render();
    }

    showOption(){
        if(keys.e || this.wasCollided){
            this.showingOption = true;

            if(stateStack.top() instanceof PlayState && !this.isOpening){
                stateStack.push(new DialogueChoiceState(this.dialogueChoice.options));
            }
        }
    }
}