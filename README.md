Phased-Game
===========

A test of Phaser.io
Also an assignment for IT.

Some people don't have Node.js installed, so if you don't have Node.js/bower then extract this zip to the main directory


Platformer graphics by Kenney Vleugels (www.kenney.nl), soon to be replaced


## Scoring system
To Reset the score database run
```javascript
PouchDB.destroy('test', function(err, info) { });
db = new PouchDB('test');
```
From the console

