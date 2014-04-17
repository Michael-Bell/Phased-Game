/**
 * Created by Owner on 4/4/14.
 */

function loadRain() {
    game.load.spritesheet('rain', 'assets/rain.png', 17, 17);
    console.log('load Rain');
}
function createRain() {
    console.log('createRain');
    var emitter = game.add.emitter(game.world.centerX, 0, 400);
    emitter.width = game.world.width;
    // emitter.angle = 30; // uncomment to set an angle for the rain.
    emitter.makeParticles('rain');
    emitter.minParticleScale = 0.1;
    emitter.maxParticleScale = 1.0;
    emitter.setYSpeed(300, 500);
    emitter.setXSpeed(-5, 5);
    emitter.minRotation = 0;
    emitter.maxRotation = 0;
    emitter.start(false, 1600, 5, 0);
}






