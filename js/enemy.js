var flya;
function GenerateEnemy() {
    enemies = game.add.group(); // using a group
    game.physics.arcade.enable(enemies); // enemy needs physics
    enemies.health = 5; // set the health
    var flya = enemies.create(300, 700, 'fly'); // put in the sprite at these coordinates
    flya.animations.add('fly', [1, 2]); // animate

    flya.maxHeight = 800; // min/max height it can fly to
    flya.minHeight = 600;
   // flya.body.immovable = true; // Our player cannot push these guys around
}