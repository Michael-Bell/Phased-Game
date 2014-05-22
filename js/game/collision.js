var str;
var jumpCountFix;
function collisionHandler(weakerObject, strongerObject) {
    aaa = weakerObject;
    // Stronger object damages weaker objects, removes 1 health
    str = strongerObject;
    // damage is set by itemtosetdamageto.dmg=1; ex: player.js has player.dmg=1;

    //console.log(strongerObject.dmg);
    switch (weakerObject.sprite.name) {

        case "player":
            console.log('Switch player');

            if (weakerObject.sprite.inv === false || true) { // if the player can be damaged
                console.log('weakerObject.sprite.inv === false');
                if (weakerObject.sprite.health <= 1) { // and the players health is at 1, meaning this hit brings it to 0
                    console.log('weakerObject.sprite.health <= 1');
                    weakerObject.sprite.kill(); //we kill the player
                    dead(' running into an enemy...'); // we just killed the player, this tells the game to reset, we can add in more stuff later
                } else { //if the player is vunerable, and healthy
                    console.log('weakerObject.sprite.health <= 1 ELSE');
                    weakerObject.sprite.inv = true; // the player is made invunerable
                    game.time.events.add(Phaser.Timer.SECOND * 2, playerInv, this); // We want him to be vunerable again in two seconds
                    game.time.events.add(Phaser.Timer.SECOND * .1, incjumpCount, this); // We need a timer here so if he gets hit while on the ground, he doesn't get a triple jump.
                    //weakerObject.sprite.velocity = 100;
                    jumpCountFix=jumpCount;
                    jumpCount=2;
                    player.jumpUp=player.jumpUp/1.3;
                    weakerObject.sprite.healthRegen = false;
                    weakerObject.sprite.body.velocity.y = -250;
                    if (player.scale.x < 0) {
                        weakerObject.sprite.knockedLeft = 1;
                    } else {
                        weakerObject.sprite.knockedRight = 1;
                    }
                }
                weakerObject.sprite.health = weakerObject.sprite.health - strongerObject.sprite.dmg; // we want to remove the damage done by the enemy to him, even if he dies, so that the health displayed is still 0

            }
            break; // Never Forget

        default:
            if (weakerObject.health > 0) {
                weakerObject.health = weakerObject.health - strongerObject.dmg;

            } else {
                weakerObject.sprite.kill();
                strongerObject.sprite.kill();
                weakerObject.sprite.destroy();
            }
    }


}

function incjumpCount() {
    jumpCount = jumpCountFix;
}
var aaa;
function bulletWallColl(bullet, wall) {
    asdf = bullet;
    bullet.sprite.kill();
}

function knockback() {
    /*TODO Fix your knockback. It fires, but the move needs to be p2js */
    if (player.knockedLeft > 0) {
        //console.log("knockback");

        //player.body.reverse(1000);
        player.knockedLeft++;
        if (player.knockedLeft >= 14) {
            player.knockedLeft = 0;
            // player.body.acceleration.x = 0;
        }
    }
    if (player.knockedRight > 0) {
        //player.body.thrust(1000);
        player.knockedRight++;
        // console.log("knockback");

        if (player.knockedRight >= 14) {
            player.knockedRight = 0;
            //player.body.acceleration.x = 0;
        }
    }
}
