import State from "../../../lib/State.js";
import { context, CANVAS_WIDTH, CANVAS_HEIGHT, keys, MAP_DEFINITIONS, objectStore, stateStack} from "../../globals.js";
import TitleScreen from "../../user-interface/elements/TitleScreen.js";

import Player from "../../entities/Player.js";
import PlayState from "./PlayState.js";
import Outfit from "../../services/Outfit.js";
import Clothes from "../../enums/Clothes.js";
import ClothesColor from "../../enums/ClothesColor.js";
import Hair from "../../enums/Hair.js";
import HairColor from "../../enums/HairColor.js";
import TownMap from "../../services/maps/TownMap.js";
import FarmMap from "../../services/maps/FarmMap.js";
import ShopMap from "../../services/maps/ShopMap.js";
import BreannaCindyHouse from "../../services/maps/BreannaCindyHouse.js";
import VincentHouse from "../../services/maps/VincentHouse.js";
import YanoRiddhiHouse from "../../services/maps/YanoRiddhiHouse.js";
import NoahCarsonHouse from "../../services/maps/NoahCarsonHouse.js";
import VikHouse from "../../services/maps/VikHouse.js";
import NipreetJordanHouse from "../../services/maps/NipreetJordanHouse.js";
import KevinSophiaHouse from "../../services/maps/KevinSophiaHouse.js";
import Vector from "../../../lib/Vector.js";
import Maps from "../../enums/Maps.js";
import CropFactory from "../../services/Factories/CropFactory.js";

export default class TitleScreenState extends State {
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
		this.titlescreenUI = new TitleScreen()
		this.selectedIndex = 0
		this.player = new Player({  position: TownMap.TITLE_SPAWN_POSITION }, new Outfit(Clothes.Basic,  ClothesColor.Red, Clothes.Pants, ClothesColor.Black, Clothes.Shoes, ClothesColor.Black, Hair.Gentleman, HairColor.Brown), 0);
		this.currentMap = new TownMap(MAP_DEFINITIONS.Town, this.player)
	}

	update(dt) {
		this.currentMap.update(dt)

		if(keys.d) {
			keys.d = false;
			this.selectedIndex = (this.selectedIndex + 1) % TitleScreenState.NUMBER_OF_CHOICES;
		}
		if(keys.a) {
			keys.a = false;
			this.selectedIndex = (this.selectedIndex - 1 + TitleScreenState.NUMBER_OF_CHOICES) % TitleScreenState.NUMBER_OF_CHOICES;
		}
		if(keys.Enter) {
			keys.Enter = false;
			if(this.selectedIndex == TitleScreenState.OPTIONS.newsave) {
				localStorage.setItem("objects", null);
				localStorage.setItem("inventory", null);
				localStorage.setItem("money", null);
				localStorage.setItem("farmlevel", null);
			}
			this.initializeGame()
		}
	} 

	initializeGame() {
		const money = Number(JSON.parse(localStorage.getItem("money")) ?? 500);
		//const player = new Player({ position: TownMap.PLAYER_SPAWN_POSITION}, new Outfit(Clothes.Basic,  ClothesColor.Red, Clothes.Pants, ClothesColor.Black, Clothes.Shoes, ClothesColor.Black, Hair.Gentleman, HairColor.Brown));
		const player = new Player({ position: {x: FarmMap.PLAYER_SPAWN_POSITION.x, y: TownMap.PLAYER_SPAWN_POSITION.y } }, new Outfit(Clothes.Basic,  ClothesColor.Red, Clothes.Pants, ClothesColor.Black, Clothes.Shoes, ClothesColor.Black, Hair.Gentleman, HairColor.Brown), money);
		this.loadObjectStore();
		const maps = {
			SmallFarm: new FarmMap(MAP_DEFINITIONS.SmallFarm, player, objectStore),
			MediumFarm: new FarmMap(MAP_DEFINITIONS.MediumFarm, player, objectStore),
			BigFarm: new FarmMap(MAP_DEFINITIONS.BigFarm, player, objectStore),
			Town: new TownMap(MAP_DEFINITIONS.Town, player),
			Shop: new ShopMap(MAP_DEFINITIONS.Shop, player),
			VincentHouse: new VincentHouse(MAP_DEFINITIONS.VincentHouse, player),
			YanoRiddhiHouse: new YanoRiddhiHouse(MAP_DEFINITIONS.YanoRiddhiHouse, player),
			NoahCarsonHouse: new NoahCarsonHouse(MAP_DEFINITIONS.NoahCarsonHouse, player),
			BreannaCindyHouse: new BreannaCindyHouse(MAP_DEFINITIONS.BreannaCindyHouse, player),
			VikHouse: new VikHouse(MAP_DEFINITIONS.VikHouse, player),
			NipreetJordanHouse: new NipreetJordanHouse(MAP_DEFINITIONS.NipreetJordanHouse, player),
			KevinSophiaHouse: new KevinSophiaHouse(MAP_DEFINITIONS.KevinSophiaHouse, player),
			TitleTown: new TownMap(MAP_DEFINITIONS.Town, player)
		}

		let playerSpawningMap; //= maps.TownMap
		switch(player.currentFarmLevel) {
			case 1:
				playerSpawningMap = maps.SmallFarm;
				maps.Town.changeFarm(Maps.SmallFarm);
				break;
			case 2:
				playerSpawningMap = maps.MediumFarm;
				maps.Town.changeFarm(Maps.MediumFarm);
				break;
			case 3:
				playerSpawningMap = maps.BigFarm;
				maps.Town.changeFarm(Maps.BigFarm);
				break;
		}

		stateStack.push(new PlayState(maps, playerSpawningMap, player));
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
		context.rect(TitleScreenState.SELECTION_POSITION_TOP_X + (this.selectedIndex * TitleScreenState.SELECTION_OFFSET),TitleScreenState.SELECTION_POSITION_TOP_Y, TitleScreenState.SELECTION_WIDTH_BAR,TitleScreenState.SELECTION_HEIGHT_BAR)
		context.rect(TitleScreenState.SELECTION_POSITION_TOP_X +1 + (this.selectedIndex * TitleScreenState.SELECTION_OFFSET),TitleScreenState.SELECTION_POSITION_TOP_Y + 8, TitleScreenState.SELECTION_WIDTH_BAR - 2,TitleScreenState.SELECTION_HEIGHT_BAR + 20)
		context.rect(TitleScreenState.SELECTION_POSITION_TOP_X + (this.selectedIndex * TitleScreenState.SELECTION_OFFSET),TitleScreenState.SELECTION_POSITION_TOP_Y + 35, TitleScreenState.SELECTION_WIDTH_BAR,TitleScreenState.SELECTION_HEIGHT_BAR)
		context.fill();
		context.closePath();
		context.restore();
		this.titlescreenUI.render()
	}

	loadObjectStore() {
		let savedObjects = JSON.parse(localStorage.getItem("objects"))
		if(savedObjects) {
			savedObjects = savedObjects.map(object => {
				let obj = CropFactory.CreateInstance(object.type, new Vector(object.posX, object.posY))
				obj.currentFrame = object.currentFrame;
				obj.offset.x = object.offsetX
				obj.offset.y = object.offsetY
				return obj
			})
		}
		objectStore.objects = savedObjects ?? []
	}
}
