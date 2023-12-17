import GameObject from "../GameObject.js";
import DialogueState from "../../states/game/DialogueState.js";
import { images, keys, stateStack } from "../../globals.js";
import PlayState from "../../states/game/PlayState.js";
import Panel from "../../user-interface/elements/Panel.js";

export default class Inspectable extends GameObject{

    /**
     * An 'Inspectable' object is just a hitbox the player can press 'e'
     * on to show a message. Can be used for things ike locked doors that
     * the player might try to interact with but that don't have an implementation
     * 
     * @param {*} dimensions 
     * @param {*} position 
     * @param {*} message 
     */
    constructor(dimensions, position, message){
        super(dimensions, position);

        this.message = message;
    }

    showMessage(){
        if(keys.e){

            if(stateStack.top() instanceof PlayState){
                stateStack.push(new DialogueState(this.message, Panel.DIALOGUE));
            }
        }
    }
}