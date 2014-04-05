

function GenerateEnemy(){

    enemyGroup = game.add.group();

    enemyGroup.enableBody = true;

    enemyGroup.physicsBodyType = Phaser.Physics.ARCADE;



    for (var i = 0; i < 50; i++)

    {

        var c = enemyGroup.create(100+i*70, game.rnd.integerInRange(0, 570), 'fly',0);

        c.name = 'fly' + i;

        c.body.immovable = true;

    }


}