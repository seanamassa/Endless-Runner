class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {

        console.log("Loading assets...");
        //this.load.path = './assets/'

        // Load graphics assets
        this.load.image('ninja', './assets/ninja.png')        
        this.load.image('ground', './assets/ground.png')         
        this.load.image('Background1', './assets/Background1.png')


    }

    create() {
        console.log("Assets loaded. Moving to Play Scene...");
        this.scene.start('playScene');
   
    }
}
