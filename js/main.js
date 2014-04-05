/*  Console.log() are used to see how far into the script the game goes before crashing*/

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'Game', {
    preload: preload,
    create: create,
    update: update,
    render: render
});
//Various Variables, some are not even used, some are important, some are repetative, and some are essential, I don't really remember which are which
var shotDelayTime = 10;
var shotDelay;
var doublejump = 0;
var jumpCount = 0;
var Credits;
var player;
var bullets;
var gold = 0;

var fireRate = 100;

var nextFire = 0;

var bulletTime = 0;
function preload() {

    console.log('preload start');
    // Load Assets
    game.load.image('sky', 'assets/sky.png');
    game.load.image('ground', 'assets/ground.png');
    game.load.image('bullet', 'assets/key_blue.png');
    game.load.spritesheet('player', 'assets/character/sheet/sprite.png', 75, 96, 12);
    game.load.spritesheet('fly', 'assets/enemies/flysheet.png', 69, 32, 3);
    game.load.image('button', 'assets/play_again.png');

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
    sky = game.add.sprite(0, 0, 'sky');
    sky.scale.setTo(10, 2);
    CreatePlatform();
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

    /* TODO Work on Enemy function, allows you to enter parameters to set where the enemy will spawn, and the min/max height as well as speed it travels at */
    GenerateEnemy();
    console.log('createdone');

}

function update() {

    game.physics.arcade.collide(player, ground); // Player cannot go through ground
    game.physics.arcade.collide(player, flya, collisionHandler, null, this); // collisionHandler is called when player and flya(enemy) collide
    /* TODO create enemy group, give it a better name than flya */
    game.physics.arcade.collide(flya, bullets, bulletenemy, null, this); // calls bulletenemy function when bullet hits flya
    /* TODO make collisionHandler awesome and have it handle all collisions */

    player.body.velocity.x = 0;
    game.camera.y = player.y - 200;
    game.camera.x = player.x - 500; // Hacky camera following
    /* TODO I saw a camera.follow function in the docs, see if its better at following the sprites */

    if (flya.health > 0) { //is the flya alive
        flya.animations.play('fly')  //if flya is alive, animate with flying animation
        if (flya.y >= 700) //  is flya  above 700px on the map
            flya.direction = false;
        else if (flya.y <= 200) // is flya under 200px on the map
            flya.direction = true;
        if (flya.direction) { // switch flya velocity depending on direction bool
            flya.body.velocity.setTo(0, 100);
        } else {
            flya.body.velocity.setTo(0, -100);
        }
    } else { // if flya is dead
        flya.frame = 0; // set to dead frame
        flya.body.velocity.setTo(0, 500) //flya fly up fast, or down, I can't remember
    }
    /* TODO move to enemy.js, also make it generic to a enemy group,  */

    /* TODO Move all keychecking to player.js*/
    if (shootKey.isDown) { // is the S key pressed
        fire = true;
    } else if (shootKey.justReleased) { //if S key is released
        fire = false;
    }
    if (cursors.left.isDown) { //left arrow pressed
        player.body.velocity.x = -150; //set velocity
        player.animations.play('walk'); // play walking animation

        if (player.scale.x === 1) // is the sprite facing right?
            player.scale.x *= -1; // face left
    } else if (cursors.right.isDown) {
        player.body.velocity.x = 150;

        if (player.scale.x === -1)
            player.scale.x *= -1;

        player.animations.play('walk');
    } else {
        player.frame = 0;
    }
    cursors.up.onDown.add(jumpCheck, this);
    if (player.body.touching.down) { //is the player sprite touching another object on bottom?
        jumpCount = 0; // reset jump counter
        player.body.angularVelocity = 0; // stop spinning
        player.angle = 0; // stand up straight

    } else { // if not on the ground
        /* TODO see if you like this or not, remove this else statement, or remove the frame set in jumpCheck()*/
       player.frame = 11 // set player to jump sprite, removing for now, so jump animation plays only when jumping, not if falling
    }
    if (fire) {

        createBullet();
    }
}
jumpCheck = function () { // lovely function to see if you can jump
    if (jumpCount < 2) { // if less than 2 jumps on the counter
        jumpCount++; // add a jump
        player.frame = 11; //set the jump frame(may be redundant?)
        // Why is this not working?
        jump(jumpCount); // tell the player to jump, pass along the number of jumps so player knows whether to double jump
    }

}
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
                bullet.body.velocity.x = -100;
            } else {
                bullet.body.velocity.x = 100;
                bullet.scale.x = 1;

            }

            bulletTime = game.time.now + 150; // something to do with the shooting timer

        }

    }

}

function jump(number) {
    player.body.velocity.y = -350 // 0,0 is top left of map, so -velocity sends you up, also there is gravity, so it brings you down
    if (number == 2) {// is this a double jump
        player.body.velocity.y = -250-DEX;
        player.body.angularVelocity = -200; // start spinning

    }
    
}


function render() {

    // Sprite debug info

    game.debug.spriteInfo(player, 32, 32);

}

function collisionHandler(player, collidingObject) {
// a way to kill the player, see the to do higher up on the page

    if (player.health <= 0) {
        player.kill();
        dead();
    } else {
        player.health = 10;
    }

    if (collidingObject.frame == 17)collidingObject.kill();


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

function bulletenemy(flya, bullet) {
    /* TODO merge this with collisionhandler*/
    if (flya.health > 1) {
        flya.health--;
    } else {
        flya.kill();// destroy enemy sprite
        collectgold(5);//TODO possibly a collectgold and xp universal for any way a flya could die
        currentxp=+0.5;
    }
    bullet.kill(); // destroy bullet sprite

}


function resetBullet(bullet) {


    bullet.kill();


}

