import CropType from "../../enums/CropType.js";
import CarrotCrop from "../../objects/crops/CarrotCrop.js";
import CornCrop from "../../objects/crops/CornCrop.js";
import EggplantCrop from "../../objects/crops/EggplantCrop.js";
import LettuceCrop from "../../objects/crops/LettuceCrop.js";
import PotatoCrop from "../../objects/crops/PotatoCrop.js";
import PumpkinCrop from "../../objects/crops/PumpkinCrop.js";
import RaddishCrop from "../../objects/crops/RaddishCrop.js";
import StarFlowerCrop from "../../objects/crops/StarFlowerCrop.js";
import StrawberryCrop from "../../objects/crops/StrawberryCrop.js";
import TomatoCrop from "../../objects/crops/TomatoCrop.js";
import WatermelonCrop from "../../objects/crops/WatermelonCrop.js";
import WheatCrop from "../../objects/crops/WheatCrop.js";

export default class CropFactory {
    static CreateInstance(itemType, position) {
        switch(itemType){
			case CropType.StrawberryCrop:
				return new StrawberryCrop(position);
			case CropType.CornCrop:
				return new CornCrop(position);
			case CropType.PotatoCrop:
					return new PotatoCrop(position);
			case CropType.CarrotCrop:
				return new CarrotCrop(position);
			case CropType.LettuceCrop:
				return new LettuceCrop(position);
			case CropType.EggplantCrop:
				return new EggplantCrop(position);
			case CropType.PumpkinCrop:
				return new PumpkinCrop(position);
			case CropType.RaddishCrop:
				return new RaddishCrop(position);
			case CropType.TomatoCrop:
				return new TomatoCrop(position);
			case CropType.WatermelonCrop:
				return new WatermelonCrop(position);
			case CropType.WheatCrop:
				return new WheatCrop(position);
			case CropType.StarFlowerCrop:
				return new StarFlowerCrop(position);
			default:
				console.log("Invalid crop type provided");
				return "Error"
		}
    }
}