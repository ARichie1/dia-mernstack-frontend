import React, { useContext, useState } from 'react'
import CustomButton from '../../reuseable/form_elements/CustomButton'
import { AuthContext } from '../../../contexts/AuthContext'
import { AppGlobalVariableContext } from '../../../contexts/AppGlobalVariableContext'

const ProfileImageSelector = () => {

    const { profileImage, setProfileImage } = useContext(AuthContext)
    const { imgFolder, defaultImages} = useContext(AppGlobalVariableContext)
    const [currentImage, setCurrentImage] = useState(profileImage)

    const [canClickLeft, setCanClickLeft] = useState(true)
    const [canClickRight, setCanClickRight] = useState(true)

    const setDefaultImagesPostions = () => {
        defaultImages.forEach(defaultImage => {
            if (currentImage.id > defaultImage.id) {
                const diff = currentImage.id - defaultImage.id
                defaultImage.pos = diff * -100
            }
            else if (currentImage.id < defaultImage.id) {
                const diff = defaultImage.id - currentImage.id
                defaultImage.pos = diff * 100
            }
            else if (currentImage.id === defaultImage.id) {
                defaultImage.pos = 0
            }
        })
    }
    setDefaultImagesPostions()

    
    const defaultImagesList = defaultImages.map(defaultImage => {
        return (
            <img className="avatarImg1" 
                src={`${imgFolder}${defaultImage.name}`} 
                style={{left: `${defaultImage.pos}%`}}
                key={defaultImage.id} alt="" />
        )
    })

    const handleButtonClickState = (buttonId) => {
        if (currentImage.id === 1) {
            if (buttonId === 2) {
                setCanClickLeft(true)
                setCanClickRight(false)   
            }
        }
        else if(currentImage.id === (defaultImages.length - 2)){
            if (buttonId === 1) {
                setCanClickLeft(false)
                setCanClickRight(true)
            }
        }else{
            setCanClickLeft(true)
            setCanClickRight(true)
        }
    }

    const switchDefaultImages = (buttonId, img) => {
        if (buttonId === 1) {
            defaultImages.forEach(defaultImage => {
                defaultImage.pos -= 100 
            })
            setCurrentImage(defaultImages[currentImage.id + 1])
        }
        if (buttonId === 2) {
            defaultImages.forEach(defaultImage => {
                defaultImage.pos += 100 
            })
            setCurrentImage(defaultImages[currentImage.id - 1])
        }
        handleButtonClickState(buttonId)
    }

    const saveProfileImage = () => {
        setProfileImage(currentImage)
    }

    return(
        <div className="avatar profileBox">
            <h5>Set Profile Pic</h5>
            <div className="avatarCell">
                <div className="avatarImageWrapper">
                    {defaultImagesList}
                </div> 
            </div>
            <div className="profileImage">
                <div className="avatarImageWrapper">
                    <img src={`${imgFolder}${currentImage.name}`} className="profileImg" alt="" />
                </div>
                
            </div>
            {canClickLeft && <div className="avatarControl controlLeft">
                <button className="controlLeftButton" onClick={() => switchDefaultImages(1, currentImage)}>&#11013;</button>
            </div>}
            {canClickRight && <div className="avatarControl controlRight">
                <button className="controlRightButton" onClick={() => switchDefaultImages(2, currentImage)}>&#10145;</button>
            </div>}
            <CustomButton buttonAttr = {
                {
                    title: "save",
                    type: "button",
                    name: "button",
                    classes: "saveProfileImage",
                    action: saveProfileImage,
                    disabled: false
                }
            }/>
        </div>
    )
}

export default ProfileImageSelector