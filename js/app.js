// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();


$('.button').on('click', Foundation.utils.debounce(function(e){
    $('#highscores').foundation('reveal', 'close');
    $('#level').foundation('reveal','close');
    game.state.start(game.state.current); // reset the game, should be replaced with something more reliable
}, 300, true));