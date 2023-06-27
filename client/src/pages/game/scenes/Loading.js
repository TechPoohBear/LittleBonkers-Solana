import { Scene } from "phaser";
// import logo from '../assets/load/8.png';
import { isMobile } from "../../../utils/utils";
var width = isMobile() ? window.innerWidth : 800;
var height = isMobile() ? window.innerHeight : 400;

var description = `Peblo (Cets on Crek)*: Little Bonkers! Help me! I'm very badly wounded, but I need your help to deliver this *Melk to the edge of the Dark Forest. Be Careful! The OKAY Bears have... mutated. I... I... Love Crek. dies`;
class Loading extends Scene {
    constructor(props) {
        super(props);
    }
    preload() {
        this.load.image('story', require('../assets/sprites/story.png').default);
        // this.load.image('poweredBy', require('../assets/sprites/poweredBy.bmp').default)
        // this.load.image('amazon', require('../assets/sprites/amazon.jpg').default)
    }
    async create() {
        if (width < height) {
            this.cameras.main.rotation = Math.PI / 2;
            let sw = height / 400, sh = width / 200;

            // this.powered = this.add.text(-(height - width) / 2, height / 2, 'poweredBy').setOrigin(0, 0.5).setAlpha(0);
            this.story = this.add.image(-(height - width) / 2, height / 2, 'story').setAlpha(0).setOrigin(0, 0.5).setScale(sw, sh);

            this.dialogs = this.add.container(-(height - width) / 2, height - 100 - (height - width) / 2);

            // this.aws = this.add.image(-(height - width) / 2, height / 2, 'amazon').setAlpha(0).setOrigin(0, 0.5);
            let t = width;
            width = height;
            height = t;
        }
        else {
            // this.powered = this.add.text(width / 2, height / 2, 'poweredBy').setOrigin(0.5, 0.5).setAlpha(0);
            this.story = this.add.image(width / 2, height / 2, 'story').setAlpha(0).setScale(2, 2);
            this.dialogs = this.add.container(0, height - 100);
            // this.aws = this.add.image(width / 2, height / 2, 'amazon').setAlpha(0);
        }
        this.txt = this.add.text(10, 10, '', {
            color: '#ffffff'
        }).setOrigin(0, 0);

        this.skipTxt = this.add.text(width / 2, -50, 'Click here to skip...', {
            color: '#ffffff'
        }).setOrigin(0.5, 0.5);

        this.skipTxt.setInteractive();
        this.skipTxt.on('pointerup', () => {
            clearInterval(this.interv);
            this.scene.start("battle");
        });

        this.bar = this.add.rectangle(0, 0, width, 100, '0xd3854f').setOrigin(0, 0);
        this.insideBar = this.add.rectangle(6, 6, width - 12, 100 - 12, '0x000000').setOrigin(0, 0);

        this.dialogs.add([this.bar, this.insideBar, this.txt, this.skipTxt]).setAlpha(0);
        this.txt.setWordWrapWidth(width - 20);




        // await this.createFadeInAnimation(this.powered, 3000, 0);
        // await this.createFadeOutAnimation(this.powered, 3000, 0);
        // await this.createFadeInAnimation(this.aws, 3000, 0);
        // await this.createFadeOutAnimation(this.aws, 3000, 0);
        await this.createFadeInAnimation(this.story, 3000, 0);
        await this.createFadeInAnimation(this.dialogs, 500, 0);
        await this.startDialog();
        this.scene.start('battle');
    }
    update() {
        // 
    }
    async startDialog() {
        let skipText = this.add.text()
        return new Promise(resolve => {
            let len = description.length;
            let index = 0;
            this.interv = setInterval(() => {
                this.txt.setText(description.slice(0, index++));
                if (index > len) {
                    clearInterval(this.interv);
                    resolve(true);
                }
            }, 100)
        })
    }
    async createFadeInAnimation(obj, duration, delay) {
        return new Promise(resolve => {
            this.add.tween({
                targets: obj,
                alpha: 1,
                duration: duration,
                delay: delay,
                onComplete: () => {
                    resolve(true);
                },
            })
        })

    }
    async createFadeOutAnimation(obj, duration, delay) {
        return new Promise(resolve => {
            this.add.tween({
                targets: obj,
                alpha: 0,
                duration: duration,
                delay: delay,
                onComplete: () => {
                    resolve(true);
                },
            })
        })
    }


}
export default Loading;