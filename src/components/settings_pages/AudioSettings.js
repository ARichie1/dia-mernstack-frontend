import React from "react";
import Switch from "../reuseable/controls/Switch";

const AudioSettings = () => {
    const switchesAttr = [
        { title: "Audio", parent: "audioMusic", classes: "audioSwitches", state: false, id: 1},
        { title: "Music", parent: "audioSound", classes: "audioSwitches", state: false, id: 2}
    ]

    const switchesList = switchesAttr.map( switchAttr => {
        return (
            <div className={`${switchAttr.parent ? switchAttr.parent : "customSwitch"} audioBox`} key={switchAttr.id}>
                <h4>{switchAttr.title ? switchAttr.title : "Toggle Me ->"}</h4>
                <Switch switchAttr={switchAttr} />
            </div>
        )
    })

    return (
        <div className="settingsAudio wrapper">
            <h4 className="settingsHeader">AUDIO</h4>
            {switchesList}
        </div> 
    )
}

export default AudioSettings