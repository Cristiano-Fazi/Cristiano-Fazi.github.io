import Map from "./Map.js"
import Vector from "../../../lib/Vector.js"
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../../globals.js"
import Tile from "../Tile.js"
import Camera from "../../../lib/Camera.js"
import ImageName from "../../enums/ImageName.js"
import Path from "../../objects/townObjects/Path.js"
import Maps from "../../enums/Maps.js"
import Door from "../../objects/townObjects/Door.js"
import SoundName from "../../enums/SoundName.js"
import Vik from "../../entities/characters/Vik.js"
import Character from "../../enums/Character.js"
import Outfit from "../Outfit.js"
import Clothes from "../../enums/Clothes.js"
import ClothesColor from "../../enums/ClothesColor.js"
import Hair from "../../enums/Hair.js"
import HairColor from "../../enums/HairColor.js"
import { keys } from "../../globals.js"
import Cindy from "../../entities/characters/Cindy.js"

export default class ShopMap extends Map {
    static SIZE = 22.5
    static PLAYER_SPAWN_POSITION = new Vector(10, 16);
    static TOWN_PATH = new Door(new Vector(2, 1), new Vector(10, 18), true, Maps.Town, ['Return to Town', 'Stay in Vik\'s Shop']);
    static EXIT_POSITION = new Vector(2, 4);
    static MUSIC = SoundName.LofiStudy;

    constructor(mapDef, player) {
        super(mapDef, ImageName.interiors)

        this.player = player
		this.NPCs = [
			new Vik({ position: new Vector(10, 4)}, this, Character.Character6, new Outfit(Clothes.Suit, ClothesColor.Pink, Clothes.PantsSuit, ClothesColor.Blue, Clothes.Shoes, ClothesColor.Black, Hair.Gentleman, HairColor.Black)),
            new Cindy({position: new Vector(12, 14) }, this, Character.Character7, new Outfit(Clothes.SailorBow, ClothesColor.GreenLight, Clothes.Pants, ClothesColor.Blue, Clothes.Shoes, ClothesColor.White, Hair.Braids, HairColor.Black))
		]

        this.camera = new Camera(
			this.player,
			new Vector(ShopMap.SIZE * Tile.SIZE, ShopMap.SIZE * Tile.SIZE),
			new Vector(CANVAS_WIDTH, CANVAS_HEIGHT),
		)

        this.size = ShopMap.SIZE
        this.playerSpawnPosition = new Vector(ShopMap.PLAYER_SPAWN_POSITION.x, ShopMap.PLAYER_SPAWN_POSITION.y)
        this.exits = [ShopMap.TOWN_PATH]
        this.exitPosition = ShopMap.EXIT_POSITION;
        this.inspectables = [];
        this.music = ShopMap.MUSIC;
    }
}
