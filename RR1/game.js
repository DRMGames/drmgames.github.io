﻿//Regina Reynolds
//Team DRMGames
//Mod 1: Added Toy Story reference to status line.
//Mod 2: Changed grid size to 10x10.
//Mod 3: When a bead is hovered over, it turns gray and turns white again when exited.
//Mod 4: If a bead is clicked, it turns red, and an exclamation point appears inside of it. It stays like this when exited.
//Mod 5: If the grid is exited, the whole board fills with question marks. If the grid is reentered, all bead colors remain, but all of the glyphs are erased.


// game.js for Perlenspiel 3.2

// The "use strict" directive in the following line is important. Don't alter or remove it!
"use strict";

// The following comment lines are for JSLint/JSHint. Don't alter or remove them!

/*jslint nomen: true, white: true */
/*global PS */

/*
PS.init( system, options )
Called once after engine is initialized but before event-polling begins.
[system] = an object containing engine and platform information; see API documentation for details.
[options] = an object with optional parameters; see API documentation for details.
*/

var gridX=10;
var gridY=10;
var exitFlag;
var clickFlag;

//displays status
PS.init = function( system, options ) {
	PS.gridSize( gridX, gridY ); //X, Y parameters
	PS.statusText("You are a TOY! You aren't the real Buzz!");
    exitFlag=false;
    clickFlag=false;
};


/*
PS.touch ( x, y, data, options )
Called when the mouse button is clicked on a bead, or when a bead is touched.
It doesn't have to do anything.
[x] = zero-based x-position of the bead on the grid.
[y] = zero-based y-position of the bead on the grid.
[data] = the data value assigned to this bead by a call to PS.data(); default = 0.
[options] = an object with optional parameters; see API documentation for details.
*/

PS.touch = function( x, y, data, options ) {
	PS.color(x, y, PS.COLOR_RED);
	PS.audioPlay("fx_click");
	PS.glyph(x, y, "!");

	clickFlag=true;
};


/*
PS.enter ( x, y, button, data, options )
Called when the mouse/touch enters a bead.
It doesn't have to do anything.
[x] = zero-based x-position of the bead on the grid.
[y] = zero-based y-position of the bead on the grid.
[data] = the data value assigned to this bead by a call to PS.data(); default = 0.
[options] = an object with optional parameters; see API documentation for details.
*/

//When mouse cursor enters a bead
PS.enter = function( x, y, data, options ) {
    //turns that bead gray
    PS.color(x, y, PS.COLOR_GRAY);


    //erases any prior glyphs anywhere on the board
    if(exitFlag===true) {
        var varX = 0;
        var varY = 0;

        while (varX < gridX) {
            while (varY < gridY) {
                PS.glyph(varX, varY, " ");
                varY = varY + 1;
            }

            varX = varX + 1;
            varY = 0;
        }
        exitFlag=false;
    }
};



/*
PS.exit ( x, y, data, options )
Called when the mouse cursor/touch exits a bead.
It doesn't have to do anything.
[x] = zero-based x-position of the bead on the grid.
[y] = zero-based y-position of the bead on the grid.
[data] = the data value associated with this bead, 0 if none has been set.
[options] = an object with optional parameters; see API documentation for details.
*/

PS.exit = function( x, y, data, options ) {
    // Uncomment the following code line to inspect x/y parameters:
    //PS.debug( "PS.exit() @ " + x + ", " + y + "\n" );

    // Add code here for when the mouse cursor/touch exits a bead.
    if(clickFlag===false)
    {
        PS.color(x, y, PS.COLOR_WHITE);
    }

    if(clickFlag=== true)
    {
        clickFlag = false;
    }
};



/*
PS.exitGrid ( options )
Called when the mouse cursor/touch exits the grid perimeter.
It doesn't have to do anything.
[options] = an object with optional parameters; see API documentation for details.
*/

//Fills entire grid with question marks when grid is exited
PS.exitGrid = function( options ) {
	// Uncomment the following code line to verify operation:

	// PS.debug( "PS.exitGrid() called\n" );

	// Add code here for when the mouse cursor/touch moves off the grid.
    exitFlag=true;

    var varX=0;
    var varY=0;

    while(varX<gridX)
    {
        while(varY<gridY)
        {
            PS.glyph(varX, varY, "?");
            varY= varY+1;
        }

        varX= varX+1;
        varY=0;
    }
};

/*
Perlenspiel is a scheme by Professor Moriarty (bmoriarty@wpi.edu).
Perlenspiel is Copyright © 2009-17 Worcester Polytechnic Institute.
This file is part of Perlenspiel.

Perlenspiel is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Perlenspiel is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Lesser General Public License for more details.

You may have received a copy of the GNU Lesser General Public License
along with Perlenspiel. If not, see <http://www.gnu.org/licenses/>.
*/