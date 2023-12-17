import GameEntity from "../entities/GameEntity.js";
import { images } from "../globals.js";
import Sprite from "../../lib/Sprite.js";

export default class Outfit {
    static CLOTHING_ROW_LENGTH = 80
    static SPRITE_COLUMN_LENGTH = 49
    static HAIR_ROW_LENGTH = 112

    constructor(shirt, shirtColor, pants = null, pantsColor = null, shoes = null, shoesColor = null, hair = null, hairColor = null){
        this.shirt = this.intializeClothingSprites(shirt, shirtColor);

        if(pants != null){
            this.pants = this.intializeClothingSprites(pants, pantsColor);
        }

        if(shoes != null){
            this.shoes = this.intializeClothingSprites(shoes, shoesColor);
        }

        if(hair != null){
            this.hair = this.intializeHairSprites(hair, hairColor);
        }
    }
    
    intializeClothingSprites(clothing, color){
		let allClothingSprites = Sprite.generateSpritesFromSpriteSheet(
			images.get(clothing),
			GameEntity.WIDTH,
			GameEntity.HEIGHT,
		);
        let resultArray = [];
        let processedRow
        
        for(let i = 0; i < Outfit.SPRITE_COLUMN_LENGTH; i++) {
            processedRow = allClothingSprites.slice((i *  Outfit.CLOTHING_ROW_LENGTH) + color, (i * Outfit.CLOTHING_ROW_LENGTH) + 8 + color);
            resultArray = resultArray.concat(processedRow)
        }
        return resultArray
	}

    intializeHairSprites(clothing, color){
		let allClothingSprites = Sprite.generateSpritesFromSpriteSheet(
			images.get(clothing),
			GameEntity.WIDTH,
			GameEntity.HEIGHT,
		);
        let resultArray = [];
        let processedRow

        for(let i = 0; i < Outfit.SPRITE_COLUMN_LENGTH; i++) {
            processedRow = allClothingSprites.slice((i * Outfit.HAIR_ROW_LENGTH) + color, (i * Outfit.HAIR_ROW_LENGTH) + 8 + color);
            resultArray = resultArray.concat(processedRow)
        }
        return resultArray
	}
}