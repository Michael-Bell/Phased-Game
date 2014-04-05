function initHearts(){
    heartGroup = game.add.group()
    for(i=0; i<10; i++){
        x = 202+(i*40);
        y = 700;
        var c = heartGroup.create(0,0, 'heart', 0);
        c.name = 'heart' + i;
        c.fixedToCamera = true;
        c.cameraOffset.setTo(x,600-35-10);
        c.scale.setTo(.5,.5);

        c.frame=1;
        console.log("heart # " + i + " done");
        console.log("x: " + x + " y:"+y );
    }
}




