 function createBullet() {

   /* TODO Make bullets die when off camera */

    if (game.time.now > bulletTime) // is it too soon to shoot again?
    {

        bullet = bullets.create(player.x, player.y+8, 'bullet');
        bullet.events.onOutOfBounds.add( goodbye, this );
        bullet1=bullet;

            if (player.scale.x === -1) { // check which direction the player is facing, make bullet face the same way and set velocity
                bullet.scale.x = -1;
                bullet.body.velocity.x = -150;
            } else {
                bullet.body.velocity.x = 150;
                bullet.scale.x = 1;

            }

            bulletTime = game.time.now + 300; // delay in ms till next shot can be fired


    }

}
var bullet1;
 function magicBullet() {
        bullet = bullets.create(player.x, player.y+8, 'bullet');
        bullet1=bullet;
      bullet.name='magic';
            if (player.scale.x === -1) { // check which direction the player is facing, make bullet face the same way and set velocity
                bullet.scale.x = 1;
                bullet.body.velocity.x = 150;
            } else {
                bullet.body.velocity.x = -150;
                bullet.scale.x = -1;

            }
}




function initBullets(){
    bullets = game.add.group();

    bullets.enableBody = true;

    bullets.physicsBodyType = Phaser.Physics.ARCADE;

    
  }
  var a;
  
 function goodbye(obj) {
 console.log(obj);
   obj.kill();
}

var asdf=true;

function checkBullet(){
bullets.forEach(function(item) {
    //console.log(item);
  
    if(item.inCamera===false){
  //  item.visible=false;
    }
    
        
    });}