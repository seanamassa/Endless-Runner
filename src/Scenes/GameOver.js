class GameOver extends Phaser.Scene {
    constructor() {
        super({ key:'gameOverScene'})
    }

    create() {
        console.log("GameOver Scene Loaded")
        //this.add.image(centerX, centerY, 'menu');
        // Display "Game Over" text
        this.add.bitmapText(centerX, centerY - 50, 'manga', 'GAME OVER', 72).setOrigin(0.5).setTint(0xff0000)
        this.add.bitmapText(centerX, centerY +100, 'manga', 'PRESS SPACE TO RESTART', 32).setOrigin(0.5)
        this.add.bitmapText(centerX, centerY + 200, 'manga', 'PRESS UP ARROW TO RETURN TO MENU', 36).setOrigin(0.5);

        // Restart game on space key press
        this.input.keyboard.once('keydown-SPACE', () => {
            console.log("SPACE Pressed! Restarting Game..."); // Debugging
            this.scene.start('playScene') // Restart the game
        })

        // Restart game on space key press
        this.input.keyboard.once('keydown-UP', () => {
            console.log("UP Pressed! Returning to Title..."); // Debugging
            this.scene.start('titleScene') // Restart the game
        })


    }
}