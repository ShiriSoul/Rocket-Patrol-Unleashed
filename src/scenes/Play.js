class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload(){
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('speedcraft', './assets/speedcraft.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.image('planet', './assets/planet.png');
        this.load.image('land', './assets/land.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        this.planet = this.add.tileSprite(0, 0, 640, 480, 'planet').setOrigin(0, 0);
        this.land = this.add.tileSprite(0, 0, 640, 480, 'land').setOrigin(0, 0);

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0, 0);
        // add speedcraft
        this.speedcraft01 = new Speedcraft(this, game.config.width + borderUISize * 6, borderUISize * 4, 'speedcraft', 0, 50).setOrigin(0, 0);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start : 0, end: 9, first: 0}),
            frameRate:30
        });

        // initializes score
        this.p1Score = 0;
        // Display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2, this.p1Score, scoreConfig);

        // initializes the 'FIRE' text
        this.fire = ''
        // displays 'FIRE'
        let fireConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 70
        }
        this.fireCenter = this.add.text(game.config.width / 2, borderUISize + borderPadding * 2, this.fire, fireConfig);

         // initializes time
         this.timeRemaining = game.settings.gameTimer / 1000
         // displays time
         let timeConfig = {
             fontFamily: 'Courier',
             fontSize: '28px',
             backgroundColor: '#F3B141',
             color: '#843605',
             align: 'right',
             padding: {
                 top: 5,
                 bottom: 5
             },
             fixedWidth: 50
         }
         this.timeRight = this.add.text(game.config.width - borderUISize - borderPadding - timeConfig.fixedWidth, borderUISize + borderPadding * 2, this.timeRemaining, timeConfig);

        // GAME OVER flag
        this.gameOver = false;
        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        // speed up when 30-Seconds
        this.speedUp = this.time.delayedCall(30000, () => {
            this.ship01.moveSpeed++;
            this.ship02.moveSpeed++;
            this.ship03.moveSpeed++;
            this.speedcraft01.moveSpeed++;
        })

        // bg Music
        let bgmusic = this.sound.add('backgroundmusic');
        bgmusic.play();
    }

    update(){
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            this.scene.restart();
        }
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start("menuScene");
        }
        this.starfield.tilePositionX -= 1;
        this.planet.tilePositionX -= 2;
        this.land.tilePositionX -= 3;
        if(!this.gameOver){
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.speedcraft01.update();  // updates speedcraft
        }

        // check collision
        if(this.checkCollision(this.p1Rocket, this.ship03)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)){
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
        if (this.checkCollision(this.p1Rocket, this.speedcraft01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.speedcraft01);
        }

        // displays 'FIRE' when firing
        if (this.p1Rocket.isFiring) {
            this.fireCenter.text = 'FIRE'
            this.fireCenter.alpha = 1
        } else {
            this.fireCenter.text = ''
            this.fireCenter.alpha = 0
        }

        // updates the timer
        this.timeRight.setText(Math.ceil(this.clock.getOverallRemainingSeconds()));
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket. x < ship.x + ship.width && rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height && rocket.height + rocket.y > ship.y) {
            return true;
        } else {
            return false;
        }
    }

    shipExplode(ship){
        ship.alpha = 0;
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        // plays explosion sounds
        let explosions = [
            'soundeffect_explosion1',
            'soundeffect_explosion2',
            'soundeffect_explosion3',
            'soundeffect_explosion4',
            'soundeffect_explosion5'
        ]
        this.sound.play(explosions[Math.floor(Math.random() * explosions.length)]);
    }
}