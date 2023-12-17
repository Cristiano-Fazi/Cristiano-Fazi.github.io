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
import Clothes from "../../enums/Clothes.js"
import ClothesColor from "../../enums/ClothesColor.js"
import Hair from "../../enums/Hair.js"
import HairColor from "../../enums/HairColor.js"
import Breanna from "../../entities/characters/Breanna.js"
import Outfit from "../Outfit.js"

export default class BreannaCindyHouse extends Map {
    static SIZE = 22.5;
    static PLAYER_SPAWN_POSITION = new Vector(10, 16);
    static TOWN_PATH = new Door(new Vector(2, 1), new Vector(10, 18), true, Maps.Town, ['Return to Town', 'Stay in Breanna and Cindy\'s House']);
    static EXIT_POSITION = new Vector(34, 5);
    static MUSIC = SoundName.Once_In_Paris;

    constructor(mapDef, player) {
        super(mapDef, ImageName.interiors)

        this.player = player
		this.NPCs = [
            new Breanna({ position: new Vector(6, 7)}, this, Character.Character1, new Outfit(Clothes.Floral, ClothesColor.GreenLight, Clothes.Pants, ClothesColor.Black, Clothes.Shoes, ClothesColor.Black, Hair.FrenchCurl, HairColor.Emerald))
		]

        this.camera = new Camera(
			this.player,
			new Vector(BreannaCindyHouse.SIZE * Tile.SIZE, BreannaCindyHouse.SIZE * Tile.SIZE),
			new Vector(CANVAS_WIDTH, CANVAS_HEIGHT),
		)

        this.size = BreannaCindyHouse.SIZE
        this.playerSpawnPosition = new Vector(BreannaCindyHouse.PLAYER_SPAWN_POSITION.x, BreannaCindyHouse.PLAYER_SPAWN_POSITION.y)
        this.exits = [BreannaCindyHouse.TOWN_PATH];
        this.exitPosition = BreannaCindyHouse.EXIT_POSITION;
        this.inspectables = [];
        this.music = BreannaCindyHouse.MUSIC;
    }
}
