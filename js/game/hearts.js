/**
 * Create the heart group for the health bar.
 *
 *
 * */
function initHearts() {
    heartGroup = game.add.group();
    /**Create 10 heart sprites, and spread them across the screen*/
    for (i = 0; i < 10; i++) {
        x = 202 + (i * 40);
        y = 700;
        var c = heartGroup.create(0, 0, 'heart', 0);
        c.name = 'heart' + i;
        c.fixedToCamera = true;
        c.cameraOffset.setTo(x, 560 - 35 - 10);
        c.scale.setTo(.5, .5);

        c.frame = 1;
    }
}

/**
 * Check the current health of the player, then have the hearts show it
 *
 * */
function healthCheck() {
    healthToDisplay = player.health;
    // Animating alpha property of each item using forEach() method.

    heartGroup.forEach(function (item) {

        // Update alpha first.

        item.frame = 0;
        while (item.frame < 2 && healthToDisplay > 0) {
            item.frame++;
            // console.log(item.frame);
            healthToDisplay--;
        }

    });
    heartGroup.forEach(function (item) {
        while (item.frame < 4 && healthToDisplay > 0) {
            item.frame++;
            // console.log(item.frame);
            healthToDisplay--;
        }

    });

}
