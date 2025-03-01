class Play extends Phaser.Scene {
    constructor() {
        super('playScene')
    }

    create() {

        console.log("Play Scene Started")

        // Enable keyboard controls
        this.cursors = this.input.keyboard.createCursorKeys()

        // Add scrolling background
        this.background = this.add.tileSprite(0, -10, this.sys.game.config.width, this.sys.game.config.height, 'Background1').setOrigin(0, 0)
 
        // Add ground
        // Set up ground as a moving platform
        this.ground = this.physics.add.staticGroup();
        let groundHeight = 3000; // Adjust this based on your asset
        this.groundSprite = this.add.tileSprite(0, this.sys.game.config.height - groundHeight, this.sys.game.config.width, groundHeight, 'ground').setOrigin(0, 1)
        this.physics.add.existing(this.groundSprite, true)
        //this.ground.create(1200, 1050, 'ground')//.setScale(2).refreshBody()
     
        // Add player
        this.player = this.physics.add.sprite(150, 100, 'ninja').setScale(6)
        this.player.setCollideWorldBounds(true)
        this.player.setGravityY(1000) // Adjust gravity to suit jumping        
        // Set player to always move forward
        this.player.setVelocityX(200)
        // Shrink the hitbox (adjust width and height)
        this.player.setBodySize(this.player.width * 0.5, this.player.height * 0.7) // 50% width, 70% height

        // Optionally, offset the hitbox if needed
        this.player.setOffset(this.player.width * 0.25, this.player.height * 0.3)
        
        // Collision between player and ground
        this.physics.add.collider(this.player, this.ground)
        
        // Input keys
        this.cursors = this.input.keyboard.createCursorKeys()

        this.jumpCount = 0; // Track jumps

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

        // Add shuriken group
        this.shurikens = this.physics.add.group()
        this.time.addEvent({
            delay: 2500, // Spawn shurikens every 2.5 seconds
            callback: this.spawnShuriken,
            callbackScope: this,
            loop: true
        })     
        
        

        // Collision detection between player and pickup
        this.physics.add.overlap(this.player, this.pickups, this.collectPickup, null, this)
        this.physics.add.overlap(this.player, this.shurikens, this.hitByShuriken, null, this)


        // Score tracking
        this.score = 0
        //this.scoreText = this.add.text(20, 20, 'Score: 0', { fontSize: '32px', fill: '#fff' })
        this.scoreText = this.add.bitmapText(20, 20, 'manga', `SCORE: ${this.score}`, 32)
    .setTint(0xffff00);
        
        // Speed increase timer
        this.time.addEvent({
            delay: 2000, // Every 2 seconds
            callback: () => {
                this.scrollSpeed += 0.5; // Adjust the increment as needed
                console.log(`Scroll Speed Increased: ${this.scrollSpeed}`);
            },
            callbackScope: this,
            loop: true
        })
    }

    update() {
        // Reset velocity so movement stops when no keys are pressed
        this.player.setVelocityX(0)

        //console.log(`VelocityY: ${this.player.body.velocity.y}, On Ground: ${this.player.body.blocked.down}`);
        if (this.player.body.blocked.down) {
            //console.log("Player is on the ground!");
            this.jumpCount = 0
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

        // Move pickups and shurikens to the left
        this.pickups.children.iterate((pickup) => {
            if (pickup) {
                pickup.x -= this.scrollSpeed
                if (pickup.x < -50) {
                    pickup.destroy()
                }
            }
        })

        this.shurikens.children.iterate((shuriken) => {
            if (shuriken) {
                shuriken.x -= this.scrollSpeed * 1.2 // Make shurikens move faster
                if (shuriken.x < -50) {
                    shuriken.destroy()
                }
            }
        })

        // Jumping logic
        if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
            if (this.jumpCount < 2) { // Allow max 2 jumps
                this.player.setVelocityY(-800); // Jump force
                this.jumpCount++;
                console.log(`Jump Count: ${this.jumpCount}`);
            }
        }   
    }
    spawnPickup() {
        let randomY = Phaser.Math.Between(200, this.sys.game.config.height - 100); // Random height between 200px and near the ground
        let pickup = this.pickups.create(this.sys.game.config.width, randomY, 'riceball')

        pickup.setScale(3)
        pickup.setVelocityX(-100) // Move left
        pickup.body.allowGravity = false // Disable gravity so it stays in place
    }

    spawnShuriken() {
        let randomY = Phaser.Math.Between(200, this.sys.game.config.height - 100)
        let shuriken = this.shurikens.create(this.sys.game.config.width, randomY, 'shuriken')

        shuriken.setScale(2);
        shuriken.setVelocityX(-150) // Moves faster than pickups
        shuriken.body.allowGravity = false
        shuriken.setAngularVelocity(300) // Adjust for desired spin speed

    }

    collectPickup(player, pickup) {
        pickup.destroy();
        this.score += 10;
        this.scoreText.setText(`SCORE: ${this.score}`)
    }

    hitByShuriken(player, shuriken) {
        console.log("Player hit by shuriken! Game over.")
        
        // Stop all movement
        this.player.setVelocity(0, 0)
        this.physics.pause() // Freeze game physics

        // Fade out the scene and transition to a game-over scene
        this.cameras.main.fadeOut(500, 0, 0, 0)
        this.time.delayedCall(1000, () => {
            this.scene.start('gameOverScene', { score: this.score })
        })
    }

}
