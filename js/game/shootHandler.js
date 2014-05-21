/*
*
* Code to check whether you can shoot; shared between all weapons
*
 */


function canShoot(bulletType){
    if (bulletType.lastBulletShotAt === undefined) bulletType.lastBulletShotAt = 0;
    if (game.time.now - bulletType.lastBulletShotAt < bulletType.SHOT_DELAY || bulletType.enabled===false) return false;
    bulletType.lastBulletShotAt = game.time.now;
    console.log(bulletType);
    return true;
}
shootBullet = function () {
    // Enforce a short delay between shots by recording
    // the time that each bullet is shot and testing if
    // the amount of time since the last shot is more than
    // the required delay.
    if (this.lastBulletShotAt === undefined) this.lastBulletShotAt = 0;
    if (this.game.time.now - this.lastBulletShotAt < this.SHOT_DELAY) return false;
    this.lastBulletShotAt = this.game.time.now;


 return true;

};



