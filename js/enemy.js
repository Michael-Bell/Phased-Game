function GenerateEnemy() {
    flya = game.add.sprite(300, 700, 'fly');
    game.physics.arcade.enable(flya);
    flya.animations.add('fly', [1, 2]);
    flya.health = 5;
    flya.maxHeight = 800;
    flya.minHeight = 600;
    flya.body.immovable = true;
}