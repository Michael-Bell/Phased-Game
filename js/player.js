function CreatePlayer() {
// Enter Player 1
    player = game.add.sprite(75, 475, 'player');
    player.anchor.setTo(.5, .5);
    game.physics.arcade.enable(player);

    player.body.bounce.y = 0.1;
    player.body.gravity.y = 400;
    player.body.collideWorldBounds = true;
    player.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7);
    player.animations.add('jump', [11]);
    player.animations.add('stand', [0]);
    player.health = 10;

    player.anchor.setTo(.5, .5);
}
