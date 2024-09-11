import React, { useContext, useState } from 'react'
import CustomButton from '../../reuseable/form_elements/CustomButton'
import { AppGlobalVariableContext } from '../../../contexts/AppGlobalVariableContext'
import { useUserContext } from '../../../hooks/useUserContext'
import Arrow from '../../reuseable/controls/Arrow'

const ProfileImageSelector = () => {

    const { profileImage, setProfileImage } = useUserContext()
    const { imgFolder, defaultImages} = useContext(AppGlobalVariableContext)
    
    const [currentImage, setCurrentImage] = useState({
        value: "gow.jpg", pos: 300, posId: 3, id:3})
    const [hasProfileImage, setHasProfileImage] = useState(true)

    const [canClickLeft, setCanClickLeft] = useState(true)
    const [canClickRight, setCanClickRight] = useState(true)

    const setDefaultImagesPostions = () => {
        defaultImages.forEach(defaultImage => {
            if (currentImage.posId > defaultImage.posId) {
                const diff = currentImage.posId - defaultImage.posId
                defaultImage.pos = diff * -100
            }
            else if (currentImage.posId < defaultImage.posId) {
                const diff = defaultImage.posId - currentImage.posId
                defaultImage.pos = diff * 100
            }
            else if (currentImage.posId === defaultImage.posId) {
                defaultImage.pos = 0
            }
        })
    }
    setDefaultImagesPostions()
    
    const defaultImagesList = defaultImages.map(defaultImage => {
        return (
            <img className="avatarImg1" 
                src={`${imgFolder}${defaultImage.value}`} 
                style={{left: `${defaultImage.pos}%`}}
                key={Math.random()} alt="" />
        )
    })

    const handleButtonClickState = (buttonId) => {
        if (currentImage.posId === 1) {
            if (buttonId === 2) {
                setCanClickLeft(true)
                setCanClickRight(false)   
            }
        }
        else if(currentImage.posId === (defaultImages.length - 2)){
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
            setCurrentImage(defaultImages[currentImage.posId + 1])
        }
        if (buttonId === 2) {
            defaultImages.forEach(defaultImage => {
                defaultImage.pos += 100 
            })
            setCurrentImage(defaultImages[currentImage.posId - 1])
        }
        handleButtonClickState(buttonId)
        setHasProfileImage(false)
    }

    const saveProfileImage = () => {
        setProfileImage(currentImage)
        setHasProfileImage(true)
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
                    {!hasProfileImage && <img src={`${imgFolder}${currentImage ? currentImage.value : null}`} 
                    className="profileImg" alt="" />}
                    {hasProfileImage && <img src={`${imgFolder}${profileImage ? profileImage.value : null}`} 
                    className="profileImg" alt="" />}
                </div>
                
            </div>
            {canClickLeft && <div className="avatarControl controlLeft"
                onClick={() => switchDefaultImages(1, currentImage)}>
                <Arrow arrowDirection={180} className="controlLeftButton clkBtn"/>
            </div>}
            {canClickRight && <div className="avatarControl controlRight"
                onClick={() => switchDefaultImages(2, currentImage)}>
                <Arrow arrowDirection={0} className="controlRightButton clkBtn" 
                />
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