import { Scene } from 'phaser'

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera
    background: Phaser.GameObjects.Image
    msg_text: Phaser.GameObjects.Text

    constructor() {
        super('Game')
    }

    preload() {
        this.load.image('ghost_plain', 'assets/ghost_plain.png')
    }

    create() {
        this.camera = this.cameras.main
        this.camera.setBackgroundColor(0x00ff00)

        this.background = this.add.image(512, 384, 'background')
        this.background.setAlpha(0.5)

        const ghost = this.add.image(0, 0, 'ghost_plain')
        const ghostRatio = this.camera.height / ghost.height
        ghost.setSize(ghost.width * ghostRatio, ghost.height * ghostRatio)
        ghost.setPosition(ghost.width / 2, this.camera.height / 2)

        const header = this.add
            .text(ghost.width * ghostRatio + 50, this.camera.height / 3, 'Is this ghost very good?', {
                fontSize: 38,
                color: '#000',
                strokeThickness: 8,
                wordWrap: { width: 400 },
            })
            .setOrigin(0, 0)

        this.yesButton = this.add
            .text(ghost.width * ghostRatio + 50, this.camera.height / 3 + 200, 'Yes!', {
                fontSize: 38,
                color: '#000',
                strokeThickness: 8,
                wordWrap: { width: 400 },
            })
            .setInteractive()
        this.yesButton.on('pointerdown', pointer => {
            this.scene.start('YouWin')
        })

        this.noButton = this.add
            .text(ghost.width * ghostRatio + 50, this.camera.height / 3 + 300, 'No!', {
                fontSize: 38,
                color: '#000',
                strokeThickness: 8,
                wordWrap: { width: 400 },
            })
            .setInteractive()

        this.noButton.on('pointerdown', pointer => {
            this.scene.start('GameOver')
        })
    }

    update() {
        this.input.on('pointermove', pointer => {
            const noX = this.noButton.x
            const noY = this.noButton.y
            const mX = pointer.x
            const mY = pointer.y

            let corner: [number, number]

            if (noX < mX && noY < mY) {
                corner = [noX + this.noButton.width, noY + this.noButton.height]
            } else if (noX < mX && noY > mY) {
                corner = [noX + this.noButton.width, noY]
            } else if (noX > mX && noY < mY) {
                corner = [noX, noY + this.noButton.height]
            } else {
                corner = [noX, noY]
            }

            const dist = Phaser.Math.Distance.Between(mX, mY, ...corner)
            if (dist < 50) {
                this.noButton.setPosition(this.noButton.x + (noX < mX ? -5 : 5), this.noButton.y + (noY < mY ? -5 : 5))
            }
        })
    }
}
