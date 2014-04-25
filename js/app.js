// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();


$('.button').on('click', Foundation.utils.debounce(function(e){
    $('#highscores').foundation('reveal', 'close');
    $('#level').foundation('reveal','close');
    game.state.start(game.state.current); // reset the game, should be replaced with something more reliable
}, 300, true));


$('#restart').on('click', Foundation.utils.debounce(function(e){
    $('#scoreModal').foundation('reveal', 'close');

}, 300, true));

function textUpdate(){
    Foundation.utils.S('#health').html(player.health );
    Foundation.utils.S('#gold').html(player.gold );
    Foundation.utils.S( "#xp").html( currentxp );
}


$(document).on('close', '[data-reveal]', function () {
    var modal = $(this);
    game.input.keyboard.disabled=false;
    game.state.start('main'); // reset the game
    $('#submit').removeClass('disabled');
});