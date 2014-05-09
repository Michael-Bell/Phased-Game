

   bulletInit = function() {

        // Define constants
        this.SHOT_DELAY = 500; // milliseconds (10 bullets/second)
        this.BULLET_SPEED = 250; // pixels/second
        this.NUMBER_OF_BULLETS = 10;





        // Create an object pool of bullets
        this.bulletPool = this.game.add.group();
        for(var i = 0; i < this.NUMBER_OF_BULLETS; i++) {
            // Create each bullet and add it to the group.
            var bullet = this.game.add.sprite(0, 0, 'bullet');
            this.bulletPool.add(bullet);
         //   console.log(bullet);
            // Set its pivot point to the center of the bullet
            bullet.anchor.setTo(0.5, 0.5);
            // Enable physics on the bullet
            game.physics.p2.enable(bullet,false); // we need physics

            // Enable physics on the missile
            bullet.body.data.gravityScale = 0;
            bullet.body.setCollisionGroup(bulletCollisionGroup);
            bullet.body.collides(tilesCollisionGroup,bulletWallColl,this);
            bullet.body.collides(enemyCollisionGroup);
            // Define constants that affect motion
            this.SPEED = 250; // missile speed pixels/second
            this.TURN_RATE = 5; // turn rate in degrees/frame
            // Set its initial state to "dead".
            bullet.kill();
        }
    };

    shootBullet = function() {
        // Enforce a short delay between shots by recording
        // the time that each bullet is shot and testing if
        // the amount of time since the last shot is more than
        // the required delay.
        if (this.lastBulletShotAt === undefined) this.lastBulletShotAt = 0;
        if (this.game.time.now - this.lastBulletShotAt < this.SHOT_DELAY) return;
        this.lastBulletShotAt = this.game.time.now;

        // Get a dead bullet from the pool
        var bullet = this.bulletPool.getFirstDead();

        // If there aren't any bullets available then don't shoot
        if (bullet === null || bullet === undefined) return;

        // Revive the bullet
        // This makes the bullet "alive"
        bullet.revive();
        bullet.lifespan=1000;

        // Bullets should kill themselves when they leave the world.
        // Phaser takes care of this for me by setting this flag
        // but you can do it yourself by killing the bullet if
        // its x,y coordinates are outside of the world.
        bullet.checkWorldBounds = true;
        bullet.outOfBoundsKill = true;

        // Set the bullet position to the gun position.
        bullet.reset(player.x, player.y);

        // Shoot it
        if(player.scale.x<0){
            bullet.body.velocity.x=-this.BULLET_SPEED;
            bullet.scale.x=-1;
        }
        else{
            bullet.body.velocity.x = this.BULLET_SPEED;
            bullet.scale.x=1;
        }
        bullet.body.velocity.y = 0;
    };


   // Missile constructor
   var Missile = function(game, x, y) {
       spri = game.add.sprite(x,y,'bullet');

       // Set the pivot point for this sprite to the center
       spri.anchor.setTo(0.5, 0.5);

       // Enable physics on the missile
       game.physics.enable(spri, Phaser.Physics.P2);
      // this.body.data.gravityScale = 0;
console.log(spri);
       // Define constants that affect motion
       spri.SPEED = 250; // missile speed pixels/second
       spri.TURN_RATE = 5; // turn rate in degrees/frame
   };

   // Missiles are a type of Phaser.Sprite
   Missile.prototype = Object.create(Phaser.Sprite.prototype);
   Missile.prototype.constructor = Missile;

   Missile.prototype.update = function() {
       // Calculate the angle from the missile to the mouse cursor game.input.x
       // and game.input.y are the mouse position; substitute with whatever
       // target coordinates you need.
       var targetAngle = this.game.math.angleBetween(
           this.x, this.y,
           player.x, player.y
       );

       // Gradually (this.TURN_RATE) aim the missile towards the target angle
       if (this.rotation !== targetAngle) {
           // Calculate difference between the current angle and targetAngle
           var delta = targetAngle - this.rotation;

           // Keep it in range from -180 to 180 to make the most efficient turns.
           if (delta > Math.PI) delta -= Math.PI * 2;
           if (delta < -Math.PI) delta += Math.PI * 2;

           if (delta > 0) {
               // Turn clockwise
               this.angle += this.TURN_RATE;
           } else {
               // Turn counter-clockwise
               this.angle -= this.TURN_RATE;
           }

           // Just set angle to target angle if they are close
           if (Math.abs(delta) < this.game.math.degToRad(this.TURN_RATE)) {
               this.rotation = targetAngle;
           }
       }

       // Calculate velocity vector based on this.rotation and this.SPEED
       this.body.velocity.x = Math.cos(this.rotation) * this.SPEED;
       this.body.velocity.y = Math.sin(this.rotation) * this.SPEED;
   };

