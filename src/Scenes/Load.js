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
        
        // load audio
        this.load.audio('bgm', 'music.wav')
        this.load.audio('hitSound', 'Death1.wav') // Sound when hit by shuriken
        this.load.audio('pickup', 'Apple Bite.mp3')  // Sound when collecting rice ball
        this.load.audio('jump', 'jump_03.wav')  // Sound when jumping
    }

    create() {
        console.log("Assets loaded. Moving to Play Scene...");
        this.scene.start('titleScene');
   
    }
}
