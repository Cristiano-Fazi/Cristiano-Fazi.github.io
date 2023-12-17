import Map from "./Map.js"
import Vector from "../../../lib/Vector.js"
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../../globals.js"
import Tile from "../Tile.js"
import Camera from "../../../lib/Camera.js"
import ImageName from "../../enums/ImageName.js"
import Door from "../../objects/townObjects/Door.js"
import Maps from "../../enums/Maps.js"
import SoundName from "../../enums/SoundName.js"
import Character from "../../enums/Character.js"
import Outfit from "../Outfit.js"
import Clothes from "../../enums/Clothes.js"
import ClothesColor from "../../enums/ClothesColor.js"
import Hair from "../../enums/Hair.js"
import HairColor from "../../enums/HairColor.js"
import Cristiano from "../../entities/characters/Cristiano.js"

export default class YanoRiddhiHouse extends Map {
    static SIZE = 22.5;
    static PLAYER_SPAWN_POSITION = new Vector(10, 15);
    static TOWN_PATH = new Door(new Vector(2, 1), new Vector(10, 17), true, Maps.Town, ['Return to Town', 'Stay in Yano and Riddhi\'s House']);
    static EXIT_POSITION = new Vector(55, 21);
    static MUSIC = SoundName.Once_In_Paris;

    constructor(mapDef, player) {
        super(mapDef, ImageName.interiors)

        this.player = player
		this.NPCs = [
            new Cristiano({ position: new Vector(17, 5) }, this, Character.Character1, new Outfit(Clothes.Basic, ClothesColor.Pink, Clothes.Pants, ClothesColor.Blue, Clothes.Shoes, ClothesColor.Black, Hair.Gentleman, HairColor.Brown))
		]

        this.camera = new Camera(
			this.player,
			new Vector(YanoRiddhiHouse.SIZE * Tile.SIZE, YanoRiddhiHouse.SIZE * Tile.SIZE),
			new Vector(CANVAS_WIDTH, CANVAS_HEIGHT),
		)

        this.size = YanoRiddhiHouse.SIZE
        this.playerSpawnPosition = new Vector(YanoRiddhiHouse.PLAYER_SPAWN_POSITION.x, YanoRiddhiHouse.PLAYER_SPAWN_POSITION.y)
        this.exits = [YanoRiddhiHouse.TOWN_PATH];
        this.exitPosition = YanoRiddhiHouse.EXIT_POSITION;
        this.inspectables = [];
        this.music = YanoRiddhiHouse.MUSIC;
    }
}
