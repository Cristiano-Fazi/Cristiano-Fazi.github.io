import ItemType from "../../enums/ItemType.js";
import Carrot from "../../objects/items/Carrot.js";
import Corn from "../../objects/items/Corn.js";
import Eggplant from "../../objects/items/Eggplant.js";
import Lettuce from "../../objects/items/Lettuce.js";
import Potato from "../../objects/items/Potato.js";
import Pumpkin from "../../objects/items/Pumpkin.js";
import Raddish from "../../objects/items/Raddish.js";
import SeaShell from "../../objects/items/SeaShell.js";
import StarFlower from "../../objects/items/StarFlower.js";
import Strawberry from "../../objects/items/Strawberry.js";
import Tomato from "../../objects/items/Tomato.js";
import Watermelon from "../../objects/items/Watermelon.js";
import Wheat from "../../objects/items/Wheat.js";
import CarrotSeed from "../../objects/seeds/CarrotSeed.js";
import CornSeed from "../../objects/seeds/CornSeed.js";
import EggplantSeed from "../../objects/seeds/EggplantSeed.js";
import LettuceSeed from "../../objects/seeds/LettuceSeed.js";
import PotatoSeed from "../../objects/seeds/PotatoSeed.js";
import PumpkinSeed from "../../objects/seeds/PumpkinSeed.js";
import RaddishSeed from "../../objects/seeds/RaddishSeed.js";
import StarFlowerSeed from "../../objects/seeds/StarFlowerSeeds.js";
import StrawberrySeed from "../../objects/seeds/StrawberrySeed.js";
import TomatoSeed from "../../objects/seeds/TomatoSeed.js";
import WatermelonSeed from "../../objects/seeds/WatermelonSeed.js";
import WheatSeed from "../../objects/seeds/WheatSeed.js";
import Emerald from "../../objects/items/Emerald.js";
import Diamond from "../../objects/items/Diamond.js";
import Ruby from "../../objects/items/Ruby.js";
import Apple from "../../objects/items/Apple.js";
import Rock from "../../objects/items/Rock.js";
import Feather from "../../objects/items/Feather.js";
import Wood from "../../objects/items/Wood.js";
import Clover from "../../objects/items/Clover.js";

export default class ItemFactory {
    static CreateInstance(itemType) {
        switch(itemType){
			case ItemType.StrawberrySeed:
				return new StrawberrySeed();
			case ItemType.CornSeed:
				return new CornSeed();
			case ItemType.PotatoSeed:
					return new PotatoSeed();
			case ItemType.CarrotSeed:
				return new CarrotSeed();
			case ItemType.LettuceSeed:
				return new LettuceSeed();
			case ItemType.EggplantSeed:
				return new EggplantSeed();
			case ItemType.PumpkinSeed:
				return new PumpkinSeed();
			case ItemType.RaddishSeed:
				return new RaddishSeed();
			case ItemType.TomatoSeed:
				return new TomatoSeed();
			case ItemType.WatermelonSeed:
				return new WatermelonSeed();
			case ItemType.WheatSeed:
				return new WheatSeed();
			case ItemType.StarFlowerSeed:
				return new StarFlowerSeed();
			case ItemType.Eggplant:
				return new Eggplant();
			case ItemType.Pumpkin:
				return new Pumpkin();
			case ItemType.Raddish:
				return new Raddish();
			case ItemType.Tomato:
				return new Tomato();
			case ItemType.Watermelon:
				return new Watermelon();
			case ItemType.Wheat:
				return new Wheat();
			case ItemType.Strawberry:
				return new Strawberry();
			case ItemType.Corn:
				return new Corn();
			case ItemType.Potato:
				return new Potato();
			case ItemType.Carrot:
				return new Carrot();
			case ItemType.Lettuce:
				return new Lettuce();
			case ItemType.StarFlower:
				return new StarFlower();
			case ItemType.SeaShell:
				return new SeaShell();
            case ItemType.Emerald:
                return new Emerald();
            case ItemType.Diamond:
                return new Diamond();
            case ItemType.Ruby:
                return new Ruby();
			case ItemType.Apple:
				return new Apple();
			case ItemType.Rock:
				return new Rock();
			case ItemType.Feather:
				return new Feather();
			case ItemType.Wood:
				return new Wood();
			case ItemType.Clover:
				return new Clover();
			default:
				console.log("Invalid item type provided");
				return "Error"
		}
    }
}