/***********************************************/
/* Author: Tony Pau
/* Title:  Rocket Patrol Unleashed
/* Time:   15-16hrs
/*
/* Mods Chosen:
/* Implement the 'FIRE' UI text from the original game (1)    (Note: When firing, on the top center where the green UI is, the text 'FIRE' will show)
/* Implement the speed increase that happens after 30 seconds in the original game (1)    (Note: Uhhh no note, just play the game to see I guess)
/* Add your own (copyright-free) looping background music to the Play scene (keep the volume low and be sure that multiple instances of your music don't play when the game restarts) (1)    (Note: check sources below this mods list)
/* 
/* Create a new title screen (e.g., new artwork, typography, layout) (3)    (Note: Made in photoshop using my spaceship sprite, shapes tool, brush, and the text took)
/* Implement parallax scrolling for the background (3)    (Note: The assets are starfield.png professor provided and the 2 I made: planet.png and land.png)
/* Display the time remaining (in seconds) on the screen (3)    (Note: You can see this in the top right when playing the game)
/* Create 4 new explosion sound effects and randomize which one plays on impact (3)     (Note: I made 5 new ones cause I miscounted but whatever)
/* 
/* Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (5)    (Note: its the speedcraft.png, I used photoshop and had my spaceship.png as the reference layer and made a new design over it so it was similar but different)
/*
/* Sources:
/* https://sfxr.me/    (Note: Used to make the sound effects)
/* https://freemusicarchive.org/home    (Note: Used this website to find free music, the one found is 'Red Skies' by HoliznaCC0. I just search 'chiptunes')
/***********************************************/
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play]
}
let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboad vars
let keyF, keyR, keyLEFT, keyRIGHT;