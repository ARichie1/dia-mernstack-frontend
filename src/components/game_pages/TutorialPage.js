import React from "react";

const TutorialPage = () => {

    return (
        <div className="tutorial">
            <h3> HOW TO PLAY</h3><br></br>
            <ul>
                <li>The goal is to find your opponent's/computer's selected agents(pictures) and their exact positions.</li> 
                <li>There are no repeated picture in the secret selection.</li>
                <li>Example : To test a combination, click on 4 different agents(pictures) on the screen.</li>
                <li>Then press the <span className="tutorialSendButton">SEND</span> button so your combination can be tested.</li>
                <li>
                    <p>Some results will appear above looking like : </p>
                    <br></br>
                    <div className="example">
                        <div className="codeout">
                            <img src="../../assets/images/faces/hater.jpg" id="codout1" className="code" type="button" alt="tut_img_1"/>
                            <img src="../../assets/images/faces/hulk.jpg" id="codeout2" className="code" type="button" alt="tut_img_2"/>
                            <img src="../../assets/images/faces/ninja.jpg" id="codeout3" className="code" type="button" alt="tut_img_3"/>
                            <img src="../../assets/images/faces/gow.jpg" id="codeout4" className="code" type="button"  alt="tut_img_4"/>
                        </div>
                        <div className="arrow">
                            <div className="arrowPack">
                                <div className="arrowHolder">
                                    <div className="arrowHead arrowParts"></div>
                                    <div className="arrowBody arrowParts"></div>
                                </div>
                            </div>
                        </div>
                        <div className="result">
                            <div className="status dead"><p className="statusText">D</p><span className="statusEmoji">&#128128;</span></div>
                            <div className="status dead"><p className="statusText">D</p><span className="statusEmoji">&#128128;</span></div>
                            <div className="status injured"><p className="statusText">I</p><span className="statusEmoji">&#129301;</span></div>
                            <div className="status alive"><p className="statusText">A</p><span className="statusEmoji">&#128519;</span></div>
                        </div>
                    </div>
                    <br></br>
                    <span className="tutorialresultsExplanation">2 dead, 1 injured, 1 alive </span>
                    <ul className="statusExplanation">
                        <li><strong><div className="status dead"><p className="statusText">D</p><span className="statusEmoji">&#128128;</span></div>Dead :</strong> means one of the agents(pictures) you selected is among the opponent's secret selection and is in the right position.[TERMINATED]</li>
                        <li><strong><div className="status injured"><p className="statusText">I</p><span className="statusEmoji">&#129301;</span></div>Injured :</strong> means one of the agents(pictures) you selected is among the opponent's secret selection but not in the right position.[BLEEDING]</li>
                        <li><strong><div className="status alive"><p className="statusText">A</p><span className="statusEmoji">&#128519;</span></div>Alive :</strong> means one of the agents(pictures) you selected is not among the opponent's secret selection.[SAFE]</li>
                    </ul>
                </li>
            </ul>
            <br></br>
            <p>Hoping you enjoy yourself &#128522; and keep playing &#128077;.</p>
        </div>
    )
}

export default TutorialPage