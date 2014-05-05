/*  Console.log() are used to see how far into the script the game goes before crashing*/

/** Create the Game Object*/
var game = new Phaser.Game(800, 560, Phaser.CANVAS, 'Game');
//Various Variables, some are not even used, some are important, some are repetative, and some are essential, I don't really remember which are which

/** Contains information on current level */
gameLevel = {string: 'level1', int: 1, max: 3};

/** create the Gamestate object*/
Game = {};

/** Preloading State */
Game.Pre = function (game) {
};

Game.Pre.prototype = {
    preload: function () {
        console.log('preload start');
        // Load Assets
        game.load.image('bullet', 'assets/bullet.png');
        game.load.spritesheet('player', 'assets/character/sheet/sprite.png', 75, 96, 12);
        game.load.spritesheet('fly', 'assets/enemies/flysheet.png', 69, 32, 3);
        game.load.spritesheet('heart', 'assets/heart/red_spritesheet.png', 70, 70, 5);
        game.load.image('goldcoin', 'assets/goldcoin.png');
        game.load.image('tiles', 'assets/map/groundSprite.png');
        game.load.image('coinBox', 'assets/bonus.png');
        game.load.image('endblock', 'assets/ground_sand.png');
        game.load.tilemap('level1', 'assets/map/1-1-t.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level2', 'assets/map/1-2.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('level3', 'assets/map/1-3.json', null, Phaser.Tilemap.TILED_JSON);

        loadRain();


        this.load.onFileComplete.add(function (progress) {
            console.log(progress);
            $('#meter').css('width', progress + '%');
            if (progress === 100) {
                $('.prog').addClass('hide');
                $('#Game').removeClass('hide');
                game.state.start('main')
            }
        });
        console.log('preloaddone');

    }
};

game.state.add('pre', Game.Pre);
game.state.start('pre');

Game.main = function (game) {
};

Game.main.prototype = {
    create: function () {
        createGame();
    },
    update: function () {
        updateGame();
    },
    render: function () {
        render()
    }
};

game.state.add('main', Game.main);

Game.dead = function (game) {
};

Game.dead.prototype = {

    create: function () {
        deadStateCreate();
    }
};

game.state.add('dead', Game.dead);


var jumpCount = 0;

var player;
var bullets;


var map;
var bgColor=0x20894E;
var layer;

var bulletTime = 0;
var deadQuote = 'You tried your best, but you have perished. Better luck next time. You were killed by ';
var winQuote = "You Completed the level. Congrats on making it this far, maybe you should play a good game now, like League or something....";
var playerCollisionGroup;
var coinCollisionGroup;

/** @todo Abstract Code, I think thats what it's called, anyways move the code into small functions with descriptive names to make the main.js pretty */

function createGame() {
    console.log('createstart');

    //  Modify the world and camera bounds

    game.world.setBounds(0, 0, 8000, 1000);

    // Enable Physics
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.gravity.y = 1000;
    game.physics.p2.setImpactEvents(true);


    game.stage.backgroundColor = bgColor; // This is making the background red instead of a sky
    //CreatePlatform();
    //Background Image
    //sky = game.add.sprite(0, 0, 'sky');
    //sky.scale.setTo(10, 2);
    game.physics.p2.updateBoundsCollisionGroup();
     playerCollisionGroup = game.physics.p2.createCollisionGroup();
     coinCollisionGroup = game.physics.p2.createCollisionGroup();

    tileGen();

    CreatePlayer();
    initEnemy(); // setup enemy Group

    animateEnemies(); // Need some movement
    //player.body.collides(coinCollisionGroup, playerCoins,this);


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


    createRain();

    initHealthRegen();

    gencoins(200, 700, 2);
    gencoins(200, 700, 2);
    gencoins(200, 700, 2);
    gencoins(200, 700, 2);
    console.log('createdone');

}

function updateGame() {
    textUpdate();
    //game.physics.arcade.collide(player, ground); // Player cannot go through ground
    // game.physics.arcade.collide(coinGroup, ground); // delete this if you want the coins to go through the ground
 /*   game.physics.arcade.overlap(player, layer); // Player cannot go through ground
    game.physics.arcade.collide(player, layer); // Player cannot go through ground
    game.physics.arcade.collide(player, coinBoxGroup, collideCoinbox, null, this);
    game.physics.arcade.collide(player, endBlocks, levelComplete, null, this);
    game.physics.arcade.collide(bullets, layer, bulletWallColl, null, this);
    game.physics.arcade.collide(coinGroup, layer); // delete this if you want the coins to go through the ground
    game.physics.arcade.overlap(coinGroup, player, playerCoins, null, this);
    game.physics.arcade.overlap(player, enemyGroup, collisionHandler, null, this); // collisionHandler is called when player and flya(enemy) collide
    game.physics.arcade.collide(player, flyLayer, flyColl, null, this); // collisionHandler is called when player and flya(enemy) collide
    game.physics.arcade.collide(player, bounceBlock, invGravity, null, this);
    game.physics.arcade.overlap(enemyGroup, bullets, collisionHandler, null, this); // calls CollisionHandler function when bullet hits flya
   */ // TODO make collisionHandler awesome and have it handle all collisions - DONE For now
    coinBounce();
    knockback();
    leveltimer(0);
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
    player.body.moveUp(900); // 0,0 is top left of map, so -velocity sends you up, also there is gravity, so it brings you down
    if (number === 2) { // is this a double jump
        player.body.moveUp(900+DEX);
      player.body.rotateLeft(150); // start spinning

    }

}
var score;
function render() {

    // Sprite debug info
    game.debug.bodyInfo(player, 32, 32);
    game.debug.body(player);
    // game.debug.spriteInfo(item, 32, 32);
    //game.debug.text("Time until event: " + game.time.events.duration.toFixed(0), 32, 64);

    //game.debug.text("Next tick: " + game.time.events.next.toFixed(0), 32, 96);

}

function dead(cause) { // you died :(
    /* TODO make a death screen with cool statistics on the game */

    showScores();
    if (player.health < 2) {
        score = getScore(1);
        $("#winDeathHeader").text('You Died');
        $("#quote").text(deadQuote + cause);
        $('#submit').removeClass('hide');
        $('#restart').removeClass('hide');
        $('#continue').addClass('hide');
        console.log('dead');
    }
    else {
        console.log("else" + gameLevel.int + gameLevel.max)
        if (gameLevel.int === gameLevel.max) {
            console.log(gameLevel);
            $("#winDeathHeader").text('You Win');

            score = getScore(1.3);
            $("#quote").text(winQuote);
            $('#submit').removeClass('hide');
            $('#restart').removeClass('hide');
            $('#continue').addClass('hide');
        }
        else {
            $("#winDeathHeader").text('Level Complete');
            $("#quote").text("You Won Level " + gameLevel.int);
            gameLevel.int++;
            gameLevel.string = 'level' + gameLevel.int;
            console.log(gameLevel.string + "    " + gameLevel.int);
            $('#submit').addClass('hide');
            $('#restart').addClass('hide');
            $('#continue').removeClass('hide');
            console.log('win');
        }


    }

    game.input.keyboard.disabled = true; // disable control listeners
    game.state.start('dead');
    $("#scoreBox").text(score);
    $("#score2").text(score);
    $("#goldBox").text(player.gold);
    $("#xpBox").text(currentxp);
    $('#scoreModal').foundation('reveal', 'open');
}


function resetBullet(bullet) {

    bullet.kill();

}

function flyColl() {
    alert('col');
}


function levelComplete(player, block) {
    dead();
}
//}


function deadStateCreate() {
    game.stage.backgroundColor = bgColor; // This is making the background red instead of a sky

}

leveltimer(15000);
function leveltimer(time) {
    if (time != 0) {
        ltimer = time;
    }
    ltimer--;
}

function getScore(bonus) {
    return Math.floor((Math.floor(player.gold * LUK / 10) + Math.floor(currentxp * INT / 10) + STR + DEX) * bonus);
}

function invGravity() {

    player.body.gravity.y = -1 * player.body.gravity.y;
    ;

}