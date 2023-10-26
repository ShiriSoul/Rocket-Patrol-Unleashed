class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        // load titlescreen
        this.load.image('titlescreen', './assets/titlescreen.png');
        // Load audio
        this.load.audio('soundeffect_select', './assets/blip_select.wav');
        this.load.audio('soundeffect_explosion1', './assets/explosion1.wav');
        this.load.audio('soundeffect_explosion2', './assets/explosion2.wav');
        this.load.audio('soundeffect_explosion3', './assets/explosion3.wav');
        this.load.audio('soundeffect_explosion4', './assets/explosion4.wav');
        this.load.audio('soundeffect_explosion5', './assets/explosion5.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.audio('backgroundmusic', './assets/HoliznaCC0 - Red Skies (volume adjusted).mp3');
    }

    create() {
        // show titlescreen
        this.titlescreen = this.add.image(0, 0, 'titlescreen').setOrigin(0, 0);
        // let menuConfig = {
        //     fontFamily: 'Courier',
        //     fontSize: '28px',
        //     backgroundColor: '#F3B131',
        //     color: '#843605',
        //     align: 'right',
        //     padding: {
        //         top: 5,
        //         bottom: 5,
        //     },
        //     fixedWidth: 0
        // }
        // this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
        // this.add.text(game.config.width/2, game.config.height/2, 'Use <--> arrows to move & (F) to fire', menuConfig).setOrigin(0.5);
        // menuConfig.backgroundColor = '#00FF00';
        // menuConfig.color = '#000';
        // this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update(){
        // left key sets to speed 3 (novice level) and right key sets to 4 speed (expert level)
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000
            }
            this.sound.play('soundeffect_select');
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000
            }
            this.sound.play('soundeffect_select');
            this.scene.start('playScene');
        }
    }
}