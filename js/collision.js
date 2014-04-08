 function collisionHandler(weakerObject, strongerObject) {

 // Stronger object damages weaker objects, removes 1 health

     // damage is set by itemtosetdamageto.dmg=1; ex: player.js has player.dmg=1;

     

switch (weakerObject) {
    case player:
            if (player.inv===false) { // if the player can be damaged

         if (weakerObject.health <= 0) { // and the players health is 0
         
             weakerObject.kill(); //we kill the player
             dead(); // we just killed the player, this tells the game to reset, we can add in more stuff later
         } else { //if the player is vunerable, and healthy
            player.inv = true;  // the player is made invunerable
            game.time.events.add(Phaser.Timer.SECOND * 2, playerInv, this); // We want him to be vunerable again in two seconds
            /* TODO Jesse: Add knockback */
             weakerObject.health = weakerObject.health-strongerObject.dmg; // we want to remove the damage done by the enemy to him
         }
     }
     break; // Never Forget

    default:
        alert("default");
        if(weakerObject.health>0){
        weakerObject.health= weakerObject.health-strongerObject.dmg;
        }
        else{
        weakerObject.kill();
        strongerObject.kill();
        }
}
     
     
     }
     
     
     
     
     
     
     
     