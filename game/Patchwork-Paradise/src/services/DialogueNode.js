import Node from './Node.js';

export default class DialogueNode extends Node {
  constructor(text, placement, nextNode) {
    super(placement);
    this.text = text;
    this.next = nextNode;
  }
}