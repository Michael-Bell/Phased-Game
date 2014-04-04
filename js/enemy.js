function GenerateEnemy() {
    flya = game.add.sprite(300, 700, 'fly'); // put in the sprite at these coordinates
    game.physics.arcade.enable(flya); // enemy needs physics
    flya.animations.add('fly', [1, 2]); // animate
    flya.health = 5; // set the health
    flya.maxHeight = 800; // min/max height it can fly to
    flya.minHeight = 600;
    flya.body.immovable = true; // Our player cannot push these guys around
}