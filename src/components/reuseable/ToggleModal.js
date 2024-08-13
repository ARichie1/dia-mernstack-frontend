import React, { useState } from "react";

// <ToggleModal title={"Choose Host"} classTag={"chooseHostButton"} />
const ToggleModal = ({title, classTag}) => {
    const [showModal, setShowModal] = useState({
        opened: false,
        buttonTitleWhenOff: "Open",
        buttonTitleWhenOn: "Close",
        buttonClass: classTag,
        buttonColor: "var(--themeColor)",
        buttonBackground: "transparent"
    })
    
    const toggleModal = () => {
        setShowModal({
            opened: !showModal.opened,
            buttonColor: showModal.buttonColor === "var(--themeColor)" ? "#000" : "var(--themeColor)",
            buttonBackground: showModal.buttonBackground === "transparent" ? "var(--themeColor)" : "transparent"
        })
        return showModal
    }

    return (
        <button className={`modalToggler ${classTag}`} onClick={() => {toggleModal()}}>{title}</button>
    )
}

export default ToggleModal