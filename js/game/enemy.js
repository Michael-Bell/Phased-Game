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
   // enemyGroup.callAll('animations.add', 'animations', 'wings', [1, 2], 10, true);

    //  And play them

  //  enemyGroup.callAll('animations.play', 'animations', 'wings');
}

function rotateEnemies() {     // Trying to make the flyas rotate themselves upright after they get knocked upsidedown.
    enemyGroup.forEach(function (item) {
    if(90<=item.body.angle && item.body.angle<=179){
       item.body.angularForce=-10;
        item.body.angularDamping=.3;
        //console.log('hrotate l');
    }
        if(10<item.body.angle && item.body.angle<90){
        item.body.angularForce=-5;
            item.body.angularDamping=.5;
          //console.log('rotate l');
    }
        if(-180<=item.body.angle && item.body.angle<-90){
        item.body.angularForce=10;
            item.body.angularDamping=.3;
         //   console.log('hrotate r');
    }
        if(-90<=item.body.angle && item.body.angle<-10){
        item.body.angularForce=5;
            item.body.angularDamping=.5;
         //   console.log('rotate r');
    }
        if(-10<=item.body.angle && item.body.angle<=10){
      //item.body.angularForce=0;
            item.body.angularDamping=.8;
    }
    });
}

function animateEnemies() { // tween animate flying up and down
    //  Here we'll chain 4 different tweens together and play through them all in a loop
    enemyGroup.forEach(function (item) {
        if (item.key==='fly') {
            var temp = game.add.sprite(item.x, item.y);
            game.physics.p2.enable(temp);
            temp.body.static = true;
            //item.body.fixedRotation = true;
            var spring = game.physics.p2.createSpring(item, temp, 100, 6, 100);
        }
    });

}

function flyerCoinDrop(){
    gencoins(this.x, this.y, this.goldWorth);
    xpgain(this.xpWorth);
}

