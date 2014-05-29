/**
 * Welcome to the store, what would you like to buy?.
 */
//Listener to react to store button click
$('#CloseStore').on('click', Foundation.utils.debounce(function (e) {
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


function updateStore() {
    $('#JumpVelocity').text(jumpVelocity);
    $("#StoreHealth").text(player.health);
    $("#StoreXp").text(currentxp);
    $("#StoreGold").text(currentgold);
    $("#xpBox").text(currentxp + '/' + xpneeded);
    $('#xpMeter').css('width', currentxp / xpneeded * 100 + '%');
    $('#QLifespan').text(bulletLifespan / 1000);
    $('#WLifespan').text(WAmmo.missileLifespan / 1000);
    $('#ELifespan').text(EAmmo.missileLifespan / 1000);
    $('#RLifespan').text(RAmmo.life / 1000);
    $('#Qint').text(QAmmo.SHOT_DELAY / 1000);
    $('#Wint').text(WAmmo.SHOT_DELAY / 1000);
    $('#Eint').text(EAmmo.SHOT_DELAY / 1000);
    $('#Rint').text(RAmmo.SHOT_DELAY / 1000);
    $('#QVEL').text(QAmmo.BULLET_SPEED);
    $('#WVEL').text(WAmmo.BULLET_SPEED);
    $('#nJ').text(allowedjumps);
    $('#maxHealth').text(maxHealth);
    $('.pgold').text(currentgold);
}

$('#CloseStore').on('click', Foundation.utils.debounce(function (e) {
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

/* Add 500g */
$('#addGold').on('click', Foundation.utils.debounce(function (e) {
    currentgold += 500;
    updateStore();
}, true));

/* New Gun Buttons*/
$('#enableTNT').on('click', Foundation.utils.debounce(function (e) {
    if (currentgold >= EAmmo.cost) {
        EAmmo.enabled = true;
        currentgold -= EAmmo.cost
    }
}, true));
$('#enableMissile').on('click', Foundation.utils.debounce(function (e) {
    if (currentgold >= WAmmo.cost) {
        WAmmo.enabled = true;
        currentgold -= WAmmo.cost;
    }
}, true));
$('#enableLaser').on('click', Foundation.utils.debounce(function (e) {
    RAmmo.enabled = true;
}, true));

/* Lifespan Buttons */
LIFE_COST = 25;
$('#QLifeM').on('click', Foundation.utils.debounce(function (e) {
    if (bulletLifespan > 500) {
        bulletLifespan -= 500;
        currentgold += LIFE_COST;
        updateStore();

    }
}, true));
$('#QLifeA').on('click', Foundation.utils.debounce(function (e) {

    if (currentgold >= LIFE_COST) {
        bulletLifespan += 500;
        currentgold -= LIFE_COST;
        updateStore();
    }

}, true));

$('#WLifeM').on('click', Foundation.utils.debounce(function (e) {
    if (WAmmo.missileLifespan > 500) {
        WAmmo.missileLifespan -= 500;
        currentgold += LIFE_COST;
        updateStore();

    }
}, true));
$('#WLifeA').on('click', Foundation.utils.debounce(function (e) {
    if (currentgold >= LIFE_COST) {
        WAmmo.missileLifespan += 500;
        currentgold -= LIFE_COST;
        updateStore();

    }
}, true));

$('#ELifeM').on('click', Foundation.utils.debounce(function (e) {
    if (EAmmo.missileLifespan > 500) {
        EAmmo.missileLifespan -= 500;
        currentgold += LIFE_COST;
        updateStore();

    }
}, true));
$('#ELifeA').on('click', Foundation.utils.debounce(function (e) {
    if (currentgold >= LIFE_COST) {
        EAmmo.missileLifespan += 500;
        currentgold -= LIFE_COST;
        updateStore();

    }
}, true));

$('#RLifeM').on('click', Foundation.utils.debounce(function (e) {
    if (RAmmo.life > 500) {
        RAmmo.life -= 500;
        currentgold += LIFE_COST;
        updateStore();

    }
}, true));
$('#RLifeA').on('click', Foundation.utils.debounce(function (e) {
    if (currentgold >= LIFE_COST) {
        RAmmo.life += 500;
        currentgold -= LIFE_COST;
        updateStore();
    }
}, true));

/* Shooting Interval Code */
DELAY_COST = 25;
$('#QintM').on('click', Foundation.utils.debounce(function (e) {
    if (QAmmo.SHOT_DELAY > 500) {
        QAmmo.SHOT_DELAY -= 500;
        currentgold += DELAY_COST;
        updateStore();

    }
}, true));
$('#QintA').on('click', Foundation.utils.debounce(function (e) {

    if (currentgold >= DELAY_COST) {
        QAmmo.SHOT_DELAY += 500;
        currentgold -= DELAY_COST;
        updateStore();
    }

}, true));

$('#WintM').on('click', Foundation.utils.debounce(function (e) {
    if (WAmmo.SHOT_DELAY > 500) {
        WAmmo.SHOT_DELAY -= 500;
        currentgold += DELAY_COST;
        updateStore();

    }
}, true));
$('#WintA').on('click', Foundation.utils.debounce(function (e) {
    if (currentgold >= DELAY_COST) {
        WAmmo.SHOT_DELAY += 500;
        currentgold -= DELAY_COST;
        updateStore();

    }
}, true));

$('#EintM').on('click', Foundation.utils.debounce(function (e) {
    if (EAmmo.SHOT_DELAY > 500) {
        EAmmo.SHOT_DELAY -= 500;
        currentgold += DELAY_COST;
        updateStore();

    }
}, true));
$('#EintA').on('click', Foundation.utils.debounce(function (e) {
    if (currentgold >= DELAY_COST) {
        EAmmo.SHOT_DELAY += 500;
        currentgold -= DELAY_COST;
        updateStore();

    }
}, true));

$('#RintM').on('click', Foundation.utils.debounce(function (e) {
    if (RAmmo.SHOT_DELAY > 500) {
        RAmmo.SHOT_DELAY -= 500;
        currentgold += DELAY_COST;
        updateStore();

    }
}, true));
$('#RintA').on('click', Foundation.utils.debounce(function (e) {
    if (currentgold >= DELAY_COST) {
        RAmmo.SHOT_DELAY += 500;
        currentgold -= DELAY_COST;
        updateStore();
    }
}, true));


/* Bullet Velocity Modal */
DELAY_COST = 25;
$('#QVELM').on('click', Foundation.utils.debounce(function (e) {
    if (QAmmo.BULLET_SPEED > 50) {
        QAmmo.BULLET_SPEED -= 50;
        currentgold += DELAY_COST;
        updateStore();

    }
}, true));
$('#QVELA').on('click', Foundation.utils.debounce(function (e) {

    if (currentgold >= DELAY_COST) {
        QAmmo.BULLET_SPEED += 50;
        currentgold -= DELAY_COST;
        updateStore();
    }

}, true));

$('#WVELM').on('click', Foundation.utils.debounce(function (e) {
    if (WAmmo.BULLET_SPEED > 50) {
        WAmmo.BULLET_SPEED -= 50;
        currentgold += DELAY_COST;
        updateStore();

    }
}, true));
$('#WVELA').on('click', Foundation.utils.debounce(function (e) {
    if (currentgold >= DELAY_COST) {
        WAmmo.BULLET_SPEED += 50;
        currentgold -= DELAY_COST;
        updateStore();

    }
}, true));

/* Jump Velocity Handlers */
JV_COST = 25;
$('#JA').on('click', Foundation.utils.debounce(function (e) {
    if (currentgold >= JV_COST) {
        jumpVelocity += 50;
        currentgold -= JV_COST;
        updateStore();
    }
}, true));

$('#JM').on('click', Foundation.utils.debounce(function (e) {
    if (jumpVelocity > 50) {
        jumpVelocity -= 50;
        currentgold += JV_COST;
        updateStore();
    }
}, true));

/* Jump number Handlers */
J_COST = 100;
$('#nJa').on('click', Foundation.utils.debounce(function (e) {
    if (currentgold >= J_COST) {
        allowedjumps += 1;
        currentgold -= J_COST;
        updateStore();
    }
}, true));

$('#nJm').on('click', Foundation.utils.debounce(function (e) {
    if (allowedjumps > 1) {
        allowedjumps -= 1;
        currentgold += J_COST;
        updateStore();
    }
}, true));

/* Max Health */
HEALTH_COST = 30;
$('#maxHealthAdd').on('click', Foundation.utils.debounce(function (e) {
    if (currentgold >= HEALTH_COST && maxHealth < 40) {
        maxHealth += 10;
        currentgold -= HEALTH_COST;
        updateStore();
    }
}, true));

$('#maxHealthMinus').on('click', Foundation.utils.debounce(function (e) {
    if (maxHealth > 10) {
        maxHealth -= 10;
        currentgold += HEALTH_COST;
        updateStore();
    }
}, true));