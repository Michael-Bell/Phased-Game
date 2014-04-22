/*  Console.log() are used to see how far into the script the game goes before crashing*/

// Enable the rain
rain = true;

var game = new Phaser.Game(800, 560, Phaser.CANVAS, 'Game', {
		preload : preload,
		create : create,
		update : update,
		render : render
	});
//Various Variables, some are not even used, some are important, some are repetative, and some are essential, I don't really remember which are which

//var gameState= function(game){};

//gameState.prototype = {
    var jumpCount = 0;

var player;
var bullets;


var map;

var layer;

var bulletTime = 0;
function preload() {

    console.log('preload start');
    // Load Assets
    //game.load.image('sky', 'assets/sky.png');
    //game.load.image('ground', 'assets/ground.png');
    game.load.image('bullet', 'assets/blue_bullet.png');
    game.load.spritesheet('player', 'assets/character/sheet/sprite.png', 75, 96, 12);
    game.load.spritesheet('fly', 'assets/enemies/flysheet.png', 69, 32, 3);
    game.load.spritesheet('heart', 'assets/heart/red_spritesheet.png', 70, 70, 5);
    game.load.image('goldcoin', 'assets/goldcoin.png');
    game.load.tilemap('level', 'assets/map/1-1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tiles', 'assets/map/groundSprite.png');
    game.load.image('coinBox', 'assets/bonus.png');
    game.load.image('endblock', 'assets/ground_sand.png');

    if (rain)
        loadRain();

    game.load.image('button', 'assets/play_again.png');
    //  Load the Google WebFont Loader script


    console.log('preloaddone');

}

/* TODO Abstract Code, I think thats what it's called, anyways move the code into small functions with descriptive names to make the main.js pretty */

function create() {
    console.log('createstart');

    //  Modify the world and camera bounds

    game.world.setBounds(0, 0, 8000, 1000);

    // Enable Physics
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //Background Image
    //sky = game.add.sprite(0, 0, 'sky');
    //sky.scale.setTo(10, 2);
    game.stage.backgroundColor = '#20894E'; // This is making the background red instead of a sky
    //CreatePlatform();
    initEnemy(); // setup enemy Group
    //	lotsOfEnemies(); // Place some enemies
    tileGen();
    animateEnemies(); // Need some movement

    CreatePlayer();
    cursors = game.input.keyboard.createCursorKeys();
    shootKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
    pauseKey = game.input.keyboard.addKey(Phaser.Keyboard.P);

    bullets = game.add.group();

    bullets.enableBody = true;

    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    for (var i = 0; i < 20; i++) {

        var b = bullets.create(0, 0, 'bullet');

        b.name = 'bullet' + i;

        b.exists = false;

        b.visible = false;

        b.checkWorldBounds = true;

        b.events.onOutOfBounds.add(resetBullet, this);

    }

    /* TODO Work on Enemy function, allows you to enter parameters to set where the enemy will spawn, and the min/max height as well as speed it travels at DONE*/

    initHearts(); // Setup the heart Group, make it locked into the camera frame
    initCoinGroup();

    if (rain)
        createRain();

    initHealthRegen();

    gencoins(200, 700, 1);
    gencoins(200, 700, 1);
    gencoins(200, 700, 1);
    gencoins(200, 700, 1);
    console.log('createdone');

}

function update() {
textUpdate();
    //game.physics.arcade.collide(player, ground); // Player cannot go through ground
    // game.physics.arcade.collide(coinGroup, ground); // delete this if you want the coins to go through the ground
    game.physics.arcade.collide(player, layer); // Player cannot go through ground
    game.physics.arcade.collide(player, coinBoxGroup, collideCoinbox, null, this);
    game.physics.arcade.collide(player, endBlocks, levelComplete, null, this);
    game.physics.arcade.overlap(bullets, layer, bulletWallColl, null, this);
    game.physics.arcade.collide(coinGroup, layer); // delete this if you want the coins to go through the ground
    game.physics.arcade.overlap(coinGroup, player, playerCoins, null, this);
    game.physics.arcade.overlap(player, enemyGroup, collisionHandler, null, this); // collisionHandler is called when player and flya(enemy) collide
    game.physics.arcade.collide(player, flyLayer, flyColl, null, this); // collisionHandler is called when player and flya(enemy) collide

    game.physics.arcade.overlap(enemyGroup, bullets, collisionHandler, null, this); // calls CollisionHandler function when bullet hits flya
    // TODO make collisionHandler awesome and have it handle all collisions - DONE For now
    coinBounce();
    knockback();
    player.body.velocity.x = 0;
    //game.camera.y = player.y - 200;
    //game.camera.x = player.x - 500; // Hacky camera following
    game.camera.follow(player);

    /* TODO I saw a camera.follow function in the docs, see if its better at following the sprites */
    healthCheck();
    xpcheck();
    playerControls.call(this);
}
jumpCheck = function () { // lovely function to see if you can jump
    if (jumpCount < 2) { // if less than 2 jumps on the counter
        jumpCount++; // add a jump
        player.frame = 11; //set the jump frame(may be redundant?)
        // Why is this not working?
        jump(jumpCount); // tell the player to jump, pass along the number of jumps so player knows whether to double jump
    }

};

function jump(number) {
    player.body.velocity.y = -350; // 0,0 is top left of map, so -velocity sends you up, also there is gravity, so it brings you down
    if (number === 2) { // is this a double jump
        player.body.velocity.y = -250 - DEX;
        player.body.angularVelocity = -125; // start spinning

    }

}

function render() {

    // Sprite debug info
    //	game.debug.bodyInfo(player, 32, 32);
    game.debug.body(player);
    // game.debug.spriteInfo(item, 32, 32);
    //game.debug.text("Time until event: " + game.time.events.duration.toFixed(0), 32, 64);

    //game.debug.text("Next tick: " + game.time.events.next.toFixed(0), 32, 96);

}

function dead() { // you died :(
    /* TODO make a death screen with cool statistics on the game */
    x = game.camera.x + (game.width / 2);

    y = game.camera.y + (game.height / 2);
    $('#highscores').foundation('reveal', 'open');

}

function actionOnClick() {
    /* TODO this is going to cause bugs when we start putting in multiple game states */

}

function resetBullet(bullet) {

    bullet.kill();

}

function flyColl() {
    alert('col');
}


function levelComplete(player, block) {
    $('#level').foundation('reveal', 'open');
}
//}

var pausedState= function(game){};

pausedState.prototype = {

}
