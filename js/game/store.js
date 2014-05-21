/**
 * Welcome to the store, what would you like to buy?.
 */
//Listener to react to store button click
$('#CloseStore').on('click', Foundation.utils.debounce(function(e){
    //Resume the game
    game.paused = false;
    //enable key logger from game
    game.input.keyboard.disabled = false;
    //Show the Main Window Contents
    $('#mainContent').removeClass('hide');
    //Hide the store window
    $('#storeWindow').addClass('hide');
    pauseAni();
}, 300, true));

width = $('#storeMiddle').width();
$('#storeWindow').addClass('hide');


function updateStore(){
    $("#StoreHealth").text(player.health);
    $("#StoreXp").text(currentxp);
    $("#StoreGold").text(player.gold);
    $("#xpBox").text(currentxp+'/'+xpneeded);
    $('#xpMeter').css('width', currentxp/xpneeded*100 + '%');
    $('#QLifespan').text(bulletLifespan/1000);
    $('#WLifespan').text(WAmmo.missileLifespan/1000);
    $('#ELifespan').text(EAmmo.missileLifespan/1000);
    $('#RLifespan').text(RAmmo.life/1000);
}

$('#CloseStore').on('click', Foundation.utils.debounce(function(e){
    //Resume the game
    game.paused = false;
    //enable key logger from game
    game.input.keyboard.disabled = false;
    //Show the Main Window Contents
    $('#mainContent').removeClass('hide');
    //Hide the store window
    $('#storeWindow').addClass('hide');
    pauseAni();
}, 300, true));

/* New Gun Buttons*/
$('#enableTNT').on('click',Foundation.utils.debounce(function(e){EAmmo.enabled=true;},true));
$('#enableMissile').on('click',Foundation.utils.debounce(function(e){WAmmo.enabled=true;},true));
$('#enableLaser').on('click',Foundation.utils.debounce(function(e){RAmmo.enabled=true;},true));

/* Lifespan Buttons */
$('#QLifeM').on('click',Foundation.utils.debounce(function(e){bulletLifespan-=500; updateStore();},true));
$('#QLifeA').on('click',Foundation.utils.debounce(function(e){bulletLifespan+=500; updateStore();},true));

$('#WLifeM').on('click',Foundation.utils.debounce(function(e){WAmmo.missileLifespan-=500; updateStore();},true));
$('#WLifeA').on('click',Foundation.utils.debounce(function(e){WAmmo.missileLifespan+=500; updateStore();},true));

$('#ELifeM').on('click',Foundation.utils.debounce(function(e){EAmmo.missileLifespan-=500; updateStore();},true));
$('#ELifeA').on('click',Foundation.utils.debounce(function(e){EAmmo.missileLifespan+=500; updateStore();},true));

$('#RLifeM').on('click',Foundation.utils.debounce(function(e){EAmmo.missileLifespan-=500; updateStore();},true));
$('#RLifeA').on('click',Foundation.utils.debounce(function(e){EAmmo.missileLifespan+=500; updateStore();},true));


