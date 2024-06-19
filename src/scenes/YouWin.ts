import { Scene } from 'phaser'

export class YouWin extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera
    background: Phaser.GameObjects.Image
    msg_text: Phaser.GameObjects.Text

    constructor() {
        super('YouWin')
    }

    preload() {
        this.load.image('ghost_sparkle', 'assets/ghost_sparkle.png')
    }

    create() {
        this.camera = this.cameras.main
        this.camera.setBackgroundColor(0x00ff00)
        this.add.image(this.camera.centerX, this.camera.centerY, 'ghost_sparkle')
    }
}
