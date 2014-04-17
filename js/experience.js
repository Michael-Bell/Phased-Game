/* TODO Document your codez!!! */
var currentxp = 0;
var xpneeded = 2;
var currentlevel = 0;
var allocationpoints = 10;

function xpcheck() {
	if (currentxp >= xpneeded) {
		currentlevel++;
		xpneeded = Math.floor(currentlevel^(2) / 10 + 2);
		allocationpoints = allocationpoints + 5 + (Math.floor(INT / 10));
	}
};

var STR = 10;
var INT = 10;
var DEX = 10;
var LUK = 10;

function xpgain(xp) {
	currentxp = currentxp + xp * (100 + Math.floor(INT / 10)) / 100;
};
