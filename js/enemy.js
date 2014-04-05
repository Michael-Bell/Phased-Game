function initEnemy(){
    /* Create Enemy Group and apply group stats*/
    enemyGroup = game.add.group();
    enemyGroup.enableBody = true;
    enemyGroup.physicsBodyType = Phaser.Physics.ARCADE;

}



function GenerateEnemy(x, y, uniqueID) {

    var c = enemyGroup.create(x, y, 'fly');
    c.name = 'fly'+ uniqueID;
    c.body.immovable = true;
    //  Now using the power of callAll we can add the same animation to all enemies in the group:

    enemyGroup.callAll('animations.add', 'animations', 'wings', [1, 2], 10, true);



//  And play them

    enemyGroup.callAll('animations.play', 'animations', 'wings');
}






function animateEnemies(){  // tween animate flying up and down
    //  Here we'll chain 4 different tweens together and play through them all in a loop

    var tween = game.add.tween(enemyGroup)//.to({ x: 600 }, 2000, Phaser.Easing.Linear.None)

        .to({ y: 500 }, 2000, Phaser.Easing.Linear.None)

        //.to({ x: 100 }, 2000, Phaser.Easing.Linear.None)

        .to({ y: 700 }, 2000, Phaser.Easing.Linear.None)

        .loop()

        .start();

}




function lotsOfEnemies(){
    //place a bunch of enemies
    for(i=0; i<50; i++){
        GenerateEnemy(250+(i*200),100, i);
    }

}