import Node from './Node.js';

export default class DialogueChoiceNode extends Node {
    /**
     * A node that provides the player a choice of responses that each have their own callback
     * @param {object} placement The placement of the dialogue panel
     * @param {object} options An array containing objects that have an onSelect function that 
     *                         is called when the user selects one of the options
     */
    constructor(placement, options) {
      super(placement);
      this.options = options;
    }   
}