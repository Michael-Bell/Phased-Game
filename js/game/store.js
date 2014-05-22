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
    $('#Qint').text(QAmmo.SHOT_DELAY/1000);
    $('#Wint').text(WAmmo.SHOT_DELAY/1000);
    $('#Eint').text(EAmmo.SHOT_DELAY/1000);
    $('#Rint').text(RAmmo.SHOT_DELAY/1000);
    $('.pgold').text(player.gold);
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
    if (bulletLifespan>500) {
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
    if (WAmmo.missileLifespan>500) {
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
    if (EAmmo.missileLifespan>500) {
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
    if (RAmmo.life>500) {
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

/* Shooting Interval Code */
DELAY_COST = 25;
$('#QintM').on('click', Foundation.utils.debounce(function (e) {
    if (QAmmo.SHOT_DELAY > 500) {
        QAmmo.SHOT_DELAY -= 500;
        player.gold += DELAY_COST;
        updateStore();

    }
}, true));
$('#QintA').on('click', Foundation.utils.debounce(function (e) {

    if (player.gold >= DELAY_COST) {
        QAmmo.SHOT_DELAY += 500;
        player.gold -= DELAY_COST;
        updateStore();
    }

}, true));

$('#WintM').on('click', Foundation.utils.debounce(function (e) {
    if (WAmmo.SHOT_DELAY > 500) {
        WAmmo.SHOT_DELAY -= 500;
        player.gold += DELAY_COST;
        updateStore();

    }
}, true));
$('#WintA').on('click', Foundation.utils.debounce(function (e) {
    if (player.gold >= DELAY_COST) {
        WAmmo.SHOT_DELAY += 500;
        player.gold -= DELAY_COST;
        updateStore();

    }
}, true));

$('#EintM').on('click', Foundation.utils.debounce(function (e) {
    if (EAmmo.SHOT_DELAY > 500) {
        EAmmo.SHOT_DELAY -= 500;
        player.gold += DELAY_COST;
        updateStore();

    }
}, true));
$('#EintA').on('click', Foundation.utils.debounce(function (e) {
    if (player.gold >= DELAY_COST) {
        EAmmo.SHOT_DELAY += 500;
        player.gold -= DELAY_COST;
        updateStore();

    }
}, true));

$('#RintM').on('click', Foundation.utils.debounce(function (e) {
    if (RAmmo.SHOT_DELAY > 500) {
        RAmmo.SHOT_DELAY -= 500;
        player.gold += DELAY_COST;
        updateStore();

    }
}, true));
$('#RintA').on('click', Foundation.utils.debounce(function (e) {
    if (player.gold >= DELAY_COST) {
        RAmmo.SHOT_DELAY += 500;
        player.gold -= DELAY_COST;
        updateStore();
    }
}, true));


/* Bullet Velocity Modal */
DELAY_COST = 25;
$('#QVELM').on('click', Foundation.utils.debounce(function (e) {
    if (QAmmo.BULLET_SPEED > 50) {
        QAmmo.BULLET_SPEED -= 50;
        player.gold += DELAY_COST;
        updateStore();

    }
}, true));
$('#QVELA').on('click', Foundation.utils.debounce(function (e) {

    if (player.gold >= DELAY_COST) {
        QAmmo.BULLET_SPEED += 50;
        player.gold -= DELAY_COST;
        updateStore();
    }

}, true));

$('#WVELM').on('click', Foundation.utils.debounce(function (e) {
    if (WAmmo.BULLET_SPEED > 50) {
        WAmmo.BULLET_SPEED -= 50;
        player.gold += DELAY_COST;
        updateStore();

    }
}, true));
$('#WVELA').on('click', Foundation.utils.debounce(function (e) {
    if (player.gold >= DELAY_COST) {
        WAmmo.BULLET_SPEED += 50;
        player.gold -= DELAY_COST;
        updateStore();

    }
}, true));

$('#EVELM').on('click', Foundation.utils.debounce(function (e) {
    if (EAmmo.BULLET_SPEED > 50) {
        EAmmo.BULLET_SPEED -= 50;
        player.gold += DELAY_COST;
        updateStore();

    }
}, true));
$('#EVELA').on('click', Foundation.utils.debounce(function (e) {
    if (player.gold >= DELAY_COST) {
        EAmmo.BULLET_SPEED += 50;
        player.gold -= DELAY_COST;
        updateStore();

    }
}, true));

$('#RVELM').on('click', Foundation.utils.debounce(function (e) {
    if (RAmmo.BULLET_SPEED > 50) {
        RAmmo.BULLET_SPEED -= 50;
        player.gold += DELAY_COST;
        updateStore();

    }
}, true));
$('#RVELA').on('click', Foundation.utils.debounce(function (e) {
    if (player.gold >= DELAY_COST) {
        RAmmo.BULLET_SPEED += 50;
        player.gold -= DELAY_COST;
        updateStore();
    }
}, true));

