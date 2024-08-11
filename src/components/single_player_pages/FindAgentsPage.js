import React from "react";

const FindAgentsPage = () => {

    return (
        <div class="findAgents">
            <h3>Find Agents</h3>
            <div class="difficultyTable">
                <div class="headInfo">
                    <div class="difficultyHeader">DIFFICULTY</div>
                    <div class="agentsAvailable">AGENTS</div>
                    <div class="timeAvailable">TIME(s)</div>
                    <div class="movesAvailable">MOVES</div>
                </div>
                <div class="endless difficulty">
                    <div class="difficultyHeader">ENDLESS</div>
                    <div class="agentsAvailable"></div>
                    <div class="timeAvailable"></div>
                    <div class="movesAvailable"></div>
                </div>
                <div class="selectAgent">-</div>
                <ul class="selectAgentUl">
                    <li>2</li><li>3</li>
                    <li>4</li><li>5</li>
                    <li>6</li>
                </ul>
                <div class="easy difficulty">
                    <div class="difficultyHeader">EASY</div>
                    <div class="agentsAvailable"></div>
                    <div class="timeAvailable"></div>
                    <div class="movesAvailable"></div>
                </div>
                <div class="medium difficulty">
                    <div class="difficultyHeader">MEDIUM</div>
                    <div class="agentsAvailable"></div>
                    <div class="timeAvailable"></div>
                    <div class="movesAvailable"></div>
                </div>
                <div class="hard difficulty">
                    <div class="difficultyHeader">HARD</div>
                    <div class="agentsAvailable"></div>
                    <div class="timeAvailable"></div>
                    <div class="movesAvailable"></div>
                </div>
                <div class="detective difficulty">
                    <div class="difficultyHeader">DETECTIVE</div>
                    <div class="agentsAvailable"></div>
                    <div class="timeAvailable"></div>
                    <div class="movesAvailable"></div>
                </div>
                <div class="wizard difficulty">
                    <div class="difficultyHeader">WIZARD</div>
                    <div class="agentsAvailable"></div>
                    <div class="timeAvailable"></div>
                    <div class="movesAvailable"></div>
                </div>
            </div>
            <div class="continueToGame toGame" id="singlePlayerMainGame">CONTINUE</div>
        </div>
    )
}

export default FindAgentsPage