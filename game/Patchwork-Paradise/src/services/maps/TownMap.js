import Map from "./Map.js"
import Vector from "../../../lib/Vector.js"
import Kevin from '../../entities/characters/Kevin.js'
import Noah from '../../entities/characters/Noah.js'
import Riddhi from '../../entities/characters/Riddhi.js'
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../globals.js"
import Camera from "../../../lib/Camera.js"
import Tile from "../Tile.js"
import Outfit from "../Outfit.js"
import ClothesColor from '../../enums/ClothesColor.js'
import Clothes from "../../enums/Clothes.js"
import Hair from "../../enums/Hair.js"
import HairColor from "../../enums/HairColor.js"
import Character from "../../enums/Character.js"
import ImageName from "../../enums/ImageName.js";
import Path from "../../objects/townObjects/Path.js"
import Door from "../../objects/townObjects/Door.js"
import Maps from "../../enums/Maps.js"
import SoundName from "../../enums/SoundName.js"
import Inspectable from "../../objects/townObjects/Inspectable.js"
import OldSailor from "../../entities/characters/OldSailor.js"
import Vincent from "../../entities/characters/Vincent.js"

export default class TownMap extends Map {
    static SIZE = 60;
    //static PLAYER_SPAWN_POSITION = new Vector(50, 25);
    static PLAYER_SPAWN_POSITION = new Vector(1, 6);
    static TITLE_SPAWN_POSITION = new Vector(25, -12);

    //Paths
    static FARM_PATH = new Path(new Vector(1, 1), new Vector(-1, 6), Maps.SmallFarm);
    static SHOP_PATH = new Door(new Vector(2, 3) , new Vector(2, 2), true, Maps.Shop, ['Enter Vik\'s Crop Shop', 'Stay in The Town']);
    static VINCENT_HOUSE_PATH = new Door(new Vector(1, 2), new Vector(2, 11), true, Maps.VincentHouse, ['Enter Vincent\'s House', 'Stay in The Town']);  
    static YANO_RIDDHI_HOUSE_PATH = new Door(new Vector(1, 2), new Vector(55, 20), true, Maps.YanoRiddhiHouse, ['Enter Yano\'s and Riddhi\'s House', 'Stay in The Town']);
    static NOAH_CARSON_HOUSE_PATH = new Door(new Vector(1, 2), new Vector(20, 11), true, Maps.NoahCarsonHouse, ['Enter Noah and Carson\'s House', 'Stay in The Town']);
    static BREANNA_CINDY_HOUSE_PATH = new Door(new Vector(1, 2.5), new Vector(34, 2.5), true, Maps.BreannaCindyHouse, ['Enter Breanna and Cindy\'s House', 'Stay in The Town']);
    static VIK_HOUSE_PATH = new Door(new Vector(1, 3), new Vector(10, 2), true, Maps.VikHouse, ['Enter Vik\'s House', 'Stay in The Town']);
    static NIPREET_JORDAN_HOUSE_PATH = new Door(new Vector(2, 2), new Vector(13, 33), true, Maps.NipreetJordanHouse, ['Enter Nipreet and Jordan\'s House', 'Stay in The Town']);
    static KEVIN_SOPHIA_HOUSE_PATH = new Door(new Vector(1, 2), new Vector(17, 3), true, Maps.KevinSophiaHouse, ['Enter Kevin and Sophia\'s House', 'Stay in The Town']);

    //Music
    static MUSIC = SoundName.Once_In_Paris;

    constructor(mapDef, player) {
        super(mapDef, ImageName.Tiles);

        this.farmPath = new Path(new Vector(1, 1), new Vector(-1, 6), Maps.SmallFarm);
        this.player = player
		this.NPCs = [
            new Noah({ position: new Vector(1, 44)}, this, Character.Character1, new Outfit(Clothes.Basic, ClothesColor.Green, Clothes.Pants, ClothesColor.Blue, Clothes.Shoes, ClothesColor.White, Hair.Emo, HairColor.Brown)),
            new Vincent({ position: new Vector(1, 14)}, this, Character.Character2, new Outfit(Clothes.Basic, ClothesColor.White, Clothes.Pants, ClothesColor.Black, Clothes.Shoes, ClothesColor.Black, Hair.Gentleman, HairColor.Brown)),
            new Riddhi({ position: new Vector(52, 22)}, this, Character.Character5, new Outfit(Clothes.Basic, ClothesColor.Pink, Clothes.Pants, ClothesColor.Pink, Clothes.Shoes, ClothesColor.White, Hair.ExtraLong, HairColor.Black)),
            new OldSailor({ position: new Vector(16, 49)}, this, Character.Character3, new Outfit(Clothes.Sailor, ClothesColor.BlueLight, Clothes.Pants, ClothesColor.Blue, Clothes.Shoes, ClothesColor.Black, Hair.Buzzcut, HairColor.Grey)),
        ]

        this.camera = new Camera(
			this.player,
			new Vector(TownMap.SIZE * Tile.SIZE, TownMap.SIZE * Tile.SIZE),
			new Vector(CANVAS_WIDTH, CANVAS_HEIGHT),
		)

        this.size = TownMap.SIZE
        this.playerSpawnPosition = new Vector(TownMap.PLAYER_SPAWN_POSITION.x, TownMap.PLAYER_SPAWN_POSITION.y);
        this.exits = [this.farmPath, TownMap.SHOP_PATH, TownMap.VINCENT_HOUSE_PATH, TownMap.YANO_RIDDHI_HOUSE_PATH, TownMap.NOAH_CARSON_HOUSE_PATH, TownMap.BREANNA_CINDY_HOUSE_PATH, TownMap.VIK_HOUSE_PATH, TownMap.NIPREET_JORDAN_HOUSE_PATH, TownMap.KEVIN_SOPHIA_HOUSE_PATH];
        this.inspectables = [
            new Inspectable(new Vector(1, 2) , new Vector(13, 20), 'This scarecrow looks scary, weird they\'d put it in a park'),
            new Inspectable(new Vector(2, 2) , new Vector(25, 4), 'The Town Hall is Locked. You cannot enter.'),
            new Inspectable(new Vector(2, 2) , new Vector(43, 4), 'The old shop is dangerous you can\'t enter.'),
            new Inspectable(new Vector(1, 2) , new Vector(56, 3), 'The Greenhouse is locked. You cannot enter.'),
            new Inspectable(new Vector(1, 1) , new Vector(8.5, 34), 'It\'s a doghouse, no dog inside it though.'),
            new Inspectable(new Vector(1,2), new Vector(1, 33), 'The flyer says \"Aye, hear this call! Assistance needed, a stone\'s throw from the briny deep.\"')
        ];
        this.music = TownMap.MUSIC;
    }

    changeFarm(map) {
        this.farmPath = new Path(new Vector(1, 1), new Vector(-1, 6), map);
        this.exits = [this.farmPath, TownMap.SHOP_PATH, TownMap.VINCENT_HOUSE_PATH, TownMap.YANO_RIDDHI_HOUSE_PATH, TownMap.NOAH_CARSON_HOUSE_PATH, TownMap.BREANNA_CINDY_HOUSE_PATH, TownMap.VIK_HOUSE_PATH, TownMap.NIPREET_JORDAN_HOUSE_PATH, TownMap.KEVIN_SOPHIA_HOUSE_PATH];
    }
}
