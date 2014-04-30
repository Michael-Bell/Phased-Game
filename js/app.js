// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();





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
    if (modal.context.id === scoreModal) {
    game.input.keyboard.disabled = false;
    //  game.state.start('main'); // reset the game
    $('#submit').removeClass('disabled');
}
});