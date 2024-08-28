import React, { useState } from "react";

const LanguageSettings = () => {

    const [seletedLanguage, setSelectedLanguage] = useState("english")
    const [isShowingLanguages, setIsShowingLanguages] = useState(false)

    const languages = ["english", "spanish", "german", "portuguese", "french"]
    
    const setLanguage = (language) => {
        setSelectedLanguage(language)
    }

    const languagesList = languages.map( language => {
        return (
            <li onClick={() => setLanguage(language)} key={Math.random()}>{language}</li>
        )
    })

    return (
        <div className="displayLanguage displayBox">
            <p className="settingHeader">Language</p>
            <div className="languagePicker">
                <div className="defaultLanguage" onClick={() => setIsShowingLanguages(!isShowingLanguages)}>{seletedLanguage}</div>
                {isShowingLanguages && <ul>{languagesList}</ul>}
            </div>
        </div>
    )
}

export default LanguageSettings