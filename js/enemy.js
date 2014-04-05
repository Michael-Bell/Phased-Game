

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



    //  These are the frame names for the octopus animation. We use the generateFrames function to help create the array.

   // var frameNames = Phaser.Animation.generateFrameNames('fly', 1, 2, '', 4);



    //  Here is the important part. Group.callAll will call a method that exists on every child in the Group.

    //  In this case we're saying: child.animations.add('swim', frameNames, 30, true, false)

    //  The second parameter ('animations') is really important and is the context in which the method is called.

    //  For animations the context is the Phaser.AnimationManager, which is linked to the child.animations property.

    //  Everything after the 2nd parameter is just the usual values you'd pass to the animations.add method.

   // enemyGroup.callAll('animations.add', 'animations', 'fly', frameNames, 4, true, false);



    //  Here we just say 'play the swim animation', this time the 'play' method exists on the child itself, so we can set the context to null.

 //   enemyGroup.callAll('play', null, 'fly');




}