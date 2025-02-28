class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create() {

        console.log("Play Scene Started")

        // Enable keyboard controls
        this.cursors = this.input.keyboard.createCursorKeys()

        // Add scrolling background
        this.background = this.add.tileSprite(0, -10, this.sys.game.config.width, this.sys.game.config.height, 'Background1').setOrigin(0, 0);
 
        // Add ground
        // Set up ground as a moving platform
        this.ground = this.physics.add.staticGroup();
        let groundHeight = 3000; // Adjust this based on your asset
        this.groundSprite = this.add.tileSprite(0, this.sys.game.config.height - groundHeight, this.sys.game.config.width, groundHeight, 'ground').setOrigin(0, 1);
        this.physics.add.existing(this.groundSprite, true);
        //this.ground.create(1200, 1050, 'ground')//.setScale(2).refreshBody()
     
        // Add player
        this.player = this.physics.add.sprite(150, 100, 'ninja').setScale(6)
        this.player.setCollideWorldBounds(true)
        this.player.setGravityY(1000); // Adjust gravity to suit jumping        
        // Set player to always move forward
        this.player.setVelocityX(200)

        // Collision between player and ground
        this.physics.add.collider(this.player, this.ground)
        
        // Input keys
        this.cursors = this.input.keyboard.createCursorKeys()

        // Scrolling speed
        this.scrollSpeed = 2

        // Add rice ball pickup group
        this.pickups = this.physics.add.group();

        // Spawn pickups at intervals
        this.time.addEvent({
            delay: 3000, // Every 3 seconds
            callback: this.spawnPickup,
            callbackScope: this,
            loop: true
        })

        // Collision detection between player and pickup
        this.physics.add.overlap(this.player, this.pickups, this.collectPickup, null, this)

        // Score tracking
        this.score = 0
        this.scoreText = this.add.text(20, 20, 'Score: 0', { fontSize: '32px', fill: '#fff' })
    }

    update() {
        // Reset velocity so movement stops when no keys are pressed
        this.player.setVelocityX(0)

        //console.log(`VelocityY: ${this.player.body.velocity.y}, On Ground: ${this.player.body.blocked.down}`);
        if (this.player.body.blocked.down) {
            //console.log("Player is on the ground!");
        }

        if (this.cursors.up.isDown) {
            //console.log("Up key pressed!");
        }
    
        if (this.cursors.up.isDown && this.player.body.touching.down) {
            //console.log("Jump executed!");
            this.player.setVelocityY(-400)
        }

        // Left movement
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-250) // Move left
            this.player.setFlipX(true) // Flip sprite to face left
        }
        // Right movement
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(250) // Move right
            this.player.setFlipX(false) // Face right
        }

        // Scroll background
        this.background.tilePositionX += this.scrollSpeed * 0.5 // Move background slower for a parallax effect

        // Scroll ground
        this.groundSprite.tilePositionX += this.scrollSpeed // Move ground at full speed

        // Move pickups to the left
        this.pickups.children.iterate((pickup) => {
            if (pickup) {
                pickup.x -= this.scrollSpeed * 2
                if (pickup.x < -50) { // Remove off-screen pickups
                    pickup.destroy()
                }
            }
        })

        // Jumping
        if (this.cursors.up.isDown && this.player.body.blocked.down) {
            this.player.setVelocityY(-1000) // Jump force
            //console.log("Jumping!"); // Debugging message
        }    
    }
    spawnPickup() {
        let randomY = Phaser.Math.Between(200, this.sys.game.config.height - 100); // Random height between 200px and near the ground
        let pickup = this.pickups.create(this.sys.game.config.width, randomY, 'riceball');

        pickup.setScale(3);
        pickup.setVelocityX(-100); // Move left
        pickup.body.allowGravity = false; // Disable gravity so it stays in place
    }

    collectPickup(player, pickup) {
        pickup.destroy();
        this.score += 10;
        this.scoreText.setText(`Score: ${this.score}`);
    }


}
