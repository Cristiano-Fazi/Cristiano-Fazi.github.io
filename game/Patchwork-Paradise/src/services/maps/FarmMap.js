import Map from "./Map.js"
import Vector from "../../../lib/Vector.js"
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../../globals.js"
import Tile from "../Tile.js"
import Camera from "../../../lib/Camera.js"
import ImageName from "../../enums/ImageName.js";
import Path from "../../objects/townObjects/Path.js"
import Maps from "../../enums/Maps.js"
import SoundName from "../../enums/SoundName.js"
import Larry from "../../entities/characters/Larry.js"
import Outfit from "../Outfit.js"
import Character from "../../enums/Character.js"
import Clothes from "../../enums/Clothes.js"
import ClothesColor from "../../enums/ClothesColor.js"
import Hair from "../../enums/Hair.js"
import HairColor from "../../enums/HairColor.js"
import Barn from "../../objects/farmObjects/Barn.js"

export default class FarmMap extends Map {
    static SIZE = 30;
    static PLAYER_SPAWN_POSITION = new Vector(26, 6);
    static WIN_SPAWN_POSITION = new Vector(28, -12);
    static TOWN_PATH = new Path(new Vector(1, 3), new Vector(30, 8), Maps.Town);
    static MUSIC = SoundName.Empty_Mind;

    constructor(mapDef, player, objectStore) {
        super(mapDef, ImageName.Tiles, objectStore)

        this.player = player
		this.NPCs = [
			new Larry({ position: new Vector(29, 7)}, this, Character.Character2, new Outfit(Clothes.Suit, ClothesColor.Black, Clothes.PantsSuit, ClothesColor.Black, Clothes.Shoes, ClothesColor.Black, Hair.Bob, HairColor.Grey)),
		]

        this.camera = new Camera(
			this.player,
			new Vector(FarmMap.SIZE * Tile.SIZE, FarmMap.SIZE * Tile.SIZE),
			new Vector(CANVAS_WIDTH, CANVAS_HEIGHT),
		)
        this.size = FarmMap.SIZE
        this.playerSpawnPosition = new Vector(FarmMap.PLAYER_SPAWN_POSITION.x, FarmMap.PLAYER_SPAWN_POSITION.y)
        this.exits = [FarmMap.TOWN_PATH]
        this.farmingEnabled = true;
        this.inspectables = [new Barn(new Vector(8,5), new Vector(22, 0), this.player)];
        this.music = FarmMap.MUSIC;
    }
}