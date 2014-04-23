// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation();


$('.button').on('click', Foundation.utils.debounce(function(e){
    $('#highscores').foundation('reveal', 'close');
    $('#level').foundation('reveal','close');
    game.state.start(game.state.current); // reset the game, should be replaced with something more reliable
}, 300, true));

function textUpdate(){
    Foundation.utils.S('#health').html(player.health );
    Foundation.utils.S('#gold').html(player.gold );
    Foundation.utils.S( "#xp").html( currentxp );
    //var node = document.getElementById('#health');
    //node.innerHTML('<p>some dynamic html</p>');
   /* node = document.getElementById('gold');
    node.innerHTML('<p>some dynamic html</p>');
    node = document.getElementById('xp');
    node.innerHTML('<p>some dynamic html</p>');
    Foundation.utils.S('#health').innerHTML=player.health;
    Foundation.utils.S('#gold').innerHTML=player.gold;
    Foundation.utils.S('#xp').innerHTML=currentxp; */
}

