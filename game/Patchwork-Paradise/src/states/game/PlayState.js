import State from "../../../lib/State.js"
import SoundName from "../../enums/SoundName.js"
import { stateStack, sounds, keys } from "../../globals.js";
import TransitionState from "./TransitionState.js";
import Maps from "../../enums/Maps.js";
import PlayerInventoryUI from "../../user-interface/elements/player/PlayerInventoryUI.js";
import PauseScreenState from "./PauseScreenState.js";

export default class PlayState extends State {

	constructor(maps, startMap, player, objectStore) {
		super();
		this.maps = maps;
		this.currentMap = startMap;
		this.playerInventoryUI = new PlayerInventoryUI(player);
		this.objectStore = objectStore;
	}

	enter(parameters){
		super.enter(parameters);
		sounds.play(SoundName.Once_In_Paris);
	}

	switchMaps(newMap) {
		let newLocation = null;

		switch(newMap) {
			case Maps.SmallFarm:
				sounds.stop(this.currentMap.music);
				sounds.play(this.maps.SmallFarm.music);
				newLocation = this.currentMap.exitPosition;
				this.currentMap = this.maps.SmallFarm;
				break;
			case Maps.MediumFarm:
				sounds.stop(this.currentMap.music);
				sounds.play(this.maps.MediumFarm.music);
				newLocation = this.currentMap.exitPosition;
				this.currentMap = this.maps.MediumFarm;
				break;
			case Maps.BigFarm:
				sounds.stop(this.currentMap.music);
				sounds.play(this.maps.BigFarm.music);
				newLocation = this.currentMap.exitPosition;
				this.currentMap = this.maps.BigFarm;
				break;
			case Maps.Town:
				sounds.stop(this.currentMap.music);
				sounds.play(this.maps.Town.music);
				newLocation = this.currentMap.exitPosition;
				this.currentMap = this.maps.Town;
				break;
			case Maps.Shop:
				sounds.stop(this.currentMap.music);
				sounds.play(this.maps.Shop.music);
				newLocation = this.currentMap.exitPosition;
				this.currentMap = this.maps.Shop;
				break;
			case Maps.VincentHouse:
				sounds.stop(this.currentMap.music);
				sounds.play(this.maps.VincentHouse.music);
				newLocation = this.currentMap.exitPosition;
				this.currentMap = this.maps.VincentHouse;
				break;
			case Maps.YanoRiddhiHouse:
				sounds.stop(this.currentMap.music);
				sounds.play(this.maps.YanoRiddhiHouse.music);
				newLocation = this.currentMap.exitPosition;
				this.currentMap = this.maps.YanoRiddhiHouse;
				break;
			case Maps.NoahCarsonHouse:
				sounds.stop(this.currentMap.music);
				sounds.play(this.maps.NoahCarsonHouse.music);
				newLocation = this.currentMap.exitPosition;
				this.currentMap = this.maps.NoahCarsonHouse;
				break;
			case Maps.BreannaCindyHouse:
				sounds.stop(this.currentMap.music);
				sounds.play(this.maps.BreannaCindyHouse.music);
				newLocation = this.currentMap.exitPosition;
				this.currentMap = this.maps.BreannaCindyHouse;
				break;
			case Maps.VikHouse:
				sounds.stop(this.currentMap.music);
				sounds.play(this.maps.VikHouse.music);
				newLocation = this.currentMap.exitPosition;
				this.currentMap = this.maps.VikHouse;
				break;
			case Maps.NipreetJordanHouse:
				sounds.stop(this.currentMap.music);
				sounds.play(this.maps.NipreetJordanHouse.music);
				newLocation = this.currentMap.exitPosition;
				this.currentMap = this.maps.NipreetJordanHouse;
				break;
			case Maps.KevinSophiaHouse:
				sounds.stop(this.currentMap.music);
				sounds.play(this.maps.KevinSophiaHouse.music);
				newLocation = this.currentMap.exitPosition;
				this.currentMap = this.maps.KevinSophiaHouse;
				break;
			default:
				newLocation = this.maps.Town.exitPosition;
				console.log("Invalid map, please provide a valid map destination");
				this.currentMap = this.maps.Town;
				break;
		}

		if(newLocation == null){
			this.currentMap.player.changePos(this.currentMap.playerSpawnPosition);
		}
		else{
			this.currentMap.player.changePos(newLocation);
		}

		this.currentMap.update()
		stateStack.push(new TransitionState(TransitionState.TYPE.Out, () => {this.currentMap.player.isTraveling = false}))
	}

	update(dt) {
		this.currentMap.update(dt);
		this.playerInventoryUI.update(dt)
		if(this.currentMap.player.didUpgrade){
			if(this.currentMap.player.currentFarmLevel == 2){
				this.maps.Town.changeFarm(Maps.MediumFarm);
			}
			else if(this.currentMap.player.currentFarmLevel == 3){
				this.maps.Town.changeFarm(Maps.BigFarm);
			}

			this.currentMap.player.didUpgrade = false;
		}
		if(keys.Escape) {
			keys.Escape = false;
			stateStack.push(new PauseScreenState(this.currentMap))
		}
	}

	render() {
		this.currentMap.render();
		this.playerInventoryUI.render();
	}

}
