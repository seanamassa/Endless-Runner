class Title extends Phaser.Scene {
    constructor() {
        super({ key:'titleScene'})
    }

    create() {
        // add title screen text
        let title01 = this.add.bitmapText(centerX, centerY - 200, 'manga', 'CYBER NINJA', 64).setOrigin(0.5).setTint(0xff0000);
        //let title02 = this.add.bitmapText(centerX, centerY, 'manga', 'PADDLE PARKOUR P3', 64).setOrigin(0.5).setTint(0xff00ff).setBlendMode('SCREEN');
        //let title03 = this.add.bitmapText(centerX, centerY, 'manga', 'PADDLE PARKOUR P3', 64).setOrigin(0.5).setTint(0xffff00).setBlendMode('ADD');
        this.add.bitmapText(centerX, centerY + -60, 'manga', 'BY SEAN MASSA', 16).setOrigin(0.5);
        this.add.bitmapText(centerX, centerY +  10, 'manga', 'USE ARROWS KEYS TO MOVE UP TO JUMP. YOUR GOAL IS TO DODGE SHURIKENS AND COLLECT RICE BALLS', 24).setOrigin(0.5);
        this.add.bitmapText(centerX, centerY + 80, 'manga', 'YOUR GOAL IS TO DODGE SHURIKENS AND COLLECT RICE BALLS', 24).setOrigin(0.5);
        this.add.bitmapText(centerX, centerY + 180, 'manga', 'PRESS UP ARROW START', 36).setOrigin(0.5);



        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys();  
    }

    update() {
        // check for UP input
        if (Phaser.Input.Keyboard.JustDown(cursors.up)) {


            
            // start next scene
            this.scene.start('playScene');
        }
    }
}