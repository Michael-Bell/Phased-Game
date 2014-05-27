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
        game.load.spritesheet('snake', 'assets/enemies/snakesheet.png', 16, 6, 2);
        game.load.spritesheet('heart', 'assets/heart/red_spritesheet.png', 70, 70, 5);
        game.load.image('goldcoin', 'assets/goldcoin.png');
        game.load.image('tnt', 'assets/tnt.png');
        game.load.image('tiles', 'assets/map/groundSprite.png');
        game.load.image('coinBox', 'assets/bonus.png');
        game.load.image('endblock', 'assets/ground_sand.png');
        //game.load.image('smoke','assets/smoke.png');
        game.load.image('particle', 'assets/particle.png');
        game.load.audio('sfx', [ 'assets/sfx/sfx.ogg' ]);

        game.load.tilemap('level1', 'assets/map/1-1.json', null, Phaser.Tilemap.TILED_JSON);
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

var bulletCollisionGroup;
var jumpCount = 0;

var player;
var bullets;


var map;
var bgColor = 0x4488cc;
var layer;
var rain,donutRain;
var bulletLifespan = 1000; //time for bullets to live in milliseconds
var explosionEmitter;
var currentgold = 0;
var deadQuote = 'You tried your best, but you have perished. Better luck next time. You were killed by ';
var winQuote = "You Completed the level. Congrats on making it this far, maybe you should play a good game now, like League or something....";
var playerCollisionGroup;
var coinCollisionGroup;
var maxHealth;
var jumpVelocity=600;
var allowedjumps =2;
//var levelTime=2*60*60;//2minutes*60Seconds*60updates/second
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
    bulletCollisionGroup = game.physics.p2.createCollisionGroup();
    playerCollisionGroup = game.physics.p2.createCollisionGroup();
    coinCollisionGroup = game.physics.p2.createCollisionGroup();
    initEnemy(); // setup enemy Group

    tileGen();

    CreatePlayer();
    bulletInit();
    animateEnemies(); // Need some movement
    //player.body.collides(coinCollisionGroup, playerCoins,this);


    cursors = game.input.keyboard.createCursorKeys();
    shootKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
    pauseKey = game.input.keyboard.addKey(Phaser.Keyboard.P);
    _Q = game.input.keyboard.addKey(Phaser.Keyboard.Q);
    _W = game.input.keyboard.addKey(Phaser.Keyboard.W);
    _E = game.input.keyboard.addKey(Phaser.Keyboard.E);
    _R = game.input.keyboard.addKey(Phaser.Keyboard.R);

    fdas = new Phaser.Physics.P2.BodyDebug(game, player);


    /* TODO Work on Enemy function, allows you to enter parameters to set where the enemy will spawn, and the min/max height as well as speed it travels at DONE*/

    initHearts(); // Setup the heart Group, make it locked into the camera frame
    initCoinGroup();


    createRain();

    initHealthRegen();

    explosionEmitter = game.add.emitter(0, 0, 100);
    explosionEmitter.makeParticles('particle');
    explosionEmitter.minParticleSpeed.setTo(-400, -400);
    explosionEmitter.maxParticleSpeed.setTo(400, 400);
    explosionEmitter.gravity = 0;

    fx = game.add.audio('sfx');
    //	And this defines the markers.
    //	They consist of a key (for replaying), the time the sound starts and the duration, both given in seconds.
    //	You can also set the volume and loop state, although we don't use them in this example (see the docs)
    fx.addMarker('shoot', 0, 1.7,.3);
    fx.addMarker('bulletExplode',1.7,0.062);


    gencoins(200, 700, 2);
    gencoins(200, 700, 2);
    gencoins(200, 700, 2);
    gencoins(200, 700, 2);
    console.log('createdone');
    $('#OpenStore').removeClass('disabled');
    //Listener to react to store button click
    $('#OpenStore').on('click', Foundation.utils.debounce(function(e){
        //Pause the game
        game.paused = true;
        //disable key logger from game
        game.input.keyboard.disabled = true;
        //Update Store Stats Panels
        updateStore();
        //Hide the Main Window Contents
        $('#mainContent').addClass('hide');
        //show the store window
        $('#storeWindow').removeClass('hide');
        //Make the Animation
        resumeAni();
    }, 300, true));

    bombInit();

    // if you don't need to use the next line, keep it commented out
    game.time.advancedTiming = true
}

