var enemyCollisionGroup;

function initEnemy() {
    /* Create Enemy Group and apply group stats*/
    enemyGroup = game.add.group();
    enemyGroup.enableBody = true;
    enemyGroup.physicsBodyType = Phaser.Physics.P2JS;

}

function GenerateEnemy(x, y, uniqueID) {

    var c = enemyGroup.create(x, y, 'fly');
    c.name = 'fly' + uniqueID;
    c.dmg = 1;
    c.body.immovable = true;
    c.goldWorth = 5;
    c.xpWorth = 0.5;
    //  Now using the power of callAll we can add the same animation to all enemies in the group:
    /* NOTE THIS IS A DEPRECATED FUNCTION; PLEASE USE THE ENEMYGROUP.FORALL IN PLATFROMS.JS TO SET GROUP VARS */
    enemyGroup.callAll('animations.add', 'animations', 'wings', [1, 2], 10, true);

    //  And play them

    enemyGroup.callAll('animations.play', 'animations', 'wings');
}

function animateEnemies() { // tween animate flying up and down
    //  Here we'll chain 4 different tweens together and play through them all in a loop
    enemyGroup.forEach(function (item) {
        asdf=item;
        var temp = game.add.sprite(item.x,item.y);
        game.physics.p2.enable(temp);
        temp.body.static=true;
        item.body.fixedRotation=true;
        var spring = game.physics.p2.createSpring(item, temp, 125, 6, 99);
    });

}

function lotsOfEnemies() {
    //place a bunch of enemies
    for (i = 0; i < 50; i++) {
        GenerateEnemy(250 + (i * 200), 100, i);
    }
}
