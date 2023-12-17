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
import Character from "../../enums/Character.js"
import Outfit from "../Outfit.js"
import Clothes from "../../enums/Clothes.js"
import ClothesColor from "../../enums/ClothesColor.js"
import Hair from "../../enums/Hair.js"
import HairColor from "../../enums/HairColor.js"
import Carson from "../../entities/characters/Carson.js"

export default class NoahCarsonHouse extends Map {
    static SIZE = 22.5;
    static PLAYER_SPAWN_POSITION = new Vector(10, 15);
    static TOWN_PATH = new Door(new Vector(2, 1), new Vector(10, 16), true, Maps.Town, ['Return to Town', 'Stay in Noah and Carson\'s House']);
    static EXIT_POSITION = new Vector(20, 12);
    static MUSIC = SoundName.Once_In_Paris;

    constructor(mapDef, player) {
        super(mapDef, ImageName.interiors)

        this.player = player
		this.NPCs = [
			new Carson({ position: new Vector(11, 9)}, this, Character.Character1, new Outfit(Clothes.Basic, ClothesColor.Black, Clothes.Pants, ClothesColor.Black, Clothes.Shoes, ClothesColor.Black, Hair.Emo, HairColor.Brown)),
		]

        this.camera = new Camera(
			this.player,
			new Vector(NoahCarsonHouse.SIZE * Tile.SIZE, NoahCarsonHouse.SIZE * Tile.SIZE),
			new Vector(CANVAS_WIDTH, CANVAS_HEIGHT),
		)

        this.size = NoahCarsonHouse.SIZE
        this.playerSpawnPosition = new Vector(NoahCarsonHouse.PLAYER_SPAWN_POSITION.x, NoahCarsonHouse.PLAYER_SPAWN_POSITION.y)
        this.exits = [NoahCarsonHouse.TOWN_PATH];
        this.exitPosition = NoahCarsonHouse.EXIT_POSITION;
        this.inspectables = [
            new Inspectable(new Vector(1, 1), new Vector(9, 10), 'This radio is playing Taylor Swift, Noah and Carson must be big fans!'),
            new Inspectable(new Vector(2, 2), new Vector(1, 7), 'Spooky? Scary? Skeletons? This must be Carson\'s Bed'),
            new Inspectable(new Vector(2, 2), new Vector(20, 7), 'Cozy? Comfortable? Calm? This must be Noah\'s Bed'),
        ];
        this.music = NoahCarsonHouse.MUSIC;
    }
}
