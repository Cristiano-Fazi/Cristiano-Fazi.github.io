import Map from "./Map.js"
import Vector from "../../../lib/Vector.js"
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../../globals.js"
import Tile from "../Tile.js"
import Camera from "../../../lib/Camera.js"
import ImageName from "../../enums/ImageName.js"
import Door from "../../objects/townObjects/Door.js"
import Maps from "../../enums/Maps.js"
import SoundName from "../../enums/SoundName.js"
import Nipreet from "../../entities/characters/Nipreet.js"
import Character from "../../enums/Character.js"
import Outfit from "../Outfit.js"
import Clothes from "../../enums/Clothes.js"
import ClothesColor from "../../enums/ClothesColor.js"
import Hair from "../../enums/Hair.js"
import HairColor from "../../enums/HairColor.js"

export default class NipreetJordanHouse extends Map {
    static SIZE = 22.5;
    static PLAYER_SPAWN_POSITION = new Vector(5, 16);
    static TOWN_PATH = new Door(new Vector(2, 1), new Vector(5, 17), true, Maps.Town, ['Return to Town', 'Stay in Nipreet and Jordan\'s House']);
    static EXIT_POSITION = new Vector(13, 35);
    static MUSIC = SoundName.Once_In_Paris;

    constructor(mapDef, player) {
        super(mapDef, ImageName.interiors)

        this.player = player
		this.NPCs = [
            new Nipreet({position: new Vector(18, 12)}, this,  Character.Character6, new Outfit(Clothes.Basic, ClothesColor.Red, Clothes.Pants, ClothesColor.Black, Clothes.Shoes, ClothesColor.Black, Hair.Gentleman, HairColor.Black)),
		]

        this.camera = new Camera(
			this.player,
			new Vector(NipreetJordanHouse.SIZE * Tile.SIZE, NipreetJordanHouse.SIZE * Tile.SIZE),
			new Vector(CANVAS_WIDTH, CANVAS_HEIGHT),
		)

        this.size = NipreetJordanHouse.SIZE
        this.playerSpawnPosition = new Vector(NipreetJordanHouse.PLAYER_SPAWN_POSITION.x, NipreetJordanHouse.PLAYER_SPAWN_POSITION.y)
        this.exits = [NipreetJordanHouse.TOWN_PATH];
        this.exitPosition = NipreetJordanHouse.EXIT_POSITION;
        this.inspectables = [];
        this.music = NipreetJordanHouse.MUSIC;
    }
}
