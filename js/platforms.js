var layer;
function CreatePlatform() {
//Add the platforms
    /* TODO Just make a map in Tiled or something and import it in with tileset or something, be way easier */
    /* TODO Moving Platforms... */
    ground = game.add.group(); // using a group
    ground.enableBody = true;

    for (var i = 0; i < 3; i++) {
        var block = ground.create((5 * 70) + i * 70, 600 - 400, 'ground'); // Dirty math hack to shift over blocks
        block.body.immovable = true;

    }
    for (var i = 0; i < 100; i++) {
        var block = ground.create(+i * 70, 800, 'ground'); // Dirty math hack to shift over blocks
        block.body.immovable = true;

    }
    for (var i = 0; i < 3; i++) {
        var block = ground.create(i * 70, 600 - 250, 'ground');
        block.body.immovable = true;

    }

}