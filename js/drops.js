function collectgold(goldincrease){
    gold =+ goldincrease+Math.floor(Math.random()*LUK/5);

};

function gencoins(x,y){ //Trying to make a gold coin come drop out of an enemy
    var g = coinGroup.create(x, y, 'goldcoin');
    g.body.gravity.y = 300;
    g.body.velocity.y = -150-Math.random()*150;
    g.body.velocity.x = 100-Math.random()*200;

};

function initCoinGroup(){
    // Create the coin group
    coinGroup = game.add.group();
    coinGroup.enableBody = true;
    coinGroup.physicsBodyType = Phaser.Physics.ARCADE;

}

// TODO  add item drops