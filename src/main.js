/*
Game Title: Cyber Ninja
Created by Sean Massa
Approximate hours spent 20+

The game is an endlesss sidescrolling game where the player, a ninja. has to 
dodge shurikens and collect rice balls to increase your score.

Features added:
[X] Title Play and Game Over scenes
[X] Player character with movement with arrow keys Jump with up arrow
[X] Allow a double jump
[X] Create rice balls as a pick up with a score counter
[X] Create shurikens that can kill the player
[X] Added faster scrolling with time for an increase in difficulty
[X] Added Sound effects for the player jump, pickup, and death
[X] Looping Background music
[] Added animation to the player character using a spritesheet

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
    scene: [ Load, Title, Play, GameOver]
}

// Uncomment to reset stored high scores (useful for testing)
// localStorage.clear();

// Define game instance
let game = new Phaser.Game(config)

// Define global variables
let centerX = game.config.width / 2
let centerY = game.config.height / 2
let w = game.config.width
let h = game.config.height
const textSpacer = 64

// Player controls
let cursors

// Jump properties
const JUMP_VELOCITY = -400