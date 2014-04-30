/* TODO Document your codez!!! */
var currentxp = 0;
var xpneeded = 2;
var currentlevel = 1;
var allocationpoints = 10;

function xpcheck() {
	if (currentxp >= xpneeded) {
        currentlevel++;
		xpneeded = Math.floor(currentlevel*currentlevel);
		allocationpoints = allocationpoints + 5 + (Math.floor(INT / 10));
	}
}

var STR = 10;
var INT = 10;
var DEX = 10;
var LUK = 10;

function xpgain(xp) {
	currentxp = currentxp + xp * Math.floor((100 + INT / 10) / 100);
}
