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
import Sophia from "../../entities/characters/Sophia.js"
import Character from "../../enums/Character.js"
import Outfit from "../Outfit.js"
import Clothes from "../../enums/Clothes.js"
import ClothesColor from "../../enums/ClothesColor.js"
import Hair from "../../enums/Hair.js"
import HairColor from "../../enums/HairColor.js"
import Kevin from "../../entities/characters/Kevin.js"

export default class KevinSophiaHouse extends Map {
    static SIZE = 22.5;
    static PLAYER_SPAWN_POSITION = new Vector(11, 17);
    static TOWN_PATH = new Door(new Vector(2, 1), new Vector(11, 18), true, Maps.Town, ['Return to Town', 'Stay in Kevin and Sophia\'s House']);
    static EXIT_POSITION = new Vector(17, 4);
    static MUSIC = SoundName.Once_In_Paris;

    constructor(mapDef, player) {
        super(mapDef, ImageName.interiors)

        this.player = player
		this.NPCs = [
            new Sophia(
                { position: new Vector(12, 4)}, 
                this, 
                Character.Character5, 
                new Outfit(Clothes.Dress, ClothesColor.White, null, null, Clothes.Shoes, ClothesColor.Black, Hair.LongStraightSkirt, HairColor.Black)
            ),
            new Kevin({ position: new Vector(6, 12)}, this, Character.Character1, new Outfit(Clothes.Basic, ClothesColor.White, Clothes.Pants, ClothesColor.Blue, Clothes.Shoes, ClothesColor.Black, Hair.Gentleman, HairColor.BrownLight)),
		]

        this.camera = new Camera(
			this.player,
			new Vector(KevinSophiaHouse.SIZE * Tile.SIZE, KevinSophiaHouse.SIZE * Tile.SIZE),
			new Vector(CANVAS_WIDTH, CANVAS_HEIGHT),
		)

        this.size = KevinSophiaHouse.SIZE
        this.playerSpawnPosition = new Vector(KevinSophiaHouse.PLAYER_SPAWN_POSITION.x, KevinSophiaHouse.PLAYER_SPAWN_POSITION.y)
        this.exits = [KevinSophiaHouse.TOWN_PATH];
        this.exitPosition = KevinSophiaHouse.EXIT_POSITION;
        this.inspectables = [
            new Inspectable(new Vector(0.5, 0.5) , new Vector(8.5, 9), 'The note says "DON\'T FORGET YOUR LAPTOP!" I hope they didn\'t forget it'),
            new Inspectable(new Vector(1, 2) , new Vector(16, 6), 'This grocery list just says "twelve dozen eggs"'),
            new Inspectable(new Vector(2, 2) , new Vector(5, 8), 'He\'s been working on DevOps... for 27 hours... I hope he\'s alright...'),
        ];
        this.music = KevinSophiaHouse.MUSIC;
    }
}
