/**
 * Patchwork Paradise
 *
 * By: Cristiano Fazi(https://github.com/Cristiano-Fazi) and Kevin Baggott(https://github.com/kbaggott1)
 *
 * Patchwork Paradise is a game as much about exploration as it is about farming. Allow yourself to enjoy
 * the experience of growing a large variety of crops as well as exploring the nearby town of patchwork 
 * paradise. Upgrade your farm to have more farmable land and speak with the people of the town, go on quests
 * for them and get rewarded.
 *
 * Asset sources
 * Sprites: Shubibubi (https://shubibubi.itch.io/)
 * 
 * Music: 
 * 		Once In Paris: Pumpupthemind (https://pixabay.com/music/search/once%20in%20paris/)
 * 		Lofi Music to Study and Relax to: SouldProdMusiv (https://pixabay.com/music/search/close-study-relax-chillhop-calm-study-lofi/)
 * 		Empty Mind: Lofi Hour (https://pixabay.com/music/search/empty-mind/)
 * 
 * Sound Effects:
 * 		Hoeing Effect: Minecraft (https://www.youtube.com/watch?v=EOF2-GK3-70)
 * 		Coin Sound Effect: Pixabay (https://pixabay.com/sound-effects/search/coin/)
 * 		Menu Sounds Effects: relicastle (https://reliccastle.com/essentials/)
 */

import Game from "../lib/Game.js";
import {
	canvas,
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	context,
	fonts,
	images,
	keys,
	sounds,
	stateStack,
	timer,
} from "./globals.js";
import TitleScreenState from "./states/game/TitleScreenState.js"
import BlissardState from "./states/game/BlissardState.js";

// Set the dimensions of the play area.
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
canvas.setAttribute('tabindex', '1'); // Allows the canvas to receive user input.

// Now that the canvas element has been prepared, we can add it to the DOM.
document.body.appendChild(canvas);

const {
	images: imageDefinitions,
	fonts: fontDefinitions,
	sounds: soundDefinitions
} = await fetch('./config/assets.json').then((response) => response.json());

// Load all the assets from their definitions.
images.load(imageDefinitions);
fonts.load(fontDefinitions);
sounds.load(soundDefinitions);

// Add all the states to the state machine.
//stateStack.push(new TitleScreenState());
stateStack.push(new BlissardState(() => {stateStack.push(new TitleScreenState())}));
const game = new Game(stateStack, context, timer, CANVAS_WIDTH, CANVAS_HEIGHT);

// Focus the canvas so that the player doesn't have to click on it.
canvas.focus();

game.start();

// Add event listeners for player input.
canvas.addEventListener('keydown', event => {
	keys[event.key] = true;
});

canvas.addEventListener('keyup', event => {
	keys[event.key] = false;
});