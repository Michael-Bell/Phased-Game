var layer;
function CreatePlatform() {
	//Add the platforms
	/* TODO Just make a map in Tiled or something and import it in with tileset or something, be way easier */
	/* TODO Moving Platforms... */
	ground = game.add.group(); // using a group
	ground.enableBody = true;

	for (var i = 0; i < 3; i++) {
		var block = ground.create((5 * 70) + i * 70, 600 - 400, 'ground'); // Dirty math hack to shift over blocks
		block.body.immovable = true;

	}
	for (var i = 0; i < 125; i++) {
		var block = ground.create(+i * 70, 800, 'ground'); // Dirty math hack to shift over blocks
		block.body.immovable = true;

	}
	for (var i = 0; i < 3; i++) {
		var block = ground.create(i * 70, 600 - 250, 'ground');
		block.body.immovable = true;

	}

}

function tileGen() {
	map = game.add.tilemap("level");
	//  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
	//  The second parameter maps this name to the Phaser.Cache key 'tiles'
	//tileset = game.add.tileset('tiles');
	//tileset.setCollisionRange(0, tileset.total - 1, true, true, true, true);
	map.addTilesetImage('groundSprite', 'tiles');
	//  Creates a layer from the World1 layer in the map data.
	//  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
	map.setCollisionBetween(0,8);
	//layer = game.add.tilemapLayer(0, 0, 640, 480, map.tiles, map, 0);
	layer = map.createLayer('ground');
	//  This resizes the game world to match the layer dimensions
	layer.resizeWorld();
}
