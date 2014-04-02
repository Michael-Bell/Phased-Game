/*  Console.log() are used to see how far into the script the game goes before crashing*/

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', {
		preload : preload,
		create : create,
		update : update
	});

var shotDelayTime = 10;
var shotDelay;
var doublejump = 0;
var jumpCount = 0;
var Credits;
var player;
var BulletGroup;

function preload() {

	console.log('preload start');
	// Load Assets
	game.load.image('sky', 'assets/sky.png');
	game.load.image('ground', 'assets/ground.png');
	game.load.image('bullet', 'assets/key_blue.png');
	game.load.spritesheet('player', 'assets/character/sheet/sprite.png', 75, 96, 12);
	console.log('preloaddone');
}

function create() {
	console.log('createstart');
	//  Modify the world and camera bounds

	game.world.setBounds(0, 0, 8000, 1000);

	// Enable Physics
	game.physics.startSystem(Phaser.Physics.ARCADE);

	//Background Image
	game.add.sprite(0, 0, 'sky');

	//Add the platforms
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
	/* TODO Create Function to add blocks in a simple, robust way */

	// Enter Player 1
	player = game.add.sprite(0, 475, 'player');
	player.anchor.setTo(.5, .5);
	game.physics.arcade.enable(player);

	player.body.bounce.y = 0.1;
	player.body.gravity.y = 400;
	player.body.collideWorldBounds = true;
	player.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7);
	player.animations.add('jump', [11]);
	player.animations.add('stand', [0]);

	player.anchor.setTo(.5, .5);


	cursors = game.input.keyboard.createCursorKeys();
	shootKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
	pauseKey = game.input.keyboard.addKey(Phaser.Keyboard.P);

	BulletGroup = game.add.group(10);
	//BulletGroup = game.createGroup(10);
	BulletGroup.enableBody = true;
	game.physics.arcade.enable(BulletGroup);
bullet = BulletGroup.create(player.x, player.y, 'bullet');

	console.log('createdone');

}

function update() {

	game.physics.arcade.collide(player, ground);
	player.body.velocity.x = 0;
  game.camera.y = player.y-500;
  game.camera.x = player.x-500;

	if (shootKey.isDown) {
		fire = true;
	} else if (shootKey.justReleased) {
		fire = false;
	}
	if (cursors.left.isDown) {
		player.body.velocity.x = -150;
		player.animations.play('walk');

		if (player.scale.x === 1)
			player.scale.x *= -1;
	} else if (cursors.right.isDown) {
		player.body.velocity.x = 150;

		if (player.scale.x === -1)
			player.scale.x *= -1;

		player.animations.play('walk');
	} else {
		player.frame = 0;
	}
	cursors.up.onDown.add(jumpCheck, this);
	if (player.body.touching.down) {
		jumpCount = 0;
		player.body.angularVelocity = 0;
		player.angle = 0;

	} else {
		player.frame = 11
	}
	if (fire) {

		createBullet();
	}
}
jumpCheck = function () {
	if (jumpCount < 2) {
		jumpCount++;
		player.frame = 11;
		jump(jumpCount);
	}

}
function createBullet() {
	bullet = BulletGroup.create(player.x, player.y, 'bullet');
	if (player.scale.x === -1) {
		bullet.scale.x *= -1;
		bullet.body.velocity.x = -100;
	} else {
		bullet.body.velocity.x = 100;
	}

}

function jump(number) {
	player.body.velocity.y = -350
		if (number == 2) {
			player.body.angularVelocity = -200;

		}
}

function displayCredits() {
	Credits = game.add.text(0, 0, 'Assets: 0', {
			font : "20px Arial",
			fill : "#ffffff",
			align : "left"
		});
}

function sleep(millis, callback) {
	setTimeout(function () {
		callback();
	}, millis);
}
