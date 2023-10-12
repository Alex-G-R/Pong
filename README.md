# Pong

Pong game with game modes like: PVP, Bots with 5 levels of difficulty, Campain, Level creator with both PVP mode and vsBots

PVP Mode - Works just like you would imagine, player one moves by W and S player two moves by arrows

Player vs Computer - I implemented 5 levels of difficulty, easy, medium, hard, insane and impossible good luck!

Campain - You have 4 levels in campain with diffrent modificators.

Sandbox/level creation - You have multiple modificators to change apperance, logic, and diffrent values like opponent speed, bacground color, ball size, player paddle size by witch you can create perfect or just fun game for yourself. You can also play with friend! Just pick PVP option and start the game. Player moves by W and S, Opponent(Player two) moves By ArrowUp and Arrow Down!

In levels or custom games where you play againts bots your controls are Arrows (Up & Down)
However in PVP games your controls (Player one) are W and S. 

You can try it out <a href="https://alex-g-r.github.io/Pong/" target="_blank">here<a/>!

Good luck and have fun playing!
<br>
<br>
To run this app on your PC you need to have some sort of a server.
You can't run it directily from files. 
I personaly would reccomend Live Server (VS code extention)
But there are other options (copied from Stack Overflow - <a href="https://stackoverflow.com/questions/52919331/access-to-script-at-from-origin-null-has-been-blocked-by-cors-policy/66951910#66951910?newreg=e180875d1b424d43825b58368bd4b459)">link</a>

"Looks like you're trying to open the web-page locally (via file:// protocol) i.e. double clicking the .html file.
Unfortunately modules only work via HTTP(s), so all you need to do is use a local web server. Popular choices include:

 - Live Server, a VS Code extension that adds a right-click option to run your pages with a local server.
  
 - Node static server, a simple http server to serve static resource files from a local directory.
   
 - Node live server is easy to install and use:
 ( npm install -g live-server // Install globally via npm )
 ( live-server                // Run in the html's directory)
   
 - Or even shorter and without altering your packages:
 (npx live-server)"

