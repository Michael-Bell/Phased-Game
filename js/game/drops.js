function gencoins(x, y, goldincrease) { //Trying to make a gold coin come drop out of an enemy
    var g = coinGroup.create(x, y, 'goldcoin');
    game.physics.p2.enable(g);

    /*    g.body.gravity.y = 300;*/
    g.body.velocity.y = -150 - Math.random() * 150;
    g.body.velocity.x = 100 - Math.random() * 200;

    g.bounceCount = 0;
    g.despawntimer = game.time.now + 50000 + Math.random() * 1000;
    g.goldincrease = goldincrease;
    g.body.setCollisionGroup(coinCollisionGroup);
    g.body.collides(tilesCollisionGroup);
    g.body.collides(playerCollisionGroup);
}
function coinBounce() {
    coinGroup.forEach(function (item) {

        if (touchingDown(item)) {
            if (item.body.velocity.x > 15 || item.body.velocity.x < -15) { //If the coin is going fast sideways
                item.body.velocity.x = item.body.velocity.x / 1.175;
                if (item.bounceCount === 0) {
                    item.body.velocity.y = -100;
                    item.bounceCount = 1;
                } else if (item.bounceCount === 1) {
                    item.bounceCount = 2;
                    item.body.velocity.y = -50;
                }
            } else {
                item.body.velocity.x = 0;
                item.body.velocity.y = 0;
            }
        }
        if (game.time.now > item.despawntimer) {
            item.kill();
        }

    });
}

function initCoinGroup() {
    // Create the coin group
    coinGroup = game.add.group();
    /*    coinGroup.enableBody = true;
     coinGroup.physicsBodyType = Phaser.Physics.P2;*/

}

function playerCoins(test, impactCoin) {
    currentgold = impactCoin.sprite.goldincrease + currentgold + Math.floor(Math.random() * DEX / 5);
    impactCoin.sprite.kill();
    $(pgold).text(currentgold);
}

// TODO  add item drops
//TODO Side game of coins
