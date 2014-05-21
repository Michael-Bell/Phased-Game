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
    $('#pgold').text(player.gold);
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
$('#enableTNT').on('click',Foundation.utils.debounce(function(e){
    if (player.gold>=EAmmo.cost) {
        EAmmo.enabled = true;
        player.gold -= EAmmo.cost
    }},true));
$('#enableMissile').on('click',Foundation.utils.debounce(function(e){
    if (player.gold>=WAmmo.cost) {
        WAmmo.enabled = true;
        player.gold-=WAmmo.cost;
    }},true));
$('#enableLaser').on('click',Foundation.utils.debounce(function(e){RAmmo.enabled=true;},true));

/* Lifespan Buttons */
LIFE_COST = 25;
$('#QLifeM').on('click',Foundation.utils.debounce(function(e){
    if (bulletLifespan>0) {
        bulletLifespan -= 500;
        player.gold += LIFE_COST;
        updateStore();

    }},true));
$('#QLifeA').on('click',Foundation.utils.debounce(function(e){

    if (player.gold>=LIFE_COST) {
        bulletLifespan += 500;
        player.gold -= LIFE_COST;
        updateStore();
    }

    },true));

$('#WLifeM').on('click',Foundation.utils.debounce(function(e){
    if (WAmmo.missileLifespan>0) {
        WAmmo.missileLifespan -= 500;
        player.gold += LIFE_COST;
        updateStore();

    }},true));
$('#WLifeA').on('click',Foundation.utils.debounce(function(e){
    if (player.gold>=LIFE_COST) {
        WAmmo.missileLifespan += 500;
        player.gold -= LIFE_COST;
        updateStore();

    }},true));

$('#ELifeM').on('click',Foundation.utils.debounce(function(e){
    if (EAmmo.missileLifespan>0) {
        EAmmo.missileLifespan -= 500;
        player.gold += LIFE_COST;
        updateStore();

    }},true));
$('#ELifeA').on('click',Foundation.utils.debounce(function(e){
    if (player.gold>=LIFE_COST) {
        EAmmo.missileLifespan += 500;
        player.gold -= LIFE_COST;
        updateStore();

    }},true));

$('#RLifeM').on('click',Foundation.utils.debounce(function(e){
    if (RAmmo.life>0) {
        RAmmo.life -= 500;
        player.gold += LIFE_COST;
        updateStore();

    }},true));
$('#RLifeA').on('click',Foundation.utils.debounce(function(e){
    if (player.gold>=LIFE_COST) {
        RAmmo.life += 500;
        player.gold -= LIFE_COST;
        updateStore();
    }},true));


