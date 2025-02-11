class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create() {

        console.log("Play Scene Started")

        // Enable keyboard controls
        this.cursors = this.input.keyboard.createCursorKeys()

        // Add player
        this.player = this.physics.add.sprite(150, 100, 'ninja').setScale(6)
        this.player.setCollideWorldBounds(true)
        this.player.setGravityY(1000); // Adjust gravity to suit jumping
        
        // Set player to always move forward
        this.player.setVelocityX(200)
        
        // Add ground
        this.ground = this.physics.add.staticImage(400, 250, 'ground')

        //this.ground.create(1200, 1050, 'ground')//.setScale(2).refreshBody()
        
        // Collision between player and ground
        this.physics.add.collider(this.player, this.ground)
        
        // Input keys
        this.cursors = this.input.keyboard.createCursorKeys()

        if(!this.textures.exists('ninja')){
            console.error("Ninja texture missing")
        }
    }

    update() {
        // Reset velocity so movement stops when no keys are pressed
        this.player.setVelocityX(0);

        console.log(`VelocityY: ${this.player.body.velocity.y}, On Ground: ${this.player.body.blocked.down}`);
        if (this.player.body.blocked.down) {
            console.log("Player is on the ground!");
        }

        if (this.cursors.up.isDown) {
            console.log("Up key pressed!");
        }
    
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            console.log("Jump executed!");
            this.player.setVelocityY(-400);
        }

        // Left movement
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160); // Move left
            this.player.setFlipX(true); // Flip sprite to face left
        }
        // Right movement
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160); // Move right
            this.player.setFlipX(false); // Face right
        }

        // Jumping
        if (this.cursors.up.isDown && this.player.body.blocked.down) {
            this.player.setVelocityY(-1000); // Jump force
            console.log("Jumping!"); // Debugging message
        }
    }
}
