var anim,width,Animplayer,tilesprite;

function pauseAni(){
    anim.paused = true;
}

function resumeAni(){
    anim.paused=false;
}
    width=Math.floor(width/70)*70;

    anim = new Phaser.Game(width, 300, Phaser.CANVAS, 'animationDiv', { preload: animpreload, create: animcreate, update: animupdate, render: testdebug});



    function animpreload() {

        anim.load.spritesheet('dude', 'assets/character/sheet/sprite.png', 75, 96, 12);

        anim.load.image('floor','assets/ground.png');

    }

    function animcreate() {


        // Start the physics engine
        anim.physics.startSystem(Phaser.Physics.ARCADE);
        //give the game gravity
        anim.physics.arcade.gravity.y = 100;
        // background color
        anim.stage.backgroundColor = 0x4488cc;
        // add player sprite
        Animplayer = anim.add.sprite(anim.width / 2, anim.height - 118, 'dude');
        // add animations
        Animplayer.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 12);
        // Enable physics on the player
        anim.physics.enable(Animplayer, Phaser.Physics.ARCADE);
        //  Animplayer.body.collideWorldBounds = true;
        Animplayer.anchor.setTo(0.5, 0.5);
        // give velocity
        Animplayer.body.velocity.x = 100;


        tilesprite = anim.add.tileSprite(0, anim.height - 70, width, 70, 'floor');
        anim.physics.enable(tilesprite, Phaser.Physics.ARCADE);

        tilesprite.autoScroll(-140,0);
        tilesprite.body.immovable = true;

        tilesprite.body.allowGravity = false;



    }

    function animupdate() {

        anim.physics.arcade.collide(Animplayer, tilesprite);
        Animplayer.animations.play('walk');
        Animplayer.x=anim.width/2;
    }
    function testdebug(){


    }




