export default class Tile {
	static SIZE = 16;
	static GRASS = 149;//149 is the ID of the grass block in tiled but I honestly don't know if that's what this represents

	/**
	 * Represents one tile in a Layer and on the screen.
	 *
	 * @param {number} id
	 * @param {array} sprites
	 */
	constructor(id, sprites) {
		this.sprites = sprites;
		this.id = id;
	}

	render(x, y) {
		this.sprites[this.id].render(x * Tile.SIZE, y * Tile.SIZE);
	}
}
