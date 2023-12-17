import Menu from '../../user-interface/elements/Menu.js'
import Panel from '../../user-interface/elements/Panel.js'
import State from "../../../lib/State.js";

export default class DialogueChoiceState extends State {

    
    /**
     * A class that allows the user to chose from various options
     * 
     *@param {list} options A list of objects containing a 'text' field and 'OnSelect' arrow function
     */
    constructor(options){
        super();

        this.options = options;

        this.menu = new Menu(
            Panel.DIALOGUE.x,
            Panel.DIALOGUE.y,
            Panel.DIALOGUE.width,
            Panel.DIALOGUE.height,
            this.options
        )
    }

    update() {
		this.menu.update();
	}

    render(){
        this.menu.render();
    }
}