import State from "../../../lib/State.js";
import { context, CANVAS_WIDTH, CANVAS_HEIGHT, keys, stateStack, objectStore } from "../../globals.js";
import PauseScreen from "../../user-interface/elements/PauseScreen.js";

export default class PauseScreenState extends State {
	static SELECTION_WIDTH_BAR = 55
    static SELECTION_HEIGHT_BAR = 10
    static SELECTION_POSITION_X = 116
	static SELECTION_POSITION_TOP_X = 82
    static SELECTION_POSITION_TOP_Y = 125
	static SELECTION_OFFSET = 65
	static NUMBER_OF_CHOICES = 3
    static OPTIONS = {
        save: 0,
        back: 1,
		exit: 2,
    }

	constructor(currentMap) {
		super();
		this.pausescreenUI = new PauseScreen()
        this.player = currentMap.player;
		this.currentMap = currentMap;
		this.selectedIndex = 0
	}

	update(dt) {
		if(keys.d) {
			keys.d = false;
			this.selectedIndex = (this.selectedIndex + 1) % PauseScreenState.NUMBER_OF_CHOICES;
		}
		if(keys.a) {
			keys.a = false;
			this.selectedIndex = (this.selectedIndex - 1 + PauseScreenState.NUMBER_OF_CHOICES) % PauseScreenState.NUMBER_OF_CHOICES;
		}
		if(keys.Enter) {
			keys.Enter = false;
            switch (this.selectedIndex) {
                case PauseScreenState.OPTIONS.save:
                    this.saveGame();
                    stateStack.pop();
                    break;
                case PauseScreenState.OPTIONS.back:
                    stateStack.pop();
                    break;
				case PauseScreenState.OPTIONS.exit:
					stateStack.pop(); //pause screen state
					stateStack.pop(); //playstate
					break;
            }
		}
	} 
    saveGame() {
        localStorage.setItem("money", JSON.stringify(this.player.money));
        localStorage.setItem("inventory", JSON.stringify(this.player.inventory.map(item => {
            if(item && item.item)
                return {type: item.item.constructor.name, quantity: item.quantity}
            else 
                return null
        })));

		localStorage.setItem("barninventory", JSON.stringify(this.player.barnInventory.map(item => {
            if(item && item.item)
                return {type: item.item.constructor.name, quantity: item.quantity}
            else 
                return null
        })));

        localStorage.setItem("objects", JSON.stringify(objectStore.objects.map(obj => {
            return {
                type: obj.constructor.name, 
                posX: obj.position.x, 
                posY: obj.position.y, 
                offsetX: obj.offset.x,
                offsetY: obj.offset.y,
                currentFrame: obj.currentFrame}
        })))

		localStorage.setItem('farmlevel', JSON.stringify(this.player.currentFarmLevel))

		localStorage.setItem('quests', JSON.stringify(this.player.quests))
    }


	render() {
        this.currentMap.render()
		context.save();
		context.fillStyle = 'rgba(0, 0, 0, 0.6)';
		context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		context.restore();

		//SELECTION
		context.save();
		context.fillStyle = 'rgba(255, 255, 255, 1)';
		context.beginPath();
		context.rect(PauseScreenState.SELECTION_POSITION_TOP_X + (this.selectedIndex * PauseScreenState.SELECTION_OFFSET),PauseScreenState.SELECTION_POSITION_TOP_Y, PauseScreenState.SELECTION_WIDTH_BAR,PauseScreenState.SELECTION_HEIGHT_BAR)
		context.rect(PauseScreenState.SELECTION_POSITION_TOP_X +1 + (this.selectedIndex * PauseScreenState.SELECTION_OFFSET),PauseScreenState.SELECTION_POSITION_TOP_Y + 8, PauseScreenState.SELECTION_WIDTH_BAR - 2,PauseScreenState.SELECTION_HEIGHT_BAR + 20)
		context.rect(PauseScreenState.SELECTION_POSITION_TOP_X + (this.selectedIndex * PauseScreenState.SELECTION_OFFSET),PauseScreenState.SELECTION_POSITION_TOP_Y + 35, PauseScreenState.SELECTION_WIDTH_BAR,PauseScreenState.SELECTION_HEIGHT_BAR)
		context.fill();
		context.closePath();
		context.restore();
		this.pausescreenUI.render()
	}
}
