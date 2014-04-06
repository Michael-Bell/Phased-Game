function CreatePlayer() {
// Enter Player 1
    player = game.add.sprite(75, 475, 'player'); // starting location
    player.anchor.setTo(.5, .5); // this lets us rotate/flip sprite in the middle of the sprite, if not set, it will rotate from top left corner
    game.physics.arcade.enable(player); // we need physics

    player.body.bounce.y = 0.1; // gives a slight bounce
    player.body.gravity.y = 400; // enable gravity
    /* TODO maybe we should have the player fall through the world, if you miss a jump, you fall and die? */
    player.body.collideWorldBounds = true; // our player cannot fall through the world

    player.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7); // setup animation

    player.health = 10; // health, not yet used

    player.inv = false; // player is not invunerable to start
    player.inv.time = 1000; // invunerable for 1 sec after damage taken
    player.body.immovable = false; // a test, enemies are pushing the player through the floor
    player.dmg = 1 + Math.floor(STR/10);
}


function playerControls() {
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
        player.frame = 11 ;// set player to jump sprite, removing for now, so jump animation plays only when jumping, not if falling
    }
    if (fire) {

        createBullet();
    }
}



function playerInv(){
    player.inv =false;
}