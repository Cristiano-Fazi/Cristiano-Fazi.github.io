import State from "../../../lib/State.js";
import { context, CANVAS_WIDTH, CANVAS_HEIGHT, keys, MAP_DEFINITIONS, stateStack} from "../../globals.js";
import Player from "../../entities/Player.js";
import Outfit from "../../services/Outfit.js";
import Clothes from "../../enums/Clothes.js";
import ClothesColor from "../../enums/ClothesColor.js";
import Hair from "../../enums/Hair.js";
import HairColor from "../../enums/HairColor.js";
import FarmMap from "../../services/maps/FarmMap.js";
import WinScreen from "../../user-interface/elements/WinScreen.js";

export default class WinScreenState extends State {
	static SELECTION_WIDTH_BAR = 55
    static SELECTION_HEIGHT_BAR = 10
    static SELECTION_POSITION_X = 116
	static SELECTION_POSITION_TOP_X = 116
    static SELECTION_POSITION_TOP_Y = 125
	static SELECTION_OFFSET = 65
	static NUMBER_OF_CHOICES = 2
	static OPTIONS = {
        start: 0,
        newsave: 1,
    }

	constructor() {
		super();
		this.winScreenUI = new WinScreen()
		this.selectedIndex = 0
		this.player = new Player({  position: FarmMap.WIN_SPAWN_POSITION }, new Outfit(Clothes.Basic,  ClothesColor.Red, Clothes.Pants, ClothesColor.Black, Clothes.Shoes, ClothesColor.Black, Hair.Gentleman, HairColor.Brown), 0);
		this.currentMap = new FarmMap(MAP_DEFINITIONS.BigFarm, this.player)
	}

	update(dt) {
		this.currentMap.update(dt)
		if(keys.Enter) {
			keys.Enter = false;
			stateStack.pop();
			stateStack.pop();
		}
	} 

	render() {
		this.currentMap.render()
		context.save();
		context.fillStyle = 'rgba(0, 0, 0, 0.6)';
		context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		context.restore();

		//SELECTION
		this.winScreenUI.render()
	}
}
