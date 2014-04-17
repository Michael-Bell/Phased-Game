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
	map.addTilesetImage('flysheet', 'fly');
	//  Creates a layer from the World1 layer in the map data.
	//  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
	map.setCollisionBetween(0, 8);
	//layer = game.add.tilemapLayer(0, 0, 640, 480, map.tiles, map, 0);
	layer = map.createLayer('ground');
	flyLayer = map.createLayer('flies');

	//  And now we convert all of the Tiled objects with an ID of 34 into sprites within the coins group

	//   map.createFromObjects('flies', 0, 'fly', 0, true, false, enemyGroup);
	map.createFromObjects('flyObj', 10, 'fly', 0, true, false, enemyGroup);
  map.createFromObjects('flyObj', 11, 'fly', 0, true, false, enemyGroup);
  map.createFromObjects('flyObj', 12, 'fly', 0, true, false, enemyGroup);

    enemyGroup.callAll('animations.add', 'animations', 'wings', [1, 2], 10, true);
      enemyGroup.forEach(function(item) {
        // Update alpha first.
        item.dmg=1;
    });

        coinBoxGroup = game.add.group();
    coinBoxGroup.enableBody = true;
    coinBoxGroup.physicsBodyType = Phaser.Physics.ARCADE;
	map.createFromObjects('coin', 3, 'coinBox', 0, true, false, coinBoxGroup);
    coinBoxGroup.callAll('animations.add', 'animations', 'wings', [1, 2], 10, true);
    coinBoxGroup.forEach(function(item) {
        // Update alpha first.
        item.body.immovable = true;
    });





//  And play them

    enemyGroup.callAll('animations.play', 'animations', 'wings');

	//   map.createFromObjects('flies', 2, 'fly', 0, true, false, enemyGroup);

	// map.createFromObjects('flies', 3, 'fly', 0, true, false, enemyGroup);


	//  This resizes the game world to match the layer dimensions
	layer.resizeWorld();
}

var asdf;
function collideCoinbox(player,block){
asdf=block;
if(block.body.touching.down){
    block.kill();
    gencoins(block.x,block.y);
    gencoins(block.x,block.y);
    gencoins(block.x,block.y);
    gencoins(block.x,block.y);
    gencoins(block.x,block.y);
    gencoins(block.x,block.y);
    gencoins(block.x,block.y);
    gencoins(block.x,block.y);
    gencoins(block.x,block.y);
}



}