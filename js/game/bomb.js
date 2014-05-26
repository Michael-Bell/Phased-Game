/**
 * Code to handle bombs
 */


var EAmmo={};
EAmmo.SHOT_DELAY = 1000*6; // 6 seconds
EAmmo.missileLifespan=2*1000;
EAmmo.enabled=false;
EAmmo.NUMBER_OF_BULLETS=20;
EAmmo.Splashrange=70*3.5;
EAmmo.hitrange = 70*2;
EAmmo.cost=750;



bombInit = function () {
    // Create an object pool of bullets
    this.bombPool = this.game.add.group();
    for (var i = 0; i < EAmmo.NUMBER_OF_BULLETS; i++) {
        // Create each bullet and add it to the group.
        var bullet = this.game.add.sprite(0, 0, 'tnt');
/*        bullet.scale.x=.5;
        bullet.scale.y=.5*/
        this.bombPool.add(bullet);

        //   console.log(bullet);
        // Set its pivot point to the center of the bullet
        bullet.anchor.setTo(0.5, 0.5);
        // Enable physics on the bullet
        game.physics.p2.enable(bullet, false); // we need physics
        bullet.body.fixedRotation = true;

        bullet.body.setCollisionGroup(bulletCollisionGroup);
        bullet.body.collides(tilesCollisionGroup);
        bullet.body.collides(enemyCollisionGroup);
        console.log(bullet);
        // Define constants that affect motion
        // Set its initial state to "dead".
        bullet.kill();
        bullet.events.onKilled.add(particleBurst, this);
        bullet.events.onKilled.add(bombExplode, bullet);

    }
};


function newBomb(){
    // Get a dead bullet from the pool
    var bullet = this.bombPool.getFirstDead();

    // If there aren't any bullets available then don't shoot
    if (bullet === null || bullet === undefined) return;

    // Revive the bullet
    // This makes the bullet "alive"
    bullet.revive();
    bullet.lifespan = EAmmo.missileLifespan;

    // Bullets should kill themselves when they leave the world.
    // Phaser takes care of this for me by setting this flag
    // but you can do it yourself by killing the bullet if
    // its x,y coordinates are outside of the world.
    bullet.checkWorldBounds = true;
    bullet.outOfBoundsKill = true;

    // Set the bullet position to the gun position.
    bullet.reset(player.x, player.y);

    // Shoot it


   // console.log(bullet);

nb=bullet;
}
var nb;


function bombExplode(){
console.log('80');
    enemyGroup.forEachAlive(function(enemy) {
        //console.log(enemy.health);
        if (game.math.distance(
            this.body.x, this.body.y,
            enemy.x, enemy.y) < EAmmo.hitrange){
            console.log(enemy);
            enemy.damage(6);
        }
        if (game.math.distance(
            this.body.x, this.body.y,
            enemy.x, enemy.y) < EAmmo.Splashrange) {
            enemy.damage(Math.floor(Math.random()*(3-1)+1));

            // Create an explosion
            //this.getExplosion(enemy.x, enemy.y);
        }

    }, this);
}



