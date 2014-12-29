```
FLUID LAYOUT WITH BOXES

Acceptance criteria
Create markup that creates 2 containers
Create/generate markup for 1 initial box
Now for some rules
Items
Layout
Should react responsively to the available width (within reason)
Container1
Should never exceed a width of 960px
Should be filled with a background image of your choice
Container2
Should never exceed a width of 860px
Should have a gray background
Rows
The 1st row should contain 3 boxes (1/3)
The 2nd row should contain 2 boxes (1/2)
The 3rd row should contain 1 box (1/1)
After row 3, it starts over again with 3 boxes
Boxes
A box has a header and a content area
A box has a unique id number in the header
A box displays its neighboring boxes’ id numbers in its content area
(“neighboring” being defined as horizontally adjacent)
Box background
The 2nd (2 mod 4) box should have a red background
The 3rd (3 mod 4) box should have a green background
The 4th (4 mod 4) box should have a blue background
Start over
Last box
The last box in the grid should be highlighted
Behavior
Every time you hover a box
The box should show a 5px black border
Container1 should show a 10px black border
Container2 should show a 15px black border
Every time you click on a box
A new box should be created and inserted directly after the box you just
clicked, pushing any trailing existing boxes down and right
Container2’s background should become progressively darker gray
Make it possible to delete a box
The layout and colors shouldn’t break if you delete a box, move the other
boxes to fill up the deleted box’s space
Every time you delete a box
Container2’s background should become progressively lighter gray
A friendly message should appear on screen telling which box that was
deleted
Application state
Johnson needs a solution where you can close the browser, and then
return to the page in the same application state you left it.
Show some statistics
There should exist some user friendly statistics somewhere on the page
that keeps track of how many boxes that are currently visible, and how
many boxes that have been deleted within the session.
Bonus
Bonus tasks
Browser compatibility. (IE8+)
Add a test suite
Sketch
Boxes have mainly been added by clicking the last box.
Box 7 has been removed.
=====CONTAINER1============================================
| |
| =====CONTAINER2================================== |
| | | |
| | ROW1 | |
| | |---------| |---------| |---------| | |
| | |[1] x | |[2] x | |[3] x | | |
| | |---------| |---------| |---------| | |
| | | 2 | | 1 3 | | 2 | | |
| | |---------| |---------| |---------| | |
| | | |
| | ROW2 | |
| | |----------------| |---------------| | |
| | |[4] x | |[5] x | | |
| | |----------------| |---------------| | |
| | | 5 | | 4 | | |
| | |----------------| |---------------| | |
| | | |
| | ROW3 | |
| | |-----------------------------------| | |
| | |[10] x | | |
| | |-----------------------------------| | |
| | | | | |
| | |-----------------------------------| | |
| | | |
| | ROW4 (STARTS OVER) | |
| | |---------| |---------| |---------| | |
| | |[6] x | |[8] x | |[9] x | | |
| | |---------| |---------| |---------| | |
| | | 8 | | 6 9 | | 8 | | |
| | |---------| |---------| |---------| | |
| | | |
| ================================================= |
| |
===========================================================
```
