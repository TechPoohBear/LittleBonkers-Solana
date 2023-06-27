import Phaser from "phaser";

import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import Loading from './scenes/Loading';
import Battle from "./scenes/Battle";
import BattleWeb from "./scenes/BattleWeb";
import Win from "./scenes/Win";


import { Link } from "react-router-dom";
import { isMobile } from "../../utils/utils";

const boardConfig = require("./config.json");

const Main = (props) => {

  const location = useLocation();

  useEffect(() => {
    const loading = new Loading({ key: 'loading' });
    const win = new Win({ key: 'win' });
    let player = location.state.player ? location.state.player : "Zephyr";
    let battle;
    if (isMobile())
      battle = new Battle({ key: 'battle', player: player });
    else {
      battle = new BattleWeb({ key: 'battle', player: player });
    }
    const config = {
      type: Phaser.AUTO,
      parent: "game",
      // ...boardConfig,
      physics: {
        default: "arcade",
        arcade: {
          //debug: true,
          gravityY: 0

        },
      },
      scale: {
        mode: isMobile() ? Phaser.Scale.NONE : Phaser.Scale.NONE,
        parent: "game",
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: isMobile() ? window.innerWidth : 800,
        height: isMobile() ? window.innerHeight : 400,
      },

      background: "green",
      scene: [loading, battle, win],

    };
    const game = new Phaser.Game(config);
    game.scene.start('loading');

    // return (() => {
    //   game = null;
    // })
  }, [])

  return <>

    {/* <Link to="/withdraw" id="navTowith" /> */}
    <div className="h-screen flex items-center justify-center">
      <div id="game"></div>
    </div>
    <Link to="/withdraw" id="navTowith" />
  </>;
};

export default Main;
