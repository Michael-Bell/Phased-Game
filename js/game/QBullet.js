/**
 * Code for normal bullets(Q)
 */

var QAmmo={};
// Define constants
QAmmo.SHOT_DELAY = 500; // milliseconds (10 bullets/second)
QAmmo.BULLET_SPEED = 250; // pixels/second
QAmmo.NUMBER_OF_BULLETS = 10;
QAmmo.enabled=true;



bulletInit = function () {
    // Create an object pool of bullets
    this.bulletPool = this.game.add.group();
    for (var i = 0; i < QAmmo.NUMBER_OF_BULLETS; i++) {
        // Create each bullet and add it to the group.
        var bullet = this.game.add.sprite(0, 0, 'bullet');
        this.bulletPool.add(bullet);
        //   console.log(bullet);
        // Set its pivot point to the center of the bullet
        bullet.anchor.setTo(0.5, 0.5);
        // Enable physics on the bullet
        game.physics.p2.enable(bullet, false); // we need physics

        // Enable physics on the missile
        bullet.body.data.gravityScale = 0;
        bullet.body.setCollisionGroup(bulletCollisionGroup);
        bullet.body.collides(tilesCollisionGroup, bulletWallColl, this);
        bullet.body.collides(enemyCollisionGroup);
        console.log(bullet);
        // Define constants that affect motion
        QAmmo.SPEED = 250; // missile speed pixels/second
        QAmmo.TURN_RATE = 5; // turn rate in degrees/frame
        // Set its initial state to "dead".
        bullet.kill();
        bullet.events.onKilled.add(particleBurst, this);

    }
};


function normalBullet(){
    // Get a dead bullet from the pool
    var bullet = this.bulletPool.getFirstDead();

    // If there aren't any bullets available then don't shoot
    if (bullet === null || bullet === undefined) return;

    // Revive the bullet
    // This makes the bullet "alive"
    bullet.revive();
    bullet.lifespan = bulletLifespan;

    // Bullets should kill themselves when they leave the world.
    // Phaser takes care of this for me by setting this flag
    // but you can do it yourself by killing the bullet if
    // its x,y coordinates are outside of the world.
    bullet.checkWorldBounds = true;
    bullet.outOfBoundsKill = true;

    // Set the bullet position to the gun position.
    bullet.reset(player.x, player.y);

    // Shoot it
    if (player.scale.x < 0) {
        bullet.body.velocity.x = -QAmmo.BULLET_SPEED;
        bullet.scale.x = -1;
    }
    else {
        bullet.body.velocity.x = QAmmo.BULLET_SPEED;
        bullet.scale.x = 1;
    }
    bullet.body.velocity.y = 0;
    fx.play('shoot');

}
