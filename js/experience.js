var currentxp = 0;
var xpneeded= 1;
var currentlevel = 0;
var allocationpoints = 10;

if(currentxp >= xpneeded){
    currentlevel++;
    xpneeded=currentlevel^2/10;
    allocationpoints =+ 5+(Math.floor(INT/10));
}

var STR = Math.floor(Math.random)*25;
var INT = Math.floor(Math.random)*25;
var DEX = Math.floor(Math.random)*25;
var LUK = Math.floor(Math.random)*25;

var xpgain = function(xp){
    xp(Math.floor(INT/10));
};