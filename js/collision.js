function collisionHandler(weakerObject, strongerObject) {

	// Stronger object damages weaker objects, removes 1 health

	// damage is set by itemtosetdamageto.dmg=1; ex: player.js has player.dmg=1;

	//console.log(strongerObject.dmg);

	switch (weakerObject) {
	case player:
		if (player.inv === false) { // if the player can be damaged


				player.inv = true; // the player is made invunerable
				game.time.events.add(Phaser.Timer.SECOND * 2, playerInv, this); // We want him to be vunerable again in two seconds
                game.time.events.add(Phaser.Timer.SECOND * .1, incjumpCount, this); // We need a timer here so if he gets hit while on the ground, he doesn't get a triple jump.
				player.velocity = 100;
				player.healthRegen = false;
                player.body.velocity.y =  - 200;
                if(player.scale.x<0){
                    player.knockedLeft=1;
                }else{
                    player.knockedRight=1;
                }

            weakerObject.damage(strongerObject.dmg); // we want to remove the damage done by the enemy to him, even if he dies, so that the health displayed is still 0

		}
		break; // Never Forget

	default:
		if (weakerObject.health > 0) {
			weakerObject.damage(strongerObject.dmg);

		} else {
			gencoins(strongerObject.x, strongerObject.y, weakerObject.goldWorth);
			xpgain(weakerObject.xpWorth);
			weakerObject.kill();
			strongerObject.kill();
		}
	}

}

function incjumpCount(){
    jumpCount = 2;
}

function bulletWallColl(bullet, wall){
    bullet.kill();
}

function knockback(){
    if(player.knockedLeft>0) {
        player.body.acceleration.x = 2000;
        player.knockedLeft++;
        if(player.knockedLeft>=14){
            player.knockedLeft=0;
            player.body.acceleration.x = 0;
        }
    }
    if(player.knockedRight>0) {
        player.body.acceleration.x = -2000;
        player.knockedRight++;
        if(player.knockedRight>=14){
            player.knockedRight=0;
            player.body.acceleration.x = 0;
        }
    }
}