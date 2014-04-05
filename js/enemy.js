function GenerateEnemy() {
    enemyGroup = game.add.group();
    enemyGroup.enableBody = true;
    enemyGroup.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < 50; i++) {
        var c = enemyGroup.create(250 + (i * 70), game.rnd.integerInRange(0, 570), 'fly');
        c.name = 'fly' + i;
        c.body.immovable = true;
      //  c.animations.add('flying',[1,2],5);
      //  c.animations.play('flying');

    }


    //  Now using the power of callAll we can add the same animation to all enemies in the group:

    enemyGroup.callAll('animations.add', 'animations', 'wings', [1, 2], 10, true);



    //  And play them

    enemyGroup.callAll('animations.play', 'animations', 'wings');

}


function animateEnemies(){  // tween animate flying up and down

}