import Map from "./Map.js"
import Vector from "../../../lib/Vector.js"
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../../globals.js"
import Tile from "../Tile.js"
import Camera from "../../../lib/Camera.js"
import ImageName from "../../enums/ImageName.js"
import Door from "../../objects/townObjects/Door.js"
import Maps from "../../enums/Maps.js"
import SoundName from "../../enums/SoundName.js"

export default class VincentHouse extends Map {
    static SIZE = 22.5;
    static PLAYER_SPAWN_POSITION = new Vector(11, 13);
    static TOWN_PATH = new Door(new Vector(2, 1), new Vector(11, 14), true, Maps.Town, ['Return to Town', 'Stay in Vincent\'s House']);
    static EXIT_POSITION = new Vector(2, 12);
    static MUSIC = SoundName.Once_In_Paris;

    constructor(mapDef, player) {
        super(mapDef, ImageName.interiors)

        this.player = player
		this.NPCs = [
			
		]

        this.camera = new Camera(
			this.player,
			new Vector(VincentHouse.SIZE * Tile.SIZE, VincentHouse.SIZE * Tile.SIZE),
			new Vector(CANVAS_WIDTH, CANVAS_HEIGHT),
		)

        this.size = VincentHouse.SIZE;
        this.playerSpawnPosition = new Vector(VincentHouse.PLAYER_SPAWN_POSITION.x, VincentHouse.PLAYER_SPAWN_POSITION.y)
        this.exits = [VincentHouse.TOWN_PATH];
        this.exitPosition = VincentHouse.EXIT_POSITION;
        this.inspectables = [];
        this.music = VincentHouse.MUSIC;
    }
}
