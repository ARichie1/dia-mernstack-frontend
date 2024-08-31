import React from 'react'

const PowerUps = () => {
    const powerUps = [
        {title : "timeFreezer", active : false, image: "timeFreezer.jpg", duration : 5},
        {title : "timeBooster", active : false, image: "timeBooster.jpeg", duration : 5},
        {title : "moveBooster", active : false, image: "moveBooster.jpg", duration : 5},
        {title : "detectiveMode", active : false, image: "detectiveMode.jpeg", duration : 5},
        {title : "wizardMode", active : false, image: "wizardMode.jpg", duration : 5}
    ]

    const powerUpsList = powerUps.map( powerUp => {
        return (
            <div className={`powerUp ${powerUp.title} 
                ${powerUp.active ? "powerUpActive" : "powerUpInActive"}}`}>
                <div class="powerTime"></div>
                <div className='imgWrapper'>
                    <img src={`../../../assets/images/powerups/${powerUp.image}`} alt='powerUpImage'/>
                </div>
            </div>
        )
    })

    return (
        <div className="powerUpsWrapper">
            <div class="powerUps">
                <div className="powerUp powerUpsLoader">
                    <div class="powerTime"></div>
                    <div className='imgWrapper'>
                        <img src={`../../../assets/images/powerups/powerUpsLoader.jpeg`} alt='powerUpImage'/>
                    </div>
                </div>
                {powerUpsList}
            </div>
        </div>  
    )
}

export default PowerUps
