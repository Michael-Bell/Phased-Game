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