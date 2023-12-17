import GameObject from "../GameObject.js";
import DialogueState from "../../states/game/DialogueState.js";
import { images, keys, stateStack } from "../../globals.js";
import PlayState from "../../states/game/PlayState.js";
import Panel from "../../user-interface/elements/Panel.js";
import Inspectable from "../townObjects/Inspectable.js";
import BarnInventoryState from "../../states/game/BarnInventoryState.js";

export default class Barn extends Inspectable {

    /**
     * An 'Inspectable' object is just a hitbox the player can press 'e'
     * on to show a message. Can be used for things ike locked doors that
     * the player might try to interact with but that don't have an implementation
     * 
     * @param {*} dimensions 
     * @param {*} position 
     * @param {*} message 
     */
    constructor(dimensions, position, player){
        super(dimensions, position, "");
        this.player = player
    }
    showMessage(){
        if(keys.e){
            stateStack.push(new BarnInventoryState(this.player))
        }
    }
}