import Tile from "./Tile.js";

export default class Layer {
	static BOTTOM = 0;
	static LEDGE = 1;
	static COLLISION = 2;
	static FURNITURE = 3;
	static TOP = 4;

	/**
	 * A collection of tiles that comprises
	 * one layer of the map. The tiles are stored
	 * in a 1D array instead of a 2D array to make
	 * accessing an individual tile more efficient
	 * when the layers are thousands of tiles long.
	 *
	 * @param {object} layerDefinition
	 * @param {array} sprites
	 */
	constructor(layerDefinition, sprites) {
		this.tiles = Layer.generateTiles(layerDefinition.data, sprites);
		this.width = layerDefinition.width;
		this.height = layerDefinition.height;
	}

	render() {
		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {
				this.getTile(x, y)?.render(x, y);
			}
		}
	}

	/**
	 * The Y coordinate is multiplied by the map width
	 * to get us to the correct row, then the X coordinate
	 * is added to get us to the correct column in that row.
	 *
	 * @param {number} x
	 * @param {number} y
	 * @returns The Tile that lives at (x, y) in the layer.
	 */
	getTile(x, y) {
		return this.tiles[x + y * this.width];
	}

	setTile(x, y, newTileId) {
		this.tiles[x + y * this.width].id = newTileId
	}

	/**
	 * The Player can encounter wild Pokemon if they walk
	 * in the grass. As such, we have to have a way of
	 * checking if the current tile the player is standing
	 * on is a grass tile or not. This can later be updated
	 * as needed since encounters can occur in places like
	 * caves and in water as well.
	 *
	 * @param {number} x
	 * @param {number} y
	 * @returns Whenter the current tile is a grass tile or not.
	 */
	isTileGrass(x, y) {
		return this.getTile(x, y).id === Tile.GRASS;
	}

	/**
	 * @param {object} layerData The exported layer data from Tiled.
	 * @param {array} sprites
	 * @returns An array of Tile objects.
	 */
	static generateTiles(layerData, sprites) {
		const tiles = [];
		layerData.forEach((tileId) => {
			// Tiled exports tile data starting from 1 and not 0, so we must adjust it.
			tileId--;

			// -1 means there should be no tile at this location.
			const tile = tileId === -1 ? null : new Tile(tileId, sprites);

			tiles.push(tile);
		});

		return tiles;
	}
}
