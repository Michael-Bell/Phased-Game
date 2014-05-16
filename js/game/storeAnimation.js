var anim,width;

function makeAnim(){
    width = $('#storeMiddle').width();
    width=Math.floor(width/70)*70;

    anim = new Phaser.Game(width, 300, Phaser.AUTO, 'animationDiv', { preload: animpreload, create: animcreate, update: animupdate });



    function animpreload() {

        anim.load.spritesheet('player', 'assets/character/sheet/sprite.png', 75, 96, 12);

        anim.load.image('floor','assets/ground.png');;

    }



var Animplayer;

    function animcreate() {


        // Start the physics engine
        anim.physics.startSystem(Phaser.Physics.ARCADE);
        anim.world.setBounds(0, 0, width+70, 300);
        //give the game gravity
        anim.physics.arcade.gravity.y = 100;
        // background color
        anim.stage.backgroundColor = 0x4488cc;
        // add player sprite
        Animplayer = anim.add.sprite(anim.width/2, anim.height-118, 'player');
        // add animations
        Animplayer.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 12);
        // Enable physics on the player
        anim.physics.enable(Animplayer, Phaser.Physics.ARCADE);
        //  Animplayer.body.collideWorldBounds = true;
        Animplayer.anchor.setTo(0.5, 0.5);
        // give velocity
        Animplayer.body.velocity.x = 200;

        // make a group
        group = anim.add.group();

        group.enableBody = true;

        group.physicsBodyType = Phaser.Physics.ARCADE;
        //math stuffs to ensure not too many blocks
        blocks = Math.floor(anim.width / 70)+1;

        for (i = -1; i <= blocks; i++) {
            var b = group.create(i * 70, anim.height - 70, 'floor');
            b.body.allowGravity = false;
            b.body.immovable = true;
            b.body.velocity.x = -200;

            // console.log(b);
        }

    }

    function animupdate() {
        anim.physics.arcade.collide(Animplayer, group);
        Animplayer.animations.play('walk');
        anim.physics.arcade.collide(group, group);
        group.forEach(function (item) {
            anim.world.wrap(item,69);
        });
        anim.world.wrap(Animplayer);
    }
}