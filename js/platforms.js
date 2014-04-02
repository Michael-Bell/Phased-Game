function makePlatforms() { //Add the platforms
	ground = game.add.group();
	ground.enableBody = true;
	for (var i = 0; i < 12; i++) {
		var block = ground.create(i * 70, 600 - 70, 'ground');
		block.body.immovable = true;

	}

	for (var i = 0; i < 3; i++) {
		var block = ground.create((5 * 70) + i * 70, 600 - 400, 'ground'); // Dirty math hack to shift over blocks
		block.body.immovable = true;

	}

	for (var i = 0; i < 3; i++) {
		var block = ground.create(i * 70, 600 - 250, 'ground');
		block.body.immovable = true;

	}
}
/* TODO Create Function to add blocks in a simple, robust way */
