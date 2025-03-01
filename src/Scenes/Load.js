class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {

        console.log("Loading assets...");
        this.load.path = './assets/'

        // Load graphics assets
        this.load.image('Background1', 'background2.png')
        this.load.image('menu', 'Menu.png')
        this.load.image('ninja', 'ninja.png')        
        this.load.image('ground', 'ground.png')         
        this.load.image('riceball', 'riceball.png')
        this.load.image('shuriken', 'shuriken.png')

        // load bitmap font
        this.load.bitmapFont('manga', 'manga.png', 'manga.xml')
    }

    create() {
        console.log("Assets loaded. Moving to Play Scene...");
        this.scene.start('playScene');
   
    }
}
