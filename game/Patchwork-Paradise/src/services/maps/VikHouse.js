import Map from "./Map.js"
import Vector from "../../../lib/Vector.js"
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../../globals.js"
import Tile from "../Tile.js"
import Camera from "../../../lib/Camera.js"
import ImageName from "../../enums/ImageName.js"
import Door from "../../objects/townObjects/Door.js"
import Maps from "../../enums/Maps.js"
import SoundName from "../../enums/SoundName.js"
import Inspectable from "../../objects/townObjects/Inspectable.js"

export default class VikHouse extends Map {
    static SIZE = 22.5;
    static PLAYER_SPAWN_POSITION = new Vector(11, 15);
    static TOWN_PATH = new Door(new Vector(2, 1), new Vector(11, 16), true, Maps.Town, ['Return to Town', 'Stay in Vik\'s House']);
    static EXIT_POSITION = new Vector(11, 5);
    static MUSIC = SoundName.Once_In_Paris;

    constructor(mapDef, player) {
        super(mapDef, ImageName.interiors)

        this.player = player
		this.NPCs = [
			
		]

        this.camera = new Camera(
			this.player,
			new Vector(VikHouse.SIZE * Tile.SIZE, VikHouse.SIZE * Tile.SIZE),
			new Vector(CANVAS_WIDTH, CANVAS_HEIGHT),
		)

        this.size = VikHouse.SIZE
        this.playerSpawnPosition = new Vector(VikHouse.PLAYER_SPAWN_POSITION.x, VikHouse.PLAYER_SPAWN_POSITION.y)
        this.exits = [VikHouse.TOWN_PATH];
        this.exitPosition = VikHouse.EXIT_POSITION;
        this.inspectables = [
            new Inspectable(new Vector(2, 1) , new Vector(9, 5), 'The cat\'s asleep, I\'d better be careful not to wake it up. 🐈‍⬛'),
            new Inspectable(new Vector(2, 1) , new Vector(7, 6), 'He was playing Stardew Valley, great choice of game. 🧑‍🌾')
        ];
        this.music = VikHouse.MUSIC;
    }
}
