import React, { useState } from "react";

const LocalPlayJoinPage = () => {
    const [selectedHost, setSelectedHost] = useState({
        active: false,
        selectedHostDetails: {
            name : "Timmy",
            imgSrc : "../../../assets/images/faces/asta2.jpeg"
        }
    })
    const [showHostList, setShowHostList] = useState({
        opened: false,
        buttonColor: "var(--themeColor)",
        buttonBackground: "transparent"
    })
    
    const toggleHostList = () => {
        setShowHostList({
            opened: !showHostList.opened,
            buttonColor: showHostList.buttonColor === "var(--themeColor)" ? "#000" : "var(--themeColor)",
            buttonBackground: showHostList.buttonBackground === "transparent" ? "var(--themeColor)" : "transparent"
        })
        setSelectedHost({
            active: false,
            selectedHostDetails: {
                name : "Richie Hotspot",
                imgSrc : "../../../assets/images/faces/asta3.jpeg"
            }
        })
    }

    return (
        <div className="multiplayerHostSelect wrapper">
            <div className="setHost">
                <div className="selectHost" id="selectHost">
                    <div className="chooseHostButton" onClick={toggleHostList}>
                        <span>&#11015;</span><span>CHOOSE HOST</span><span>&#11015;</span>
                    </div>
                    <div className="selectedHost">
                        <p>HOST : </p>
                        <span><img src={`${selectedHost.selectedHostDetails.imgSrc}`}
                         className="hostImg" alt="" />
                         <em>{selectedHost.selectedHostDetails.name}</em></span>
                    </div>
                    {selectedHost.active &&  (
                        <div className="selectedDifficultyByHost">
                            <p>DIFFICULTY : </p>
                            <span>HARD</span>
                        </div>
                    )}
                    {showHostList.opened &&  (
                        <ul className="hosts">
                            <li className="host" id="host_1">Timmy</li>
                            <li className="host" id="host_2">wifi-mi</li>
                            <li className="host" id="host_3">hackerWifi</li>
                            <li className="host" id="host_3">Richie Hotspot</li>
                            <li className="host" id="host_3">hackerWifi3</li>
                            <li className="host" id="host_3">hackerWifi3</li>
                            <li className="host" id="host_3">hackerWifi3</li>
                        </ul>
                    )}
                </div>
                <div className="nextToHostButton">NEXT</div>
            </div>
        </div>
    )
}

export default LocalPlayJoinPage