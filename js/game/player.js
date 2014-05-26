function CreatePlayer() {
    // Enter Player 1
    player = game.add.sprite(105, 932, 'player'); // starting location
    player.anchor.setTo(.5, .5); // this lets us rotate/flip sprite in the middle of the sprite, if not set, it will rotate from top left corner
    game.physics.p2.enable(player, false); // we need physics
    player.body.angularDamping = 1;

    player.body.setCollisionGroup(playerCollisionGroup);
    player.body.collides(tilesCollisionGroup);
    player.body.collides(coinCollisionGroup, playerCoins, this);
    player.body.collides(specialCollisionGroup, collideCoinbox, this);
    player.body.collides(enemyCollisionGroup, collisionHandler, this);
    player.body.collides(endCollisionGroup);
    player.body.fixedRotation = true;
    player.name = "player";
    /*    player.body.bounce.y = 0.1; // gives a slight bounce
     player.body.gravity.y = 400; // enable gravity*/
    /* TODO maybe we should have the player fall through the world, if you miss a jump, you fall and die? */
    //player.body.collideWorldBounds = true; // our player cannot fall through the world

    player.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 12); // setup animation
    player.scale.x = .9;
    player.scale.y = .9;
    player.health = 29; // health
    player.velocity = 200;
    player.jumpUp = 600;
    player.inv = false; // player is not invunerable to start
    player.inv.time = 1000; // invunerable for 1 sec after damage taken
    player.body.immovable = false; // a test, enemies are pushing the player through the floor
    player.dmg = 1 + Math.floor(STR / 10);
    player.healthRegen = true;
    player.knockedLeft = 0;
    player.knockedRight = 0;
    player.bulletType = 1;


}

/* TODO Add Acceleration to the game */
function playerControls() {
    QFire = _Q.isDown;
    WFire = _W.isDown;

        EFire=_E.isDown;

    if (cursors.left.isDown) { //left arrow pressed
        player.body.velocity.x = -player.velocity; //set velocity
        player.animations.play('walk'); // play walking animation


        player.scale.x = -.9; // face left
    } else if (cursors.right.isDown) {
        player.body.velocity.x = player.velocity;

        player.scale.x = .9;

        player.animations.play('walk');
    } else {
        player.frame = 0;
    }
    pauseKey.onDown.add(pause, this);
    cursors.up.onDown.add(jumpCheck, this);
    if (touchingDown(player)) { //is the player sprite touching another object on bottom?
        player.body.angularVelocity = 0; // stop spinning
        player.body.angle = 0; // stand up straight
        player.healthRegen = true;  //turn healing back on
        game.time.events.add(Phaser.Timer.SECOND * .1, groundReset, this);


    } else { // if not on the ground
        /*   TODO see if you like this or not, remove this else statement, or remove the frame set in jumpCheck()*/
        player.frame = 11; // set player to jump sprite, removing for now, so jump animation plays only when jumping, not if falling
    }
    if (QFire) {

        if(canShoot(QAmmo)){
            normalBullet();
        }

    }
    if (WFire) {

        if(canShoot(WAmmo)){
            game.add.existing(
                new Missile(game, player.x,player.y)
            );
        }
    }
    if(EFire){
        if(canShoot(EAmmo)){
            newBomb();
        }
    }
    if (!player.inWorld) {
        player.health = -100;
        dead('falling out of the world!');
    }
}

function groundReset(){
    if (touchingDown(player)) { //If the player is STILL touching the ground. Ie. he did not bounce off an enemy
    jumpCount = 0; // reset jump counter
    player.velocity = 200;  //reset Veloctiy
    player.jumpUp = 600;  //reset Jump amount
}}

function playerInv() {
    player.inv = false;
}

function initHealthRegen() {
    //  A looped event is like a repeat event but with no limit, it will literally repeat itself forever, or until
    //  The first parameter is how long to wait before the event fires. In this case 1 second (you could pass in 1000 as the value as well.)
    //  The next two parameters are the function to call ('updateCounter') and the context under which that will happen.
    game.time.events.loop(Phaser.Timer.SECOND * 10, healthRegen, this);
}
function healthRegen() {
    if (player.health < 40 && player.healthRegen === true) {
        player.health++;
    }
}


function touchingDown(thing) {
    var yAxis = p2.vec2.fromValues(0, 1);
    var result = false;
    for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++) {
        var c = game.physics.p2.world.narrowphase.contactEquations[i];
        if (c.bodyA === thing.body.data || c.bodyB === thing.body.data) {
            var d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
            if (c.bodyA === thing.body.data) d *= -1;
            if (d > 0.5) result = true;
        }
    }
    return result;
}


function pause() {
    game.paused = !game.paused;
}