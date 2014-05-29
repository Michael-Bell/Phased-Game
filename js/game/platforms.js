var tilesCollisionGroup;
var layer;
var specialLayer, specialCollisionGroup, endCollisionGroup;
var ff;
function tileGen() {
    map = game.add.tilemap(gameLevel.string);
    //  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
    //  The second parameter maps this name to the Phaser.Cache key 'tiles'
    //tileset = game.add.tileset('tiles');
    //tileset.setCollisionRange(0, tileset.total - 1, true, true, true, true);
    map.addTilesetImage('groundSprite', 'tiles');
    map.addTilesetImage('flysheet', 'fly');
    layer = map.createLayer('ground');
    //  Creates a layer from the World1 layer in the map data.
    //  A Layer is effectively like a Phaser.Sprite, so is added to the display list.
    map.setCollisionBetween(0, 8, true, layer);
    enemyCollisionGroup = game.physics.p2.createCollisionGroup();

    var tileObjects = game.physics.p2.convertTilemap(map, layer);
    tilesCollisionGroup = game.physics.p2.createCollisionGroup();
    for (var i = 0; i < tileObjects.length; i++) {
        var tileBody = tileObjects[i];
        tileBody.setCollisionGroup(tilesCollisionGroup);
        tileBody.collides(playerCollisionGroup);
        tileBody.collides(coinCollisionGroup);
        tileBody.collides(bulletCollisionGroup);
        tileBody.collides(enemyCollisionGroup);

    }
    specialCollisionGroup = game.physics.p2.createCollisionGroup();
    specialLayer = map.createLayer('special');
    map.setCollisionBetween(0, 8, true, specialLayer);
    //map.setTileIndexCallback(3, collideCoinbox, this);
    var specialObjects = game.physics.p2.convertTilemap(map, specialLayer);
    for (var i = 0; i < specialObjects.length; i++) {
        var specialBody = specialObjects[i];
        specialBody.setCollisionGroup(specialCollisionGroup);
        specialBody.collides(playerCollisionGroup);
        //specialBody.onBeginContact.add(collideCoinbox,specialBody);
    }


    //layer = game.add.tilemapLayer(0, 0, 640, 480, map.tiles, map, 0);
    //   flyLayer = map.createLayer('flies');

    //  And now we convert all of the Tiled objects with an ID of 34 into sprites within the coins group

    //   map.createFromObjects('flies', 0, 'fly', 0, true, false, enemyGroup);
    map.createFromObjects('enemy', 10, 'fly', 0, true, false, enemyGroup);
    map.createFromObjects('enemy', 11, 'fly', 0, true, false, enemyGroup);
    map.createFromObjects('enemy', 12, 'fly', 0, true, false, enemyGroup);
    map.createFromObjects('enemy', 14, 'snake', 0, true, false, enemyGroup);
    map.createFromObjects('enemy', 15, 'snake', 0, true, false, enemyGroup);

    enemyGroup.callAll('animations.add', 'animations', 'wings', [1, 2], 10, true);
    enemyGroup.callAll('animations.play', 'animations', 'wings');
    enemyGroup.callAll('animations.add', 'animations', 'slither', [1, 2], true);
    enemyGroup.callAll('animations.play', 'animations', 'slither');
    enemyGroup.goldWorth = 5;
    enemyGroup.forEach(function (item) {
        // Update alpha first.
        item.body.setCollisionGroup(enemyCollisionGroup);
        item.body.collides(bulletCollisionGroup, collisionHandler, this);
        item.body.collides(playerCollisionGroup);
        item.body.collides(tilesCollisionGroup);
        if(item.key==='fly') {
            item.dmg = 1;
            item.goldWorth = 5;
            item.xpWorth = 0.5;
            item.body.data.gravityScale = 1;
            item.revive(health = Math.floor(Math.random() * (3 - 1) + 1));
            item.events.onKilled.add(flyerCoinDrop, item);
            //enemyGroup.callAll('animations.add', 'animations', 'wings', [1, 2], 10, true); // Creates and plays animation
            //enemyGroup.callAll('animations.play', 'animations', 'wings');
            item.animations.add('fly', [1, 2]);
            item.animations.play('fly',10,true);
        }
        else if(item.key==='snake'){
            item.dmg = 2;
            item.goldWorth = 15;
            item.xpWorth = 2;
            item.body.data.gravityScale = 1;
            item.revive(health = Math.floor(Math.random() * (9 - 3) + 3));
            item.events.onKilled.add(flyerCoinDrop, item);
            item.animations.add('slither');
            item.animations.play('slither',10,true);
            item.scale.x=10;
            item.scale.y=10;
            console.log('a wild snake has appeared!');
            console.log(item);
        }
    });

    /*var
     coinBoxGroup = game.add.group();
     coinBoxGroup.enableBody = true;
     coinBoxGroup.physicsBodyType = Phaser.Physics.P2JS;



     //map.createFromObjects('special', 3, 'coinBox', 0, true, false, coinBoxGroup);

     coinBoxGroup.forEach(function (item) {
     // Update alpha first.
     item.body.immovable = true;
     item.body.static=true;
     item.body.setCollisionGroup(coinCollisionGroup);
     item.body.collides([coinCollisionGroup,playerCollisionGroup])
     });*/

    endCollisionGroup = game.physics.p2.createCollisionGroup();
    endLayer = map.createLayer('end');
    map.setCollisionBetween(0, 9, true, endLayer);
    var endObjects = game.physics.p2.convertTilemap(map, endLayer);
    for (var i = 0; i < endObjects.length; i++) {
        var specialBody = endObjects[i];
        specialBody.setCollisionGroup(endCollisionGroup);
        specialBody.collides(playerCollisionGroup);
        specialBody.onBeginContact.add(levelComplete);
    }
    /*

     bounceBlock = game.add.group();

     bounceBlock.enableBody = true;

     bounceBlock.physicsBodyType = Phaser.Physics.ARCADE;

     map.createFromObjects('special', 6, 'endblock', 0, true, false, bounceBlock);


     bounceBlock.forEach(function (item) {
     // Update alpha first.
     item.body.immovable = true;

     });
     */


    //   map.createFromObjects('flies', 2, 'fly', 0, true, false, enemyGroup);

    // map.createFromObjects('flies', 3, 'fly', 0, true, false, enemyGroup);


    //  This resizes the game world to match the layer dimensions
    layer.resizeWorld();
}

