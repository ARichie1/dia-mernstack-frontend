import React from 'react'

const PowerUps = () => {

    // const icons = [🥶,🕛🕵️‍♀️,🕵️‍♂️,🧙‍♂️,🧙‍♀️]


    const powerUps = [
        {title : "timeFreezer", active : false, icon: "🥶", duration : 5, type: "common", id: 1},
        {title : "timeBooster", active : false, icon: "🕛", duration : 5, type: "common", id: 2},
        {title : "moveBooster", active : false, icon: "🎲", duration : 5, type: "common", id: 3},
        {title : "detectiveMode", active : false, icon: "🕵️‍♂️", duration : 5, type: "rare", id: 4},
        {title : "wizardMode", active : false, icon: "🧙‍♂️", duration : 5, type: "rare", id: 5}
    ]

    const powerUpsList = powerUps.map( powerUp => {
        return (
            <div className={`powerUp ${powerUp.title} ${powerUp.type === "common" ? "booster" : ""} ${powerUp.active ? "powerUpActive" : "powerUpInActive"} inGameBtn`}
                key={powerUp.id}>
                <div className="powerTime"></div>
                <div className='iconWrapper'>
                    {powerUp.icon}
                </div>
            </div>
        )
    })

    return (
        <div className="powerUpsWrapper">
            <div className="powerUps">
                {powerUpsList}
            </div>
        </div>  
    )
}

export default PowerUps
