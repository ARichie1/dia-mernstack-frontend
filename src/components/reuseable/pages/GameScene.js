import React from "react";
import Screen from "../../ingame/Screen";
import PowerUps from "../../ingame/PowerUps";
import InGameMenu from "../../ingame/InGameMenu";
import InGameButtons from "../../ingame/InGameButtons";

const GameScene = () => {
    return (
        <div class="inGame">
            <div class="btnLeft">O</div>
            <div class="btnRight">Y</div>

            <PowerUps />
            <InGameMenu />
            <Screen />
            <InGameButtons />
        </div>
    )
}

export default GameScene