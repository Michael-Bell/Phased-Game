var currentxp = 0;
var xpneeded= 1;
var currentlevel = 0;
var allocationpoints = 10;

if(currentxp >= xpneeded){
    currentlevel++;
    xpneeded=currentlevel^2/10;
    allocationpoints =+ 5+(Math.floor(INT/10));
}

var STR = 10;
var INT = 10;
var DEX = 10;
var LUK = 10;

var xpgain = function(xp){
    xp(Math.floor(INT/10));
};