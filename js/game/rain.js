/**
 * Created by Owner on 4/4/14.
 */
donut = false;
function loadRain() {
    game.load.image('rain', 'assets/rain.png');
    game.load.image('donut', 'assets/donut.png');
    // console.log('load Rain');
}

function createRain() {
    rain = game.add.emitter(game.world.centerX, 0, 400);
    // console.log('createRain');
    rain.width = game.world.width;
    // emitter.angle = 30; // uncomment to set an angle for the rain.
    rain.makeParticles('rain');
    rain.minParticleScale = 0.1;
    rain.maxParticleScale = 1.0;
    rain.setYSpeed(300, 500);
    rain.setXSpeed(-5, 5);
    rain.minRotation = 0;
    rain.maxRotation = 0;
    rain.start(false, 2000, 5, 0);

    donutRain = game.add.emitter(game.world.centerX, 0, 400);
    // console.log('createRain');
    donutRain.width = game.world.width;
    // emitter.angle = 30; // uncomment to set an angle for the rain.
    donutRain.makeParticles('donut');
    donutRain.minParticleScale = 0.05;
    donutRain.maxParticleScale = .5;
    donutRain.setYSpeed(300, 500);
    donutRain.setXSpeed(-5, 5);
    donutRain.minRotation = 0;
    donutRain.maxRotation = 0;
    donutRain.start(false, 2000, 5, 0);
    donutRain.on = false;
}