var asdf;
function collideCoinbox(Player, block) {
    asdf = block;
    if (player.y > block.y + 100) {   //If the player is underneath the coin box
        //console.log('BOX!');
        //console.log(block.y);
        map.removeTile(block.x / 70, block.y / 70, specialLayer);
        block.removeFromWorld();
        gencoins(block.x, block.y, 1);
        gencoins(block.x, block.y, 1);
        gencoins(block.x, block.y, 1);
        gencoins(block.x, block.y, 1);
        gencoins(block.x, block.y, 1);
        gencoins(block.x, block.y, 1);
        gencoins(block.x, block.y, 1);
        gencoins(block.x, block.y, 1);
        gencoins(block.x, block.y, 1);
    }
    //console.log(block.parent);
    //   block.removeFromWorld();
    /*
     if (touchingDown(block.sprite)) {
     block.kill();
     gencoins(block.x, block.y, 1);
     gencoins(block.x, block.y, 1);
     gencoins(block.x, block.y, 1);
     gencoins(block.x, block.y, 1);
     gencoins(block.x, block.y, 1);
     gencoins(block.x, block.y, 1);
     gencoins(block.x, block.y, 1);
     gencoins(block.x, block.y, 1);
     gencoins(block.x, block.y, 1);
     }
     */

}
