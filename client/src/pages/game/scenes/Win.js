import { Scene } from "phaser";
// import logo from '../assets/load/8.png';
import { SHIBA, FIRE, LIGHTNING, ZEPHYR } from "../playerConfig";

import { isMobile } from "../../../utils/utils";
var height = !isMobile() ? 400 : window.innerHeight;
var width = !isMobile() ? 800 : window.innerWidth;


class Win extends Scene {
    constructor(props) {
        super(props);
        // this.type = props.type;

    }
    init(data) {
        this.type = data.type;
    }
    preload() {
        this.load.image("winLogo", require(`../assets/sprites/${this.type}_win.jpg`).default);
    }
    create() {
        let sw, sh;
        if (width < height) {
            this.cameras.main.rotation = Math.PI / 2;
            this.logo = this.add.image(-(height - width) / 2, height / 2, "winLogo").setOrigin(0, 0.5);
            let t = width;
            width = height;
            height = t;
        }
        else this.logo = this.add.image(width / 2, height / 2, "winLogo").setOrigin(0.5, 0.5);

        sw = width / 792;
        sh = height / 432;

        this.logo.setScale(sw, sh);
        this.logo.setAlpha(0);
        this.tweens.add({
            targets: this.logo,
            alpha: 1,
            duration: 5000,
            ease: "Power1",
            onComplete: () => { document.getElementById("navTowith").click(); }
        })
    }
    update() {

    }

}
export default Win;