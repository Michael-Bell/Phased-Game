/*  Console.log() are used to see how far into the script the game goes before crashing*/

// Enable the rain
rain = true;






var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'Game', {
    preload: preload,
    create: create,
    update: update,
    render: render
});
//Various Variables, some are not even used, some are important, some are repetative, and some are essential, I don't really remember which are which


var jumpCount = 0;

var player;
var bullets;
var gold = 0;


var map;

var layer;



var bulletTime = 0;
function preload() {

    console.log('preload start');
    // Load Assets
    //game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/ground.png');
    game.load.image('bullet', 'assets/blue_bullet.png');
    game.load.spritesheet('player', 'assets/character/sheet/sprite.png', 75, 96, 12);
    game.load.spritesheet('fly', 'assets/enemies/flysheet.png', 69, 32, 3);
    game.load.spritesheet('heart', 'assets/heart/red_spritesheet.png', 70, 70, 5);
    game.load.image('goldcoin', 'assets/goldcoin.png');

    if(rain)loadRain();

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
    CreatePlatform();
    CreatePlayer();
    cursors = game.input.keyboard.createCursorKeys();
    shootKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
    pauseKey = game.input.keyboard.addKey(Phaser.Keyboard.P);


    bullets = game.add.group();

    bullets.enableBody = true;

    bullets.physicsBodyType = Phaser.Physics.ARCADE;



    for (var i = 0; i < 20; i++)

    {

        var b = bullets.create(0, 0, 'bullet');

        b.name = 'bullet' + i;

        b.exists = false;

        b.visible = false;

        b.checkWorldBounds = true;

        b.events.onOutOfBounds.add(resetBullet, this);

    }



    /* TODO Work on Enemy function, allows you to enter parameters to set where the enemy will spawn, and the min/max height as well as speed it travels at DONE*/

    initEnemy(); // setup enemy Group
    lotsOfEnemies(); // Place some enemies
    animateEnemies(); // Need some movement
    initHearts(); // Setup the heart Group, make it locked into the camera frame
    initCoinGroup();

    if(rain)createRain();
    
    initHealthRegen();
    
   gencoins(200, 700);
   gencoins(200, 700);
   gencoins(200, 700);
   gencoins(200, 700);
    console.log('createdone');

}


function update() {
   
   game.physics.arcade.collide(player, ground); // Player cannot go through ground
    game.physics.arcade.collide(coinGroup, ground); // delete this if you want the coins to go through the ground

    game.physics.arcade.overlap(player, enemyGroup, collisionHandler, null, this); // collisionHandler is called when player and flya(enemy) collide
    /* TODO create enemy group, give it a better name than flya */
    game.physics.arcade.overlap(enemyGroup, bullets, collisionHandler, null, this); // calls CollisionHandler function when bullet hits flya
    // TODO make collisionHandler awesome and have it handle all collisions - DONE For now
    coinBounce();
    player.body.velocity.x = 0;
    game.camera.y = player.y - 200;
    game.camera.x = player.x - 500; // Hacky camera following
    /* TODO I saw a camera.follow function in the docs, see if its better at following the sprites */
    healthCheck();


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
function createBullet() {

    /* TODO make bullets shoot slower */
    /* TODO why only disappear if shooting to left and not right? */

    if (game.time.now > bulletTime) // is it too soon to shoot again?
    {

        bullet = bullets.getFirstExists(false); // I have no idea, I think I copied this off of an example, I think it checks if there is a invisible bullet to use

        if (bullet) {

            bullet.reset(player.x + 6, player.y - 8); // place the bullet sprite over character

            if (player.scale.x === -1) { // check which direction the player is facing, make bullet face the same way and set velocity
                bullet.scale.x = -1;
                bullet.body.velocity.x = -150;
            } else {
                bullet.body.velocity.x = 150;
                bullet.scale.x = 1;

            }

            bulletTime = game.time.now + 150; // something to do with the shooting timer

        }

    }

}

function jump(number) {
    player.body.velocity.y = -350 ;// 0,0 is top left of map, so -velocity sends you up, also there is gravity, so it brings you down
    if (number === 2) {// is this a double jump
        player.body.velocity.y = -250-DEX;
        player.body.angularVelocity = -200; // start spinning

    }
    
}


function render() {

    // Sprite debug info
    //game.debug.spriteInfo(logo1, 32, 32);
   // game.debug.spriteInfo(player, 100, 32);
 game.debug.text("Time until event: " + game.time.events.duration.toFixed(0), 32, 64);

    game.debug.text("Next tick: " + game.time.events.next.toFixed(0), 32, 96);



}

function dead() { // you died :(
    /* TODO make a death screen with cool statistics on the game */
    x = game.camera.x + (game.width / 2);

    y = game.camera.y + (game.height / 2);
    button = game.add.button(x, y, 'button', actionOnClick, this, 1, 0, 2); // lets put a reset button in the center of the screen

}

function actionOnClick() {
    /* TODO this is going to cause bugs when we start putting in multiple game states */
    game.state.start(game.state.current); // reset the game, should be replaced with something more reliable
}



function resetBullet(bullet) {


    bullet.kill();


}

