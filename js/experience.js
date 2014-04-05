var currentxp = 0;
var xpneeded= 2;
var currentlevel = 0;
var allocationpoints = 10;

if(currentxp >= xpneeded){
    currentlevel++;
    xpneeded=Math.floor(currentlevel^2/10+2);
    allocationpoints =+ 5+(Math.floor(INT/10));
}

var STR = 10;
var INT = 10;
var DEX = 10;
var LUK = 10;

var xpgain = function(xp){
    xp(Math.floor(INT/10));
};