var doublejump = 0;
var game = new Phaser.Game(500, 500, Phaser.CANVAS, 'phaser-example', {
		preload : preload,
		create : create,
		update : update
	});
var jumpCount = 0;
var Credits;
var player;
//var doublejump;
function preload() {

	//  You can fill the preloader with as many assets as your game requires

	//  Here we are loading an image. The first parameter is the unique
	//  string by which we'll identify the image later in our code.

	//  The second parameter is the URL of the image (relative)
	game.load.image('sky', 'assets/sky.png');
	game.load.image('ground', 'assets/ground.png');
	game.load.image('player', 'assets/character/side.png');
	//game.load.image('player', 'assets/character/sheet/walk_sheet.png', 75, 96, 11);

}

function create() {

	//  This creates a simple sprite that is using our loaded image and
	//  displays it on-screen
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.add.sprite(0, 0, 'sky');

	ground = game.add.group();
	ground.enableBody = true;
	//  Here we'll create 12 of them evenly spaced apart
	for (var i = 0; i < 8; i++) {
		//  Create a star inside of the 'stars' group
		var block = ground.create(i * 70, 500 - 70, 'ground');
		block.body.immovable = true;

	}

	player = game.add.sprite(200, 200, 'player');

	//  We need to enable physics on the player
	game.physics.arcade.enable(player);

	//  Player physics properties. Give the little guy a slight bounce.
	player.body.bounce.y = 0.1;
	player.body.gravity.y = 400;
	player.body.collideWorldBounds = true;
	//  player.animations.add('walk',[0,1,2,3,4,5,6,7,8,9,10,11],6,true);

	cursors = game.input.keyboard.createCursorKeys();
	var shoot = game.input.keyboard.addKey(Phaser.Keyboard.S);
	var mene = game.input.keyboard.addKey(Phaser.Keyboard.P);
}

function update() {

	game.physics.arcade.collide(player, ground);
	//  Reset the players velocity (movement)
	player.body.velocity.x = 0;

	if (cursors.left.isDown) {
		//  Move to the left
		player.body.velocity.x = -150;

		// player.animations.play('walk');
	} else if (cursors.right.isDown) {
		//  Move to the right
		player.body.velocity.x = 150;

		// player.animations.play('walk');
	} else {
		//  Stand still
		player.animations.stop();

		player.frame = 4;
	}
	cursors.up.onDown.add(jumpCheck, this); //tells phaser to fire jumpCheck() ONCE per onDown event.
if(player.body.touching.down){jumpCount=0;}

}
	jumpCheck = function () {
		if (jumpCount < 2) {
			jump();
			jumpCount++;
		}
	}

function jump() {
	player.body.velocity.y = -350;
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
