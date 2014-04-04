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
}
