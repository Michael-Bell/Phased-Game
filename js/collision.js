function collisionHandler(weakerObject, strongerObject) {

	// Stronger object damages weaker objects, removes 1 health

	// damage is set by itemtosetdamageto.dmg=1; ex: player.js has player.dmg=1;

	//console.log(strongerObject.dmg);

	switch (weakerObject) {
	case player:
		if (player.inv === false) { // if the player can be damaged

			if (weakerObject.health <= 1) { // and the players health is at 1, meaning this hit brings it to 0

				weakerObject.kill(); //we kill the player
				dead(); // we just killed the player, this tells the game to reset, we can add in more stuff later
			} else { //if the player is vunerable, and healthy
				player.inv = true; // the player is made invunerable
				game.time.events.add(Phaser.Timer.SECOND * 2, playerInv, this); // We want him to be vunerable again in two seconds
				player.velocity = 100;
				player.healthRegen = false;
				jumpCount = 2;
                player.body.velocity.y =  - 200;
                if(player.scale.x<0){
                    player.knockedLeft=1;
                }else{
                    player.body.velocity.x = -500;
                    player.knockedRight=1;
                }
			}
			weakerObject.health = weakerObject.health - strongerObject.dmg; // we want to remove the damage done by the enemy to him, even if he dies, so that the health displayed is still 0

		}
		break; // Never Forget

	default:
		if (weakerObject.health > 0) {
			weakerObject.health = weakerObject.health - strongerObject.dmg;

		} else {
			gencoins(strongerObject.x, strongerObject.y, weakerObject.goldWorth);
			xpgain(weakerObject.xpWorth);
			weakerObject.kill();
			strongerObject.kill();
		}
	}

}



function bulletWallColl(bullet, wall){
    bullet.kill();
}

function knockback(){
    if(player.knockedLeft>0 && player.knockedLeft<15) {
        player.body.acceleration.x = 3000;
        player.knockedLeft++;
        if(player.knockedLeft>=14){
            player.knockedLeft=0;
            player.body.acceleration.x = 0;
        }
    }
    if(player.knockedRight>0 && player.knockedRight<15) {
        player.body.acceleration.x = -3000;
        player.knockedRight++;
        if(player.knockedRight>=14){
            player.knockedRight=0;
            player.body.acceleration.x = 0;
        }
    }
}