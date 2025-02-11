/*
Endless Runner Title: Cyber Ninja

Created by Sean Massa

The game is an endlesss sidescrolling game where the player, a ninja. has to 
dodge shurikens and collect rice balls to increase your score. My creative tilt is...

Features added:
[]
[]
[]
[]
[]
[]
[]
[]
[]




*/
let config = {
    parent: 'myGame',
    type: Phaser.AUTO,
    width: 960,
    height: 640,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            // Set gravity for jumping mechanics
            gravity: {
                y: 1000
            },
            debug: true // Set to true if you need to visualize hitboxes
        }
    },
    scene: [ Load, Play ]
};

// Uncomment to reset stored high scores (useful for testing)
// localStorage.clear();

// Define game instance
let game = new Phaser.Game(config);

// Define global variables
let centerX = game.config.width / 2;
let centerY = game.config.height / 2;
let w = game.config.width;
let h = game.config.height;
const textSpacer = 64;

// Player controls
let cursors

// Jump properties
const JUMP_VELOCITY = -400;