function collectgold(goldincrease){
    gold =+ goldincrease+Math.floor(Math.random()*LUK/5);

};

function gencoins(x,y){ //Trying to make a gold coin come drop out of an enemy
    var g = coinGroup.create(x, y, 'goldcoin');
    g.body.gravity.y = 300;
    g.body.velocity.y = -150-Math.random()*150;
    g.body.velocity.x = 100-Math.random()*200;
    g.body.bounce.y = 0.5;
 /*   if(g.body.touching.down){                     OLD CODE   ---   Not detecting ground touching
        console.log('hi');
        if(Math.floor(g.body.velocity.x/10)===0){
        g.body.velocity.x=g.body.velocity.x/2;
    } else {
        console.log('hi2');
        g.body.velocity.x=0;
    }
}*/ 
}

    coinGroup.forEach(function(item) {
        if (item.body.touching.down)
        {
            confirm('hi');
            if(Math.floor(item.velocity.x/10)===0){
            item.velocity.x=item.velocity.x/2;
            } else {
                item.velocity.x=0;
            }
        }
    });


function initCoinGroup(){
    // Create the coin group
    coinGroup = game.add.group();
    coinGroup.enableBody = true;
    coinGroup.physicsBodyType = Phaser.Physics.ARCADE;

}

// TODO  add item drops
//TODO Side game of coins