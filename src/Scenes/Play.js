class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create() {
        // Add player
        this.player = this.physics.add.sprite(150, 450, 'ninja').setScale(10)
        this.player.setCollideWorldBounds(true)
        //this.player.setGravityY(1000); // Adjust gravity to suit jumping
        
        // Set player to always move forward
        this.player.setVelocityX(200)
        
        // Add ground
        this.ground = this.physics.add.staticSprite(400, 580, 'ground').setScale(5).refreshBody();

        this.ground.create(400, 550, 'ground')//.setScale(2).refreshBody()
        
        // Collision between player and ground
        this.physics.add.collider(this.player, this.ground)
        
        // Input keys
        this.cursors = this.input.keyboard.createCursorKeys()
    }

    update() {
        // Jumping
        if (this.cursors.up.isDown || this.cursors.space.isDown) {
            if (this.player.body.touching.down) {
                this.player.setVelocityY(-500) // Jump force
            }
        }
    }
}
