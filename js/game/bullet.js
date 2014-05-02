function createBullet() {

    /* TODO Make bullets die when off camera */

    if (game.time.now > bulletTime)
    // is it too soon to shoot again?
    {
        //make a new bullet
        bullet = bullets.create(player.x, player.y - 6, 'bullet');
        bullet.events.onOutOfBounds.add(goodbye, this);
        //kill on exiting world
        // Saw a Camera Cull function, would this be better?
        bullet1 = bullet;
        //temp debugging variable, not needed

        if (player.scale.x > 0) {
            // check which direction the player is facing, make bullet face the same way and set velocity
            bullet.scale.x = 1;
            bullet.x = player.x + 15;
            bullet.body.velocity.x = 150;
        } else {
            bullet.body.velocity.x = -150;
            bullet.scale.x = -1;
            bullet.x = player.x - 15;

        }

        bulletTime = game.time.now + 300;
        // delay in ms till next shot can be fired


    }

}

// Deprecated function, no longer used
// was to create the bullet goup
function initBullets() {
    bullets = game.add.group();

    bullets.enableBody = true;

    bullets.physicsBodyType = Phaser.Physics.ARCADE;

}
var a;

// still used, probably removable
function goodbye(obj) {
    console.log(obj);
    obj.kill();
}

// testing function, is not working
function checkBullet() {
    bullets.forEach(function (item) {


        if (item.inCamera === false) {
            // if the item is not in camera...
            // kill the item...
            //  item.visible=false;
        }

    });
}
