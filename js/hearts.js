function initHearts(){
    logo1 = game.add.sprite(0, 0, 'heart');
    logo1.fixedToCamera = true;
    logo1.cameraOffset.setTo(100, 100);
    logo1.frame=0;
    logo2 = game.add.sprite(0, 0, 'heart');
    logo2.fixedToCamera = true;
    logo2.cameraOffset.setTo(200, 100);
    logo2.frame=1;
    logo3 = game.add.sprite(0, 0, 'heart');
    logo3.fixedToCamera = true;
    logo3.cameraOffset.setTo(300, 100);
    logo3.frame=2;
}