 function collisionHandler(weakerObject, strongerObject) {

 // Stronger object damages weaker objects, removes 1 health

     // damage is set by itemtosetdamageto.dmg=1; ex: player.js has player.dmg=1;

     

switch (weakerObject) {
    case player:
            if (player.inv===false) {

         if (weakerObject.health <= 0) {
         
             weakerObject.kill();
             dead(); // we just killed the player, this tells the game to reset, we can add in more stuff later
         } else {
            player.inv = true; 
            game.time.events.add(Phaser.Timer.SECOND * 2, playerInv, this); // we know this is the player, so we want him to be invincible
            /* TODO Jesse: Add knockback */
             weakerObject.health = weakerObject.health-strongerObject.dmg; // remove the stronger Objects damage from the weaker object (Modifier not doing anything atm)
         }
     }
     break;

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
     
     
     
     
     
     
     
     