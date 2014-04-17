

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'Game', {
		preload : preload,
		create : create
	});

function preload() {

	//  Tilemaps are split into two parts: The actual map data (usually stored in a CSV or JSON file)

	//  and the tileset/s used to render the map.


	//  Here we'll load the tilemap data. The first parameter is a unique key for the map data.


	//  The second is a URL to the JSON file the map data is stored in. This is actually optional, you can pass the JSON object as the 3rd

	//  parameter if you already have it loaded (maybe via a 3rd party source or pre-generated). In which case pass 'null' as the URL and

	//  the JSON object as the 3rd parameter.


	//  The final one tells Phaser the foramt of the map data, in this case it's a JSON file exported from the Tiled map editor.

	//  This could be Phaser.Tilemap.CSV too.


	game.load.tilemap('level', 'assets/map/testMap.json', null, Phaser.Tilemap.TILED_JSON);

	//  Next we load the tileset. This is just an image, loaded in via the normal way we load images:


	game.load.image('tiles', 'assets/map/groundSprite.png');

}

var map;

var layer;

function create() {

	game.stage.backgroundColor = '#787878';

	map = game.add.tilemap("level");

      //  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)

    //  The second parameter maps this name to the Phaser.Cache key 'tiles'

    map.addTilesetImage('groundSprite', 'tiles');



    //  Creates a layer from the World1 layer in the map data.

    //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.

    layer = map.createLayer('ground');



    //  This resizes the game world to match the layer dimensions

    layer.resizeWorld();


}
