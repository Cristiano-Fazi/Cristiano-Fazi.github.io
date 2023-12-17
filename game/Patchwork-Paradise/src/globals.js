import Fonts from "../lib/Fonts.js";
import Images from "../lib/Images.js";
import Sounds from "../lib/Sounds.js";
import StateStack from "../lib/StateStack.js";
import Timer from "../lib/Timer.js";
import ObjectStore from "./services/ObjectStore.js";

export const canvas = document.createElement('canvas');
export const context = canvas.getContext('2d') || new CanvasRenderingContext2D();

// Replace these values according to how big you want your canvas.
export const CANVAS_WIDTH = 360;
export const CANVAS_HEIGHT = 360;

export const keys = {};
export const images = new Images(context);
export const fonts = new Fonts();
export const stateStack = new StateStack();
export const timer = new Timer();
export const sounds = new Sounds();
export const objectStore = new ObjectStore()

export const DEBUG = false;

let town = await fetch('./config/map.json').then((response) => response.json());
let smallFarm = await fetch('./config/smallfarm.json').then((response) => response.json());
let mediumFarm = await fetch('./config/mediumfarm.json').then((response) => response.json());
let bigFarm = await fetch('./config/bigfarm.json').then((response) => response.json());
let shop = await fetch('./config/shop.json').then((response) => response.json());
let vincentHouse = await fetch('./config/Vincent-House.json').then((response) => response.json());
let yanoRiddhiHouse = await fetch('./config/Riddhi-and-Yano-House.json').then((response) => response.json());
let noahCarsonHouse = await fetch('./config/Noah-Carson-House.json').then((response) => response.json());
let breannaCindyHouse = await fetch('./config/Breanna-Cindy-House.json').then((response) => response.json());
let vikHouse = await fetch('./config/Vik-House.json').then((response) => response.json());
let nipreetJordanHouse = await fetch('./config/Nipreet-Jordan-House.json').then((response) => response.json());
let kevinSophiaHouse = await fetch('./config/Kevin-Sophia.json').then((response) => response.json());

export const MAP_DEFINITIONS = {
	Town: town,
	SmallFarm: smallFarm,
	MediumFarm: mediumFarm,
	BigFarm: bigFarm,
	Shop: shop,
	VincentHouse: vincentHouse,
	YanoRiddhiHouse: yanoRiddhiHouse,
	NoahCarsonHouse: noahCarsonHouse,
	BreannaCindyHouse: breannaCindyHouse,
	VikHouse: vikHouse,
	NipreetJordanHouse: nipreetJordanHouse,
	KevinSophiaHouse: kevinSophiaHouse
}