function updateGame() {
    rotateEnemies();
    textUpdate();
    coinBounce();
    knockback();
    leveltimer(0);
    //rotateEnemies();
    player.body.velocity.x = 0;  //Remove for Ice level
    //game.camera.y = player.y - 200;
    //game.camera.x = player.x - 500; // Hacky camera following
    game.camera.follow(player);

    healthCheck();
    xpcheck();
    playerControls.call(this);
/*    levelTime--;
    if(levelTime<0){
        player.health=-3;
        dead('running out of time');
    }*/
}
jumpCheck = function () { // lovely function to see if you can jump
    if (jumpCount < allowedjumps) { // if less than 2 jumps on the counter
        jumpCount++; // add a jump
        player.frame = 11; //set the jump frame(may be redundant?)
        // Why is this not working?
        jump(jumpCount); // tell the player to jump, pass along the number of jumps so player knows whether to double jump
    }

};

function jump(number) {
    if(number===1){       //This makes the jump=1 after you are off the ground instead of instantly resetting back to 0.
        game.time.events.add(Phaser.Timer.SECOND * .1, firstJump, this);
    }
    player.body.moveUp(jumpVelocity); // 0,0 is top left of map, so -velocity sends you up, also there is gravity, so it brings you down
    if (number>=2) { // is this a double jump
        player.body.moveUp(jumpVelocity + DEX);
        player.body.rotateLeft(150); // start spinning

    }

}

function firstJump(){  //For the timer so you don't get a triple jump.
    jumpCount=1;
}
var score;
function render() {

    game.debug.text(game.time.fps, 32, 32 );
    //game.debug.text(Math.floor(levelTime/60),32,128);//inaccurate timer

}

function resetItems(restart) {

    QAmmo.SHOT_DELAY = 3000; // milliseconds (10 bullets/second)
    QAmmo.BULLET_SPEED = 250; // pixels/second
    QAmmo.NUMBER_OF_BULLETS = 10;
    QAmmo.enabled=true;
    WAmmo.SHOT_DELAY = 3000; // milliseconds (10 bullets/second)
    WAmmo.BULLET_SPEED = 250; // pixels/second
    WAmmo.missileLifespan=500;
    WAmmo.enabled=false;
    WAmmo.cost=500;
    EAmmo.SHOT_DELAY = 1000*4; // 6 seconds
    EAmmo.missileLifespan=2500;
    EAmmo.enabled=false;
    EAmmo.NUMBER_OF_BULLETS=20;
    EAmmo.Splashrange=70*3.5;
    EAmmo.hitrange = 70*2;
    EAmmo.cost=750;
    maxHealth=10
    jumpVelocity=600

    allowedjumps = 2;
    if (restart) {
        gameLevel.int = 1;
        gameLevel.string = 'level1';
        currentgold = Math.floor(currentgold / 10); // lets not be mean, lets give them some of their gold back
    }

}
function dead(cause) { // you died :(
     showScores();
    if (player.health < 2) {

        score = getScore(1);
        $("#winDeathHeader").text('You Died');
        $("#quote").text(deadQuote + cause);
        $('#submit').removeClass('hide');
        $('#restart').removeClass('hide');
        $('#continue').addClass('hide');
        resetItems(true);
    }
    else {
        console.log("else" + gameLevel.int + gameLevel.max);
        if (gameLevel.int === gameLevel.max) {
            console.log(gameLevel);
            $("#winDeathHeader").text('You Win');
            resetItems(true);
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
    $("#goldBox").text(currentgold);
    $("#xpBox").text(currentxp);
    $('#scoreModal').foundation('reveal', 'open');
}


function levelComplete(player, block) {
    dead();
}
//}


function deadStateCreate() {
    game.stage.backgroundColor = bgColor; // This is making the background red instead of a sky

}

leveltimer(15000); //what is this???
function leveltimer(time) { // oh, is this your level timer?
    if (time != 0) {// ok, so you call it once, but it sets an internal var and doesnt even return a value?
        ltimer = time;// ummm ok, phaser has a built in timer function, you should probably be using that...
    }// i put a innacurate timer in, its commented out because it is costly and is lag inducing.
    ltimer--;
}

function getScore(bonus) {
    return Math.floor((Math.floor(currentgold * LUK / 10) + Math.floor(currentxp * INT / 10) + STR + DEX) * bonus);
}

function invGravity() {
    player.body.gravity.y = -1 * player.body.gravity.y;
}


function particleBurst(item) {
    //  Position the emitter where the mouse/touch event was
    explosionEmitter.x = item.x;
    explosionEmitter.y = item.y;
    //  The first parameter sets the effect to "explode" which means all particles are emitted at once
    //  The second gives each particle a 2000ms lifespan
    //  The third is ignored when using burst/explode mode
    //  The final parameter (10) is how many particles will be emitted in this single burst
    explosionEmitter.start(true, 250, null, 50);
    fx.play('bulletExplode');
}

resetItems();