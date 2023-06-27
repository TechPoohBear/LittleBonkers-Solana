import { Scene } from "phaser";
import Phaser from "phaser";
import { Matter } from "phaser";

class Gatcha extends Scene {
    constructor(props) {
        super({
            physics: {
                default: 'matter',
                matter: {
                    enableSleeping: false,
                    debug: true,
                }
            },

        });

        this.circleRadius = (window.innerWidth > window.innerHeight ? window.innerHeight / 2 : window.innerWidth / 2) - 100;

        this.angle = 0;
        this.center = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
        }
        this.totalContourLength = 100;
        this.contourOffsetY = 100;
    }

    preload() {
        this.load.image('ball', require('../assets/sprites/ball.png').default);
    }
    create() {

        this.matter.world.setBounds(0, 0, window.innerWidth, window.innerHeight, 32, true, true, false, true);
        for (let i = 0; i < 99; i++) {
            const ball = this.matter.add.image(Phaser.Math.Between(this.center.x - this.circleRadius / 2 - 50, this.center.x + this.circleRadius / 2 - 50), Phaser.Math.Between(this.center.y - 200, this.center.y + 200), 'ball').setScale(0.2, 0.2);
            ball.setCircle(28);
            ball.setFriction(1);
            ball.setBounce(0.2);


        }

        const circle = new Phaser.Geom.Circle(this.center.x, this.center.y - 200, this.circleRadius);
        // Convert the circle into vertices

        const vertices = this.matter.verts.create(circle.getPoints(this.totalContourLength));

        // Create a body using the vertices
        this.contours = [];
        for (let i = 0; i < vertices.length - 10; i++) {

            let r = Math.random();


            const body = this.matter.add.image(vertices[i].x, vertices[i].y, 'ball').setScale(0.1, 0.1);
            if (r > 0.3) {
                body.setCircle(12.8);
            }
            else {
                body.setRectangle(100, 20);
            }
            body.setIgnoreGravity(true);
            body.setStatic(true);
            body.setFriction(100);
            body.ind = i;
            this.contours.push(body);


        }
        // Add the body to the Matter world
        this.matter.add.mouseSpring();
        this.arrows = this.input.keyboard.createCursorKeys();

    }
    update() {
        if (this.arrows.left.isDown) this.angle -= 0.1;
        else if (this.arrows.right.isDown) this.angle += 0.1;
        else return;
        let len = this.totalContourLength;
        for (let i = 0; i < this.contours.length; i++) {
            this.contours[i].setPosition(this.center.x + this.circleRadius * Math.cos((this.angle + this.contours[i].ind * 360 / len) * Math.PI / 180), this.center.y + this.circleRadius * Math.sin((this.angle + this.contours[i].ind * 360 / len) * Math.PI / 180) - this.contourOffsetY);
            this.contours[i].rotation += 0.1;
        }



    }
}
export default Gatcha;