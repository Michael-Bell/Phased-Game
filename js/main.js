/*  Console.log() are used to see how far into the script the game goes before crashing*/

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', {
		preload : preload,
		create : create,
		update : update,
		render : render
	});

var shotDelayTime = 10;
var shotDelay;
var doublejump = 0;
var jumpCount = 0;
var Credits;
var player;
var bullets;

var fireRate = 100;

var nextFire = 0;

var bulletTime = 0;
function preload() {

	console.log('preload start');
	// Load Assets
	game.load.image('sky', 'assets/sky.png');
	game.load.image('ground', 'assets/ground.png');
	game.load.image('bullet', 'assets/key_blue.png');
	game.load.spritesheet('player', 'assets/character/sheet/sprite.png', 75, 96, 12);
	game.load.spritesheet('fly', 'assets/enemies/flysheet.png', 69, 32, 3);
	game.load.image('button', 'assets/switch_yellow_off.png');

	console.log('preloaddone');

}


function create() {
	console.log('createstart');
	//  Modify the world and camera bounds

	game.world.setBounds(0, 0, 8000, 1000);

	// Enable Physics
	game.physics.startSystem(Phaser.Physics.ARCADE);

	//Background Image
	sky = game.add.sprite(0, 0, 'sky');
	sky.scale.setTo(10, 2);
    CreatePlatform();
    /* TODO Create Function to add blocks in a simple, robust way */
    CreatePlayer();
    cursors = game.input.keyboard.createCursorKeys();
    shootKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
    pauseKey = game.input.keyboard.addKey(Phaser.Keyboard.P);

	bullets = game.add.group();

	bullets.enableBody = true;

	bullets.physicsBodyType = Phaser.Physics.ARCADE;

	for (var i = 0; i < 20; i++) {

		var b = bullets.create(0, 0, 'bullet');

		b.name = 'bullet' + i;

		b.exists = false;

		b.visible = false;

		b.checkWorldBounds = true;

		b.events.onOutOfBounds.add(resetBullet, this);

	}

	//create enemy at x1230
    GenerateEnemy();
    console.log('createdone');

}

function update() {

	game.physics.arcade.collide(player, ground);
	game.physics.arcade.collide(player, flya, collisionHandler, null, this);
	game.physics.arcade.collide(flya, bullets, bulletenemy, null, this);

	player.body.velocity.x = 0;
	game.camera.y = player.y - 200;
	game.camera.x = player.x - 500;

	if (flya.health > 0) {
		flya.animations.play('fly')
		if (flya.y >= 700)
			flya.direction = false;
		else if (flya.y <= 200)
			flya.direction = true;
		if (flya.direction) {
			flya.body.velocity.setTo(0, 100);
		} else {
			flya.body.velocity.setTo(0, -100);
		}
	} else {
		flya.frame = 0;
		flya.body.velocity.setTo(0, 500)
	}

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


	if (game.time.now > bulletTime)
		{

		bullet = bullets.getFirstExists(false);

		if (bullet)
			{

			bullet.reset(player.x + 6, player.y - 8);

			if (player.scale.x === -1) {
			bullet.scale.x = -1;
			bullet.body.velocity.x = -100;
		} else {
			bullet.body.velocity.x = 100;
      			bullet.scale.x = 1;

		}

			bulletTime = game.time.now + 150;

		}

	}

}

function jump(number) {
	player.body.velocity.y = -350
		if (number == 2) {
			player.body.angularVelocity = -200;

		}
}


function render() {

	// Sprite debug info

	game.debug.spriteInfo(player, 32, 32);

}

function collisionHandler(player, collide) {

    //  If the player collides with the chillis then they get eaten :)

    //  The chilli frame ID is 17
    if (player.health <= 0) {
        player.kill();
        dead();
    } else {
        player.health = 0;
    }

    if (collide.frame == 17)collide.kill();


}

function dead() {
	x = game.camera.x + (game.width / 2);

	y = game.camera.y + (game.height / 2);
	button = game.add.button(x, y, 'button', actionOnClick, this, 1, 0, 2);

}

function actionOnClick() {
	game.state.start(game.state.current);
}

function bulletenemy(flya, bullet) {
	if (flya.health > 1) {
		flya.health--;
	} else {
		flya.kill();
	}
	bullet.kill();

}


function resetBullet (bullet) {



    bullet.kill();



}

